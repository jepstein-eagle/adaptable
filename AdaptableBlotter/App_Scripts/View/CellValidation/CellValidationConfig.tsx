/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormControl, Col, Panel, ListGroup, Row, Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { ICellValidationRule, ICellValidationStrategy } from '../../Core/interface/ICellValidationStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import * as StrategyIds from '../../Core/StrategyIds'
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import { Helper } from '../../Core/Helper';
import { ColumnType } from '../../Core/Enums';
import { PanelWithButton } from '../PanelWithButton';
import { EntityListActionButtons } from '../EntityListActionButtons';
import { PopupType, CellValidationMode } from '../../Core/Enums'
import { IStrategy } from '../../Core/Interface/IStrategy';
import { PanelWithRow } from '../PanelWithRow';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { CellValidationSettingsWizard } from './CellValidationSettingsWizard'
import { CellValidationExpressionWizard } from './CellValidationExpressionWizard'
import { CellValidationRulesWizard } from './CellValidationRulesWizard'
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../Core/interface/IExpression';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../ButtonNew';

interface CellValidationConfigProps extends IStrategyViewPopupProps<CellValidationConfigComponent> {
    CellValidations: ICellValidationRule[];
    Columns: Array<IColumn>,
    UserFilters: IUserFilter[]
    onAddEditCellValidation: (Index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => CellValidationRedux.CellValidationChangeModeAction
}

interface CellValidationConfigState {
    EditedCellValidation: ICellValidationRule
    EditedIndexCellValidation: number
}

class CellValidationConfigComponent extends React.Component<CellValidationConfigProps, CellValidationConfigState> {
    constructor() {
        super();
        this.state = { EditedCellValidation: null, EditedIndexCellValidation: -1 }
    }
    render() {

        let CellValidationModeTypes = EnumExtensions.getNamesAndValues(CellValidationMode).map((enumNameAndValue: any) => {
            return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{StringExtensions.PlaceSpaceBetweenCapitalisedWords(enumNameAndValue.name)}</option>
        })


        let cellInfo: [string, number][] = [["Column", 2], ["Validation Rule", 3], ["Expression", 2], ["Action", 2], ["", 3]];

        let CellValidationItems = this.props.CellValidations.map((x, index) => {
            return <li
                className="list-group-item" key={index}>
                <Row >
                    <Col xs={2}>
                        {this.props.Columns.find(c => c.ColumnId == x.ColumnId).FriendlyName}
                    </Col>
                    <Col xs={3}>
                        {x.Description}
                    </Col>
                    <Col xs={2}>
                        {this.setExpressionDescription(x)}
                    </Col>
                    <Col xs={2}>
                        <FormControl componentClass="select" placeholder="select" value={x.CellValidationMode.toString()} onChange={(x) => this.onCellValidationModeChanged(index, x)} >
                            {CellValidationModeTypes}
                        </FormControl>

                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            ConfirmDeleteAction={CellValidationRedux.CellValidationDelete(index)}
                            editClick={() => this.onEdit(index, x)}
                            ConfigEntity={x}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        })
        let newButton = <ButtonNew onClick={() => this.createCellValidation()}
            overrideTooltip="Create Cell Validation Rule"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Cell Validation" bsStyle="primary" style={panelStyle}
            button={newButton}
            glyphicon={"flag"} >
            {CellValidationItems.length > 0 &&
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={listGroupStyle}>
                        {CellValidationItems}
                    </ListGroup>
                </div>
            }

            {CellValidationItems.length == 0 &&
                <Well bsSize="small">
                    <HelpBlock>Click 'New' to start creating rules for valid cell edits.</HelpBlock>
                    <HelpBlock>Edits that fail can be prevented altogether or allowed after user sees a warning.</HelpBlock>
                </Well>
            }

            {this.state.EditedCellValidation != null &&
                <AdaptableWizard Steps={[
                    <CellValidationSettingsWizard Columns={this.props.Columns} />,
                    <CellValidationRulesWizard Columns={this.props.Columns} />,
                    <CellValidationExpressionWizard ColumnList={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                ]}
                    Data={this.state.EditedCellValidation}
                    StepStartIndex={0}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.finishWizard()} ></AdaptableWizard>}

        </PanelWithButton>
    }

    createCellValidation() {
        this.setState({ EditedCellValidation: ObjectFactory.CreateEmptyCellValidation(), EditedIndexCellValidation: -1 });
    }

    onEdit(index: number, CellValidation: ICellValidationRule) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedCellValidation: Helper.cloneObject(CellValidation), EditedIndexCellValidation: index });
    }

    private onCellValidationModeChanged(index: number, event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeCellValidationMode(index, Number.parseInt(e.value));
    }

    closeWizard() {
        this.setState({ EditedCellValidation: null, EditedIndexCellValidation: -1 });
    }

    finishWizard() {
        this.props.onAddEditCellValidation(this.state.EditedIndexCellValidation, this.state.EditedCellValidation);
        this.setState({ EditedCellValidation: null, EditedIndexCellValidation: -1 });
    }

    setExpressionDescription(CellValidation: ICellValidationRule): string {
        return (CellValidation.HasExpression) ?
            ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, this.props.Columns, this.props.UserFilters) :
            "No Expression";
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        CellValidations: state.CellValidation.CellValidations
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditCellValidation: (index: number, CellValidation: ICellValidationRule) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => dispatch(CellValidationRedux.CellValidationChangeMode(index, CellValidationMode))
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


