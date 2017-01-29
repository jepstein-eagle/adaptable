/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormControl, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import * as StrategyIds from '../../Core/StrategyIds'
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import { Helper } from '../../Core/Helper';
import { ColumnType } from '../../Core/Enums';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { PopupType, CellValidationAction } from '../../Core/Enums'
import { ICellValidationStrategy } from '../../Core/Interface/ICellValidationStrategy';
import { IStrategy } from '../../Core/Interface/IStrategy';
import { PanelWithRow } from '../PanelWithRow';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { CellValidationSettingsWizard } from './CellValidationSettingsWizard'
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface CellValidationConfigProps extends IStrategyViewPopupProps<CellValidationConfigComponent> {
    CellValidationRules: ICellValidationRule[];
    Columns: Array<IColumn>
    onDeleteCellValidationRule: (Index: number) => CellValidationRedux.CellValidationRuleDeleteAction
    onAddEditCellValidationRule: (Index: number, cellValidationRule: ICellValidationRule) => CellValidationRedux.CellValidationRuleAddOrUpdateAction
}

interface CellValidationConfigState {
    EditedCellValidationRule: ICellValidationRule
    EditedIndexCellValidationRule: number
}

class CellValidationConfigComponent extends React.Component<CellValidationConfigProps, CellValidationConfigState> {
    constructor() {
        super();
        this.state = { EditedCellValidationRule: null, EditedIndexCellValidationRule: -1 }
    }
    render() {

        let cellValidationActionTypes = EnumExtensions.getNamesAndValues(CellValidationAction).map((enumNameAndValue: any) => {
            return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{StringExtensions.PlaceSpaceBetweenCapitalisedWords(enumNameAndValue.name)}</option>
        })


        let cellInfo: [string, number][] = [["Validation Rule", 7], ["Action", 2], ["", 3]];

        let validationItems = this.props.CellValidationRules.map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row >
                    <Col xs={7}>
                        {x.Description}
                    </Col>
                    <Col xs={3}>
                        <FormControl componentClass="select" placeholder="select" value={x.CellValidationAction.toString()} onChange={(x) => this.onCellValidationActionChanged(index, x)} >
                            {cellValidationActionTypes}
                        </FormControl>

                    </Col>
                    <Col xs={2}>
                        <EntityListActionButtons
                            deleteClick={() => this.props.onDeleteCellValidationRule(index)}
                            editClick={() => this.onEdit(index, x)}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })
        return <PanelWithButton headerText="Validation Rules Configuration" bsStyle="primary" style={panelStyle}
            buttonContent={"Create Validation Rule"}
            buttonClick={() => this.createCellValidationRule()}  >
            {validationItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {validationItems}
                    </ListGroup>
                </div>
            }

            {validationItems.length == 0 &&
                <Well bsSize="small">Click 'Create Validation Rule' to start creating validation rules.</Well>
            }

            {this.state.EditedCellValidationRule != null &&
                <AdaptableWizard Steps={[
                    <CellValidationSettingsWizard Columns={this.props.Columns} Blotter={this.props.AdaptableBlotter} />,
                ]}
                    Data={this.state.EditedCellValidationRule}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    createCellValidationRule() {
        let cellValidationStrategy: ICellValidationStrategy = this.props.AdaptableBlotter.Strategies.get(StrategyIds.CellValidationStrategyId) as ICellValidationStrategy;
        this.setState({ EditedCellValidationRule: cellValidationStrategy.CreateEmptyCellValidationRule(), EditedIndexCellValidationRule: -1 });
    }

    onEdit(index: number, cellValidationRule: ICellValidationRule) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedCellValidationRule: Helper.cloneObject(cellValidationRule), EditedIndexCellValidationRule: index });
    }

    private onCellValidationActionChanged(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        let cellValidationRule: ICellValidationRule = this.props.CellValidationRules[index];
        cellValidationRule.CellValidationAction = Number.parseInt(e.value);
        this.props.onAddEditCellValidationRule(index, cellValidationRule);
    }

    closeWizard() {
        this.setState({ EditedCellValidationRule: null, EditedIndexCellValidationRule: -1 });
    }

    finishWizard() {
        this.props.onAddEditCellValidationRule(this.state.EditedIndexCellValidationRule, this.state.EditedCellValidationRule);
        this.setState({ EditedCellValidationRule: null, EditedIndexCellValidationRule: -1 });
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        CellValidationRules: state.CellValidation.CellValidationRules
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteCellValidationRule: (index: number) => dispatch(CellValidationRedux.DeleteCellValidationRule(index)),
        onAddEditCellValidationRule: (index: number, cellValidationRule: ICellValidationRule) => dispatch(CellValidationRedux.AddEditCellValidationRule(index, cellValidationRule))
    };
}

export let CellValidationConfig = connect(mapStateToProps, mapDispatchToProps)(CellValidationConfigComponent);

let listGroupStyle = {
    overflowY: 'auto',
    minHeight: '100px',
    maxHeight: '300px'
};

let panelStyle = {
    width: '800px'
}
