/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormControl, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IEditingRestrictionRule } from '../../Core/interface/IEditingRestrictionStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import * as StrategyIds from '../../Core/StrategyIds'
import * as EditingRestrictionRedux from '../../Redux/ActionsReducers/EditingRestrictionRedux'
import { Helper } from '../../Core/Helper';
import { ColumnType } from '../../Core/Enums';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { PopupType, EditingRestrictionAction } from '../../Core/Enums'
import { IEditingRestrictionStrategy } from '../../Core/Interface/IEditingRestrictionStrategy';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { PanelWithRow } from '../PanelWithRow';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { EditingRestrictionSettingsWizard } from './EditingRestrictionSettingsWizard'
import { EditingRestrictionExpressionWizard } from './EditingRestrictionExpressionWizard'
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';


interface EditingRestrictionConfigProps extends IStrategyViewPopupProps<EditingRestrictionConfigComponent> {
    EditingRestrictionRules: IEditingRestrictionRule[];
    Columns: Array<IColumn>
    onDeleteEditingRestrictionRule: (Index: number) => EditingRestrictionRedux.EditingRestrictionRuleDeleteAction
    onAddEditEditingRestrictionRule: (Index: number, EditingRestrictionRule: IEditingRestrictionRule) => EditingRestrictionRedux.EditingRestrictionRuleAddOrUpdateAction
}

interface EditingRestrictionConfigState {
    EditedEditingRestrictionRule: IEditingRestrictionRule
    EditedIndexEditingRestrictionRule: number
}

class EditingRestrictionConfigComponent extends React.Component<EditingRestrictionConfigProps, EditingRestrictionConfigState> {
    constructor() {
        super();
        this.state = { EditedEditingRestrictionRule: null, EditedIndexEditingRestrictionRule: -1 }
    }
    render() {

        let EditingRestrictionActionTypes = EnumExtensions.getNamesAndValues(EditingRestrictionAction).map((enumNameAndValue: any) => {
            return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{StringExtensions.PlaceSpaceBetweenCapitalisedWords(enumNameAndValue.name)}</option>
        })


        let cellInfo: [string, number][] = [["Column", 2], ["Restriction", 3], ["Expression", 3],["Action", 2], ["", 2]];

        let validationItems = this.props.EditingRestrictionRules.map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row >
                    <Col xs={2}>
                        {this.props.Columns.find(c=>c.ColumnId == x.ColumnId).FriendlyName }
                    </Col>
                     <Col xs={3}>
                        {x.Description}
                    </Col>
                    <Col xs={3}>
                        {this.setExpressionDescription(x) }
                    </Col>
                    <Col xs={2}>
                        <FormControl componentClass="select" placeholder="select" value={x.EditingRestrictionAction.toString()} onChange={(x) => this.onEditingRestrictionActionChanged(index, x)} >
                            {EditingRestrictionActionTypes}
                        </FormControl>

                    </Col>
                    <Col xs={2}>
                        <EntityListActionButtons
                            deleteClick={() => this.props.onDeleteEditingRestrictionRule(index)}
                            editClick={() => this.onEdit(index, x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })
        return <PanelWithButton headerText="Editing Restrictions Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Editing Restriction"}
            buttonClick={() => this.createEditingRestrictionRule()}  >
            {validationItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {validationItems}
                    </ListGroup>
                </div>
            }

            {validationItems.length == 0 &&
                <Well bsSize="small">Click 'Create Editing Restriction' to start creating editing restrictions.</Well>
            }

            {this.state.EditedEditingRestrictionRule != null &&
                <AdaptableWizard Steps={[
                    <EditingRestrictionSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                    <EditingRestrictionExpressionWizard ColumnList={this.props.Columns} Blotter={this.props.AdaptableBlotter} SelectedColumnId={null} />,
                ]}
                    Data={this.state.EditedEditingRestrictionRule}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    createEditingRestrictionRule() {
        let EditingRestrictionStrategy: IEditingRestrictionStrategy = this.props.AdaptableBlotter.Strategies.get(StrategyIds.EditingRestrictionStrategyId) as IEditingRestrictionStrategy;
        this.setState({ EditedEditingRestrictionRule: EditingRestrictionStrategy.CreateEmptyEditingRestrictionRule(), EditedIndexEditingRestrictionRule: -1 });
    }

    onEdit(index: number, EditingRestrictionRule: IEditingRestrictionRule) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedEditingRestrictionRule: Helper.cloneObject(EditingRestrictionRule), EditedIndexEditingRestrictionRule: index });
    }

    private onEditingRestrictionActionChanged(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let EditingRestrictionRule: IEditingRestrictionRule = this.props.EditingRestrictionRules[index];
        EditingRestrictionRule.EditingRestrictionAction = Number.parseInt(e.value);
        this.props.onAddEditEditingRestrictionRule(index, EditingRestrictionRule);
    }

    closeWizard() {
        this.setState({ EditedEditingRestrictionRule: null, EditedIndexEditingRestrictionRule: -1 });
    }

    finishWizard() {
        this.props.onAddEditEditingRestrictionRule(this.state.EditedIndexEditingRestrictionRule, this.state.EditedEditingRestrictionRule);
        this.setState({ EditedEditingRestrictionRule: null, EditedIndexEditingRestrictionRule: -1 });
    }

     setExpressionDescription(EditingRestrictionRule: IEditingRestrictionRule):string {
        return (EditingRestrictionRule.HasOtherExpression) ?
            ExpressionHelper.ConvertExpressionToString(EditingRestrictionRule.OtherExpression, this.props.Columns, this.props.AdaptableBlotter) :
            "No Expression";
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        EditingRestrictionRules: state.EditingRestriction.EditingRestrictions
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteEditingRestrictionRule: (index: number) => dispatch(EditingRestrictionRedux.DeleteEditingRestrictionRule(index)),
        onAddEditEditingRestrictionRule: (index: number, EditingRestrictionRule: IEditingRestrictionRule) => dispatch(EditingRestrictionRedux.AddEditEditingRestrictionRule(index, EditingRestrictionRule))
    };
}

export let EditingRestrictionConfig = connect(mapStateToProps, mapDispatchToProps)(EditingRestrictionConfigComponent);

let listGroupStyle = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};

let panelStyle = {
    width: '800px'
}


