import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'
import { ICalculatedColumn } from "../../Core/Interface/ICalculatedColumnStrategy";
import { EntityListActionButtons } from "../Components/Buttons/EntityListActionButtons";
import { CalculatedColumnSettingsWizard } from "./CalculatedColumnSettingsWizard";
import { CalculatedColumnExpressionWizard } from "./CalculatedColumnExpressionWizard";
import { SortOrder } from "../../Core/Enums";

interface CalculatedColumnConfigProps extends IStrategyViewPopupProps<CalculatedColumnConfigComponent> {
    onAddCalculatedColumn: (calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnAddAction
    onEditCalculatedColumn: (index: number, calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnEditAction
    CalculatedColumns: Array<ICalculatedColumn>
    Columns: IColumn[]
    EditedCalculatedColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
}

interface CalculatedColumnConfigInternalState {
    EditedCalculatedColumn: ICalculatedColumn
    WizardStartIndex: number
    EditedIndexCalculatedColumn: number
}

class CalculatedColumnConfigComponent extends React.Component<CalculatedColumnConfigProps, CalculatedColumnConfigInternalState> {
    constructor() {
        super();
        this.state = { EditedCalculatedColumn: null, WizardStartIndex: 0, EditedIndexCalculatedColumn: -1 }
    }

    render() {
        let infoBody: any[] = ["Use Calculated Columns to create your own bespoke columns; the value of the column is an Expression which will update automatically in line with any columns it refers to.", <br />, <br />, "Once created, Calculated Columns are treated like any other column in the Grid."]

        let propCalculatedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.CalculatedColumns, "ColumnId");
        let calculatedColumns = propCalculatedColumns.map((calculatedColumn: ICalculatedColumn, index: number) => {
            return <li
                className="list-group-item" key={calculatedColumn.ColumnId}>
                <Row >
                    <Col xs={3}>
                        {calculatedColumn.ColumnId}
                    </Col>
                    <Col xs={6}>
                        {calculatedColumn.GetValueFunc}
                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            ConfirmDeleteAction={CalculatedColumnRedux.CalculatedColumnDelete(index)}
                            editClick={() => this.onEdit(index, calculatedColumn)}
                            ConfigEntity={calculatedColumn}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        });

        let cellInfo: [string, number][] = [["Column Name", 3], ["Column Expression", 6], ["", 3]];
        let newButton = <ButtonNew onClick={() => { this.CreateCalculatedColumn() }}
            overrideTooltip="Create Calculated Column"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Calculated Column" style={panelStyle} infoBody={infoBody}
            button={newButton} bsStyle="primary" glyphicon={"th-list"}>
            {this.props.CalculatedColumns.length == 0 ?
                <Well bsSize="small">Click 'New' to create a new Calculated Column.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {calculatedColumns}
            </ListGroup>
            {/* we dont pass in directly the value GetErrorMessage as the steps are cloned in the wizzard. */}
            {this.state.EditedCalculatedColumn &&

                <AdaptableWizard Steps={[<CalculatedColumnSettingsWizard Columns={this.props.Columns} />,
                <CalculatedColumnExpressionWizard
                    GetErrorMessage={() => this.props.EditedCalculatedColumnInvalidErrorMsg}
                    IsExpressionValid={(expression) => this.props.IsExpressionValid(expression)} />]}
                    Data={this.state.EditedCalculatedColumn}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>
            }
        </PanelWithButton>
    }
    private wizardSteps: JSX.Element[]
    onEdit(index: number, customColumn: ICalculatedColumn) {
        let clonedObject = Helper.cloneObject(customColumn);
        this.setState({ EditedCalculatedColumn: clonedObject, WizardStartIndex: 1, EditedIndexCalculatedColumn: index });
    }
    closeWizard() {
        this.setState({ EditedCalculatedColumn: null, WizardStartIndex: 0 });
        //reset error message
        this.props.IsExpressionValid("")
    }
    WizardFinish() {
        if (this.state.EditedIndexCalculatedColumn != -1) {
            this.props.onEditCalculatedColumn(this.state.EditedIndexCalculatedColumn, this.state.EditedCalculatedColumn)
        }
        else {
            this.props.onAddCalculatedColumn(this.state.EditedCalculatedColumn)
        }
        this.setState({ EditedCalculatedColumn: null, WizardStartIndex: 0, EditedIndexCalculatedColumn: -1 });
    }

    CreateCalculatedColumn() {
        this.setState({ EditedCalculatedColumn: ObjectFactory.CreateEmptyCalculatedColumn(), WizardStartIndex: 0, EditedIndexCalculatedColumn: -1 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        Columns: state.Grid.Columns,
        EditedCalculatedColumnInvalidErrorMsg: state.CalculatedColumn.EditedCalculatedColumnInvalidErrorMsg
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddCalculatedColumn: (calculatedColumn: ICalculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn)),
        onEditCalculatedColumn: (index: number, calculatedColumn: ICalculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnEdit(index, calculatedColumn)),
        IsExpressionValid: (expression: string) => dispatch(CalculatedColumnRedux.CalculatedColumnIsExpressionValid(expression))
    };
}

export let CalculatedColumnConfig = connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnConfigComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}