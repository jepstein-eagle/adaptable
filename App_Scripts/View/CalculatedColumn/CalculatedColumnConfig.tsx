import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyConstants'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
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
import { CalculatedColumnWizard } from "./CalculatedColumnWizard";
import { SortOrder } from "../../Core/Enums";
import { CalculatedColumnConfigItem } from './CalculatedColumnConfigItem'


interface CalculatedColumnConfigProps extends IStrategyViewPopupProps<CalculatedColumnConfigComponent> {
    onAddCalculatedColumn: (calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnAddAction
    onEditCalculatedColumn: (index: number, calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnEditAction
    CalculatedColumns: Array<ICalculatedColumn>
    Columns: IColumn[]
    EditedCalculatedColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
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

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            // only editing is possible - you cannot create a new calc column from the column menu
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let calculatedColumn = this.props.CalculatedColumns.find(x => x.ColumnId == arrayParams[1])
                let index = this.props.CalculatedColumns.indexOf(calculatedColumn)
                this.onEdit(index, calculatedColumn)
            }
        }
    }

    render() {
        let infoBody: any[] = ["Use Calculated Columns to create your own bespoke columns; the value of the column is an Expression which will update automatically in line with any columns it refers to.", <br />, <br />, "Once created, Calculated Columns are treated like any other column in the Grid."]

        let propCalculatedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.CalculatedColumns, "ColumnId");
        let calculatedColumns = propCalculatedColumns.map((calculatedColumn: ICalculatedColumn) => {
            let index = this.props.CalculatedColumns.indexOf(calculatedColumn)

            return <CalculatedColumnConfigItem CalculatedColumn={calculatedColumn} key={calculatedColumn.ColumnId}
                onEdit={(calculatedColumn) => this.onEdit(index, calculatedColumn)}
                onDeleteConfirm={CalculatedColumnRedux.CalculatedColumnDelete(index)}
                 />

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

                <CalculatedColumnWizard 
                EditedCalculatedColumn={this.state.EditedCalculatedColumn}
                Columns={this.props.Columns}
                    GetErrorMessage={() => this.props.EditedCalculatedColumnInvalidErrorMsg}
                    IsExpressionValid={(expression) => this.props.IsExpressionValid(expression)} 
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.closeWizard()}
                    WizardFinish={() => this.WizardFinish()}
                    />
                    
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
        IsExpressionValid: (expression: string) => dispatch(CalculatedColumnRedux.CalculatedColumnIsExpressionValid(expression)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CalculatedColumnStrategyId))
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