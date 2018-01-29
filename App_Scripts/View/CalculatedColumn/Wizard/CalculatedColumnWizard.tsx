import { ICalculatedColumn } from '../../../Core/Interface/ICalculatedColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { CalculatedColumnExpressionWizard } from './CalculatedColumnExpressionWizard'
import { CalculatedColumnSettingsWizard } from './CalculatedColumnSettingsWizard'

export interface CalculatedColumnWizardProps extends React.ClassAttributes<CalculatedColumnWizard> {
    EditedCalculatedColumn: ICalculatedColumn
    Columns: Array<IColumn>
    IsExpressionValid: (expression: string) => void
    GetErrorMessage: () => string
    WizardStartIndex: number
    closeWizard: () => void
    onFinishWizard: () => void
}

export class CalculatedColumnWizard extends React.Component<CalculatedColumnWizardProps, {}> {

    render() {
        return <AdaptableWizard Steps={[
            <CalculatedColumnSettingsWizard Columns={this.props.Columns} />,
            <CalculatedColumnExpressionWizard
                GetErrorMessage={this.props.GetErrorMessage}
                IsExpressionValid={this.props.IsExpressionValid} />,
        ]}
            Data={this.props.EditedCalculatedColumn}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.onFinishWizard()} ></AdaptableWizard>
    }

}

