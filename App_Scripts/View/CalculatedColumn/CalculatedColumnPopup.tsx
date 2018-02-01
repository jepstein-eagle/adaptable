import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, Col, Panel, ListGroup, Row, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions'
import { ICalculatedColumn } from "../../Strategy/Interface/ICalculatedColumnStrategy";
import { EntityListActionButtons } from "../Components/Buttons/EntityListActionButtons";
import { CalculatedColumnWizard } from "./Wizard/CalculatedColumnWizard";
import { SortOrder } from "../../Core/Enums";
import { CalculatedColumnEntityRow } from './CalculatedColumnEntityRow'
import { EntityItemList } from '../Components/EntityItemList';
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';


interface CalculatedColumnPopupProps extends IStrategyViewPopupProps<CalculatedColumnPopupComponent> {
    onAddCalculatedColumn: (calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnAddAction
    onEditCalculatedColumn: (index: number, calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnEditAction
    CalculatedColumns: Array<ICalculatedColumn>
    Columns: IColumn[]
    EditedCalculatedColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}


class CalculatedColumnPopupComponent extends React.Component<CalculatedColumnPopupProps, EditableConfigEntityInternalState> {
    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 }
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

        let entityRowInfo: IEntityRowInfo[] = [
            { Caption: "Column Name", Width: 3 },
            { Caption: "Column Expression", Width: 6 },
            { Caption: "", Width: 3 },
        ]

        let propCalculatedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.CalculatedColumns, "ColumnId");
        let calculatedColumns = propCalculatedColumns.map((calculatedColumn: ICalculatedColumn) => {
            let index = this.props.CalculatedColumns.indexOf(calculatedColumn)

            return <CalculatedColumnEntityRow
                Index={index}
                EntityRowInfo={entityRowInfo}
                onShare={() => this.props.onShare(calculatedColumn)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                ConfigEntity={calculatedColumn} key={calculatedColumn.ColumnId}
                onEdit={(index, calculatedColumn) => this.onEdit(index, calculatedColumn as ICalculatedColumn)}
                onDeleteConfirm={CalculatedColumnRedux.CalculatedColumnDelete(index)}
            />
        });

        let newButton = <ButtonNew onClick={() => { this.onNew() }}
            overrideTooltip="Create Calculated Column"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton headerText={StrategyNames.CalculatedColumnStrategyName} style={panelStyle} infoBody={infoBody}
            button={newButton} bsStyle="primary" glyphicon={StrategyGlyphs.CalculatedColumnGlyph}>

            {this.props.CalculatedColumns.length > 0 &&
                <EntityItemList entityRowInfo={entityRowInfo} items={calculatedColumns} />
            }

            {this.props.CalculatedColumns.length == 0 &&
                <Well bsSize="small">Click 'New' to create a new Calculated Column.</Well>
            }

            {/* we dont pass in directly the value GetErrorMessage as the steps are cloned in the wizzard. */}
            {this.state.EditedConfigEntity &&

                <CalculatedColumnWizard
                    EditedCalculatedColumn={this.state.EditedConfigEntity as ICalculatedColumn}
                    Columns={this.props.Columns}
                    GetErrorMessage={() => this.props.EditedCalculatedColumnInvalidErrorMsg}
                    IsExpressionValid={(expression) => this.props.IsExpressionValid(expression)}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />

            }
        </PanelWithButton>
    }

    onNew() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyCalculatedColumn(), WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

    onEdit(index: number, customColumn: ICalculatedColumn) {
        let clonedObject = Helper.cloneObject(customColumn);
        this.setState({ EditedConfigEntity: clonedObject, WizardStartIndex: 1, EditedIndexConfigEntity: index });
    }

    onCloseWizard() {
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
        //reset error message
        this.props.IsExpressionValid("")
    }

    onFinishWizard() {
        if (this.state.EditedIndexConfigEntity != -1) {
            this.props.onEditCalculatedColumn(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as ICalculatedColumn)
        }
        else {
            this.props.onAddCalculatedColumn(this.state.EditedConfigEntity as ICalculatedColumn)
        }
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
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

export let CalculatedColumnPopup = connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnPopupComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

let panelStyle = {
    width: '800px'
}