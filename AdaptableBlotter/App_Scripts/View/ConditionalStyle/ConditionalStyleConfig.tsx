/// <reference path="../../../typings/index.d.ts" />
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button, Form, Col, Panel, Row, Well } from 'react-bootstrap';
import { ConditionalStyleScope, CellStyle } from '../../Core/Enums'
import { ConditionalStyleConfigItem, ConditionalStyleConfigHeader } from './ConditionalStyleConfigItem'
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { ConditionalStyleSettingsWizard } from './ConditionalStyleSettingsWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { Helper } from '../../Core/Helper';
import { PanelWithButton } from '../PanelWithButton';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';

interface ConditionalStyleConfigProps extends IStrategyViewPopupProps<ConditionalStyleConfigComponent> {
    ConditionalStyleConditions: Array<IConditionalStyleCondition>,
    Columns: IColumn[],
    onDeleteConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleDeleteAction
    onAddEditConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddOrUpdateAction
    onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => ConditionalStyleRedux.ConditionalStyleEditColumnAction
    onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, cellStyle: CellStyle) => ConditionalStyleRedux.ConditionalStyleEditColourAction
}

interface ConditionalStyleConfigState {
    EditedConditionalStyleCondition: IConditionalStyleCondition
}

class ConditionalStyleConfigComponent extends React.Component<ConditionalStyleConfigProps, ConditionalStyleConfigState> {

    constructor() {
        super();
        this.state = { EditedConditionalStyleCondition: null }
    }

    render() {
        let conditionalStyleConditions = this.props.ConditionalStyleConditions.map((conditionalStyleCondition: IConditionalStyleCondition) => {
            return <ConditionalStyleConfigItem
                ConditionalStyleCondition={conditionalStyleCondition}
                key={conditionalStyleCondition.Uid}
                Columns={this.props.Columns}
                onEdit={(conditionalStyleCondition) => this.onEdit(conditionalStyleCondition)}
                onDelete={(conditionalStyleCondition) => this.props.onDeleteConditionalStyle(conditionalStyleCondition)}
                onChangeColumn={(conditionalStyleCondition, newColumnId) => this.props.onChangeColumnConditionalStyle(conditionalStyleCondition, newColumnId)}
                onChangeColour={(conditionalStyleCondition, newColour) => this.props.onChangeColourConditionalStyle(conditionalStyleCondition, newColour)} >
            </ConditionalStyleConfigItem>
        });

        return <PanelWithButton headerText="Create Conditional Style"
            buttonContent={"Create Conditional Style"}
            buttonClick={() => this.onAdd()}
            bsStyle="primary" style={panelStyle}>

            {this.props.ConditionalStyleConditions.length == 0 ?
                <Well bsSize="small">Click 'Create Conditional Style' to create a new conditional style to be applied at row or column level.</Well>
                : <ConditionalStyleConfigHeader />
            }

            <ListGroup style={divStyle}>
                {conditionalStyleConditions}
            </ListGroup>

            {this.state.EditedConditionalStyleCondition != null &&
                <AdaptableWizard Steps={
                    [
                        <ConditionalStyleSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                        <ConditionalStyleExpressionWizard ColumnList={this.props.Columns} Blotter={this.props.AdaptableBlotter} SelectedColumnId={null} />
                    ]}
                    Data={this.state.EditedConditionalStyleCondition}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    onAdd() {
        let _editedConditionalStyle: IConditionalStyleCondition = {
            Uid: Helper.generateUid(),
            ColumnId: "select",
            CellStyle: null,
            ConditionalStyleScope: ConditionalStyleScope.Column,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsPredefinedExpression: false,
            PredefinedExpressionInfo: null
        }
        this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle });
    }

    onEdit(condition: IConditionalStyleCondition) {
        let clonedObject: IConditionalStyleCondition = Helper.cloneObject(condition);
        this.setState({ EditedConditionalStyleCondition: clonedObject });
    }

    closeWizard() {
        this.setState({ EditedConditionalStyleCondition: null });
    }

    WizardFinish() {
        this.props.onAddEditConditionalStyle(this.state.EditedConditionalStyleCondition);
        this.setState({ EditedConditionalStyleCondition: null });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ConditionalStyleConditions: state.ConditionalStyle.ConditionalStyleConditions,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditConditionalStyle: (conditionalStyleCondition: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.AddOrUpdateConditionalStyle(conditionalStyleCondition)),
        onDeleteConditionalStyle: (conditionalStyleCondition: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.DeleteConditionalStyle(conditionalStyleCondition)),
        onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => dispatch(ConditionalStyleRedux.EditColumnConditionalStyle(condiditionalStyleCondition, newColumnId)),
        onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, cellStyle: CellStyle) => dispatch(ConditionalStyleRedux.EditColourConditionalStyle(condiditionalStyleCondition, cellStyle)),
    };
}

export let ConditionalStyleConfig = connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleConfigComponent);


var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};



let panelStyle = {
    width: '800px'
}

let rowStyle = {
    height: '50px',
    margin: '2px'
}

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}