import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CustomColumnRedux from '../../Redux/ActionsReducers/CustomColumnRedux'
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
import { ICustomColumn } from "../../Core/Interface/ICustomColumnStrategy";
import { EntityListActionButtons } from "../Components/Buttons/EntityListActionButtons";
import { CustomColumnSettingsWizard } from "./CustomColumnSettingsWizard";
import { CustomColumnExpressionWizard } from "./CustomColumnExpressionWizard";
import { SortOrder } from "../../Core/Enums";

interface CustomColumnConfigProps extends IStrategyViewPopupProps<CustomColumnConfigComponent> {
    onAddCustomColumn: (customColumn: ICustomColumn) => CustomColumnRedux.CustomColumnAddAction
    onEditCustomColumn: (index: number, customColumn: ICustomColumn) => CustomColumnRedux.CustomColumnEditAction
    CustomColumns: Array<ICustomColumn>
    EditedCustomColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CustomColumnRedux.CustomColumnIsExpressionValidAction
}

interface CustomColumnConfigInternalState {
    EditedCustomColumn: ICustomColumn
    WizardStartIndex: number
    EditedIndexCustomColumn: number
}

class CustomColumnConfigComponent extends React.Component<CustomColumnConfigProps, CustomColumnConfigInternalState> {
    constructor() {
        super();
        this.state = { EditedCustomColumn: null, WizardStartIndex: 0, EditedIndexCustomColumn: -1 }
    }

    render() {
        let infoBody: any[] = ["Custom Column."]

        let propCustomColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.CustomColumns, "ColumnId");
        let customColumns = propCustomColumns.map((customColumn: ICustomColumn, index: number) => {
            return <li
                className="list-group-item" key={customColumn.ColumnId}>
                <Row >
                    <Col xs={3}>
                        {customColumn.ColumnId}
                    </Col>
                    <Col xs={6}>
                        {customColumn.GetValueFunc}
                    </Col>
                    <Col xs={3}>
                        <EntityListActionButtons
                            ConfirmDeleteAction={CustomColumnRedux.CustomColumnDelete(index)}
                            editClick={() => this.onEdit(index, customColumn)}
                            ConfigEntity={customColumn}>
                        </EntityListActionButtons>
                    </Col>
                </Row>
            </li>
        });

        let cellInfo: [string, number][] = [["Column Name", 3], ["Column Description", 6], ["", 3]];
        let newButton = <ButtonNew onClick={() => { this.CreateCustomColumn() }}
            overrideTooltip="Create Custom Column"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Custom Column" style={panelStyle} infoBody={infoBody}
            button={newButton} bsStyle="primary" glyphicon={"th-list"}>
            {this.props.CustomColumns.length == 0 ?
                <Well bsSize="small">Click 'New' to create a new Custom Column.</Well>
                : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            }

            <ListGroup style={divStyle}>
                {customColumns}
            </ListGroup>
            {/* we dont pass in directly the value GetErrorMessage as the steps are cloned in the wizzard. */}
            {this.state.EditedCustomColumn &&
            
                <AdaptableWizard Steps={[<CustomColumnSettingsWizard />,
                <CustomColumnExpressionWizard
                    GetErrorMessage={() => this.props.EditedCustomColumnInvalidErrorMsg}
                    IsExpressionValid={(expression) => this.props.IsExpressionValid(expression)} />]}
                    Data={this.state.EditedCustomColumn}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>
            }
        </PanelWithButton>
    }
    private wizardSteps: JSX.Element[]
    onEdit(index: number, customColumn: ICustomColumn) {
        let clonedObject = Helper.cloneObject(customColumn);
        this.setState({ EditedCustomColumn: clonedObject, WizardStartIndex: 1, EditedIndexCustomColumn: index });
    }
    closeWizard() {
        this.setState({ EditedCustomColumn: null, WizardStartIndex: 0 });
        //reset error message
        this.props.IsExpressionValid("")
    }
    WizardFinish() {
        if (this.state.EditedIndexCustomColumn != -1) {
            this.props.onEditCustomColumn(this.state.EditedIndexCustomColumn, this.state.EditedCustomColumn)
        }
        else {
            this.props.onAddCustomColumn(this.state.EditedCustomColumn)
        }
        this.setState({ EditedCustomColumn: null, WizardStartIndex: 0, EditedIndexCustomColumn: -1 });
    }

    CreateCustomColumn() {
        this.setState({ EditedCustomColumn: ObjectFactory.CreateEmptyCustomColumn(), WizardStartIndex: 0, EditedIndexCustomColumn: -1 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CustomColumns: state.CustomColumn.CustomColumns,
        EditedCustomColumnInvalidErrorMsg: state.CustomColumn.EditedCustomColumnInvalidErrorMsg
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddCustomColumn: (customColumn: ICustomColumn) => dispatch(CustomColumnRedux.CustomColumnAdd(customColumn)),
        onEditCustomColumn: (index: number, customColumn: ICustomColumn) => dispatch(CustomColumnRedux.CustomColumnEdit(index, customColumn)),
        IsExpressionValid: (expression: string) => dispatch(CustomColumnRedux.CustomColumnIsExpressionValid(expression))
    };
}

export let CustomColumnConfig = connect(mapStateToProps, mapDispatchToProps)(CustomColumnConfigComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}