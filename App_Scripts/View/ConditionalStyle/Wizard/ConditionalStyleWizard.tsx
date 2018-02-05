import { IConditionalStyleCondition } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore'
import * as ConditionalStyleRedux from '../../../Redux/ActionsReducers/ConditionalStyleRedux'
import { IStrategyViewPopupProps } from '../../../Core/Interface/IStrategyView'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../../Core/Enums'
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ConditionalStyleSettingsWizard } from './ConditionalStyleSettingsWizard'
import { ConditionalStyleColumnWizard } from './ConditionalStyleColumnWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { Helper } from '../../../Core/Helpers/Helper';
import { PanelWithButton } from '../../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../../Core/ObjectFactory';
import { PanelWithRow } from '../../Components/Panels/PanelWithRow';
import { IUserFilter } from '../../../Core/Interface/IExpression'
import { ButtonNew } from '../../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import * as StrategyNames from '../../../Core/Constants/StrategyNames'


export interface ConditionalStyleWizardProps extends React.ClassAttributes<ConditionalStyleWizard> {
    EditedConditionalStyleCondition: IConditionalStyleCondition
    Columns: IColumn[],
    UserFilters: IUserFilter[],
    WizardStartIndex: number
    PredefinedColorChoices: string[],
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Target", "Create Style", "Build Query"]
        return <AdaptableWizard
            FriendlyName={StrategyNames.ConditionalStyleStrategyName}
            StepNames={stepNames}
            Steps={[
                <ConditionalStyleColumnWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                <ConditionalStyleSettingsWizard StepName={stepNames[1]} PredefinedColorChoices={this.props.PredefinedColorChoices} />,
                <ConditionalStyleExpressionWizard
                    StepName={stepNames[2]}
                    ColumnList={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SelectedColumnId={null}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                />
            ]}
            Data={this.props.EditedConditionalStyleCondition}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} ></AdaptableWizard>
    }
}

