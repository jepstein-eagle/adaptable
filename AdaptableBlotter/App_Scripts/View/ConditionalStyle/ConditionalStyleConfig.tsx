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
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, Checkbox, FormControl, OverlayTrigger, Tooltip, Glyphicon, Well } from 'react-bootstrap';
import { ColumnType, ConditionalStyleScope, ConditionalStyleColour } from '../../Core/Enums'
import { ConditionalStyleConfigItem, ConditionalStyleConfigHeader } from './ConditionalStyleConfigItem'
import { AdaptableWizard } from './..//Wizard/AdaptableWizard'
import { ConditionalStyleSettingsWizard } from './ConditionalStyleSettingsWizard'
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard'
import { Helper } from '../../Core/Helper';
import { ExpressionString } from '../../Core/Expression/ExpressionString';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';



interface ConditionalStyleConfigProps extends IStrategyViewPopupProps<ConditionalStyleConfigComponent> {
    ConditionalStyleConditions: Array<IConditionalStyleCondition>,
    Columns: IColumn[],
    onDeleteConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleDeleteAction
    onAddEditConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddOrUpdateAction
    onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string) => ConditionalStyleRedux.ConditionalStyleEditColumnAction
    onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColour: ConditionalStyleColour) => ConditionalStyleRedux.ConditionalStyleEditColourAction
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


        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={9}>Conditional Styles</Col>
                <Col xs={3}>
                    <Button onClick={() => this.onAdd()} style={{ float: 'right' }}>
                        Create Conditional Style
                    </Button>
                </Col>
            </Row>
        </Form>;


        return <Panel header={header} bsStyle="primary" style={panelStyle}>

            {this.props.ConditionalStyleConditions.length == 0 ?
                <Well bsSize="large">Click 'Create Conditional Style' to create a new conditional style to be applied at row or column level.</Well>
                : <ConditionalStyleConfigHeader />
            }

            <ListGroup style={divStyle}>
                {conditionalStyleConditions}
            </ListGroup>

            {this.state.EditedConditionalStyleCondition != null &&
                <AdaptableWizard Steps={
                    [
                        <ConditionalStyleSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                        <ConditionalStyleExpressionWizard ColumnList={this.props.Columns} Blotter={this.props.AdaptableBlotter} />
                    ]}
                    Data={this.state.EditedConditionalStyleCondition}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>}

        </Panel>


    }

    onAdd() {
        let _editedConditionalStyle: IConditionalStyleCondition = {
            Uid: Helper.generateUuid(),
            ColumnId: "select",
            ConditionalStyleColour: null,
            ConditionalStyleScope: ConditionalStyleScope.Column,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
        this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle });
    }

    onEdit(condition: IConditionalStyleCondition) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedConditionalStyleCondition: Helper.cloneObject(condition) });
    }

    closeWizard() {
        this.setState({ EditedConditionalStyleCondition: null });
    }

    WizardFinish() {
        // havent passed in the index - do we need to?
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
        onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColour: ConditionalStyleColour) => dispatch(ConditionalStyleRedux.EditColourConditionalStyle(condiditionalStyleCondition, newColour)),
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