import { IFormatColumn } from '../../Core/Interface/IFormatColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { ExpressionMode, FontWeight, FontStyle, FontSize } from '../../Core/Enums'
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { FormatColumnColumnWizard } from './FormatColumnColumnWizard'
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard'
import { Helper } from '../../Core/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'


export interface FormatColumnWizardProps extends React.ClassAttributes<FormatColumnWizard> {
    EditedFormatColumn: IFormatColumn
    Columns: IColumn[],
    FormatColumns: IFormatColumn[],
    PredefinedColorChoices: string[],
    WizardStartIndex: number,
    closeWizard: () => void
    WizardFinish: () => void
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {

    render() {
        return <AdaptableWizard Steps={
            [
                <FormatColumnColumnWizard
                    Columns={this.props.Columns} />,
                <FormatColumnStyleWizard
                    PredefinedColorChoices={this.props.PredefinedColorChoices} />
            ]}
            Data={this.props.EditedFormatColumn}
            StepStartIndex={this.props.WizardStartIndex}
            onHide={() => this.props.closeWizard()}
            onFinish={() => this.props.WizardFinish()} ></AdaptableWizard>
    }
}

