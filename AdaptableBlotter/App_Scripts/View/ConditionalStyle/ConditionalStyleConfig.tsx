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
    // might need to update these with index number?
    onDeleteConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, index: number) => ConditionalStyleRedux.ConditionalStyleDeleteAction
    onAddEditConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, index: number) => ConditionalStyleRedux.ConditionalStyleAddOrUpdateAction
    onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string, index: number) => ConditionalStyleRedux.ConditionalStyleEditColumnAction
    onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColour: ConditionalStyleColour, index: number) => ConditionalStyleRedux.ConditionalStyleEditColourAction
}

interface ConditionalStyleConfigState {
    EditedConditionalStyleCondition: IConditionalStyleCondition
    EditedConditionIndex: number

}

class ConditionalStyleConfigComponent extends React.Component<ConditionalStyleConfigProps, ConditionalStyleConfigState> {

    constructor() {
        super();
        this.state = { EditedConditionalStyleCondition: null, EditedConditionIndex: -1 }
    }

    render() {
        let conditionalStyleConditions = this.props.ConditionalStyleConditions.map((conditionalStyleCondition: IConditionalStyleCondition, index: number) => {
            return <ConditionalStyleConfigItem
                ConditionalStyleCondition={conditionalStyleCondition}
                key={index}
                Columns={this.props.Columns}
                onEdit={(conditionalStyleCondition) => this.onEdit(conditionalStyleCondition, index)}
                onDelete={(conditionalStyleCondition) => this.props.onDeleteConditionalStyle(conditionalStyleCondition, index)}
                onChangeColumn={(conditionalStyleCondition, newColumnId) => this.props.onChangeColumnConditionalStyle(conditionalStyleCondition, newColumnId, index)}
                onChangeColour={(conditionalStyleCondition, newColour) => this.props.onChangeColourConditionalStyle(conditionalStyleCondition, newColour, index)} >
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
            ConditionalStyleColour: ConditionalStyleColour.None,
            ConditionalStyleScope: ConditionalStyleScope.Column,
            Expression: ExpressionHelper.CreateEmptyExpression()
        }
        this.setState({ EditedConditionalStyleCondition: _editedConditionalStyle, EditedConditionIndex: -1 });
    }

    onEdit(condition: IConditionalStyleCondition, index: number) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedConditionalStyleCondition: Helper.cloneObject(condition), EditedConditionIndex: index });
    }

    closeWizard() {
        this.setState({ EditedConditionalStyleCondition: null, EditedConditionIndex: -1 });
    }

    WizardFinish() {
        // havent passed in the index - do we need to?
        this.props.onAddEditConditionalStyle(this.state.EditedConditionalStyleCondition, this.state.EditedConditionIndex);
        this.setState({ EditedConditionalStyleCondition: null, EditedConditionIndex: -1 });
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
        onAddEditConditionalStyle: (conditionalStyleCondition: IConditionalStyleCondition, index: number) => dispatch(ConditionalStyleRedux.AddOrUpdateConditionalStyle(conditionalStyleCondition, index)),
        onDeleteConditionalStyle: (conditionalStyleCondition: IConditionalStyleCondition, index: number) => dispatch(ConditionalStyleRedux.DeleteConditionalStyle(conditionalStyleCondition, index)),
        onChangeColumnConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColumnId: string, index: number) => dispatch(ConditionalStyleRedux.EditColumnConditionalStyle(condiditionalStyleCondition, newColumnId, index)),
        onChangeColourConditionalStyle: (condiditionalStyleCondition: IConditionalStyleCondition, newColour: ConditionalStyleColour, index: number) => dispatch(ConditionalStyleRedux.EditColourConditionalStyle(condiditionalStyleCondition, newColour, index)),
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