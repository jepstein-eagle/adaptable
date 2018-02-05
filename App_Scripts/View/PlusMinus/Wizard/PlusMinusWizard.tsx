import { IPlusMinusCondition } from '../../../Strategy/Interface/IPlusMinusStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../../../Redux/ActionsReducers/PlusMinusRedux'
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { IStrategyViewPopupProps } from '../../../Core/Interface/IStrategyView'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../../Core/Helpers/Helper';
import { ObjectFactory } from '../../../Core/ObjectFactory';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { PlusMinusColumnWizard } from './PlusMinusColumnWizard'
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard'
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard'
import { PanelWithButton } from '../../Components/Panels/PanelWithButton';
import { PanelWithRow } from '../../Components/Panels/PanelWithRow';
import { ButtonNew } from '../../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../../Core/Extensions'
import { DistinctCriteriaPairValue, DataType } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../../../Core/Interface/IExpression'
import * as StrategyNames from '../../../Core/StrategyNames'


export interface PlusMinusWizardProps extends React.ClassAttributes<PlusMinusWizard> {
    EditedPlusMinusCondition: IPlusMinusCondition
    PlusMinusConditions: Array<IPlusMinusCondition>
    Columns: Array<IColumn>
    UserFilters: IUserFilter[],
    WizardStartIndex: number,
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Settings", "Build Query"]
        return <AdaptableWizard
            FriendlyName={StrategyNames.PlusMinusStrategyName}
            StepNames={stepNames}
            Steps={
                [<PlusMinusColumnWizard StepName={stepNames[0]} Columns={this.props.Columns.filter(x => x.DataType == DataType.Number)} />,
                <PlusMinusSettingsWizard StepName={stepNames[1]} />,
                <PlusMinusExpressionWizard StepName={stepNames[2]} ColumnList={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SelectedColumnId={this.props.SelectedColumnId}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />]}
            Data={this.props.EditedPlusMinusCondition}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} >
        </AdaptableWizard>
    }

}

