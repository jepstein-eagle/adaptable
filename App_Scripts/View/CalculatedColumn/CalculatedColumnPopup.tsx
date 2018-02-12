import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import {  Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as CalculatedColumnRedux from '../../Redux/ActionsReducers/CalculatedColumnRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { ICalculatedColumn } from "../../Strategy/Interface/ICalculatedColumnStrategy";
import { CalculatedColumnWizard } from "./Wizard/CalculatedColumnWizard";
import { SortOrder } from "../../Core/Enums";
import { CalculatedColumnEntityRow } from './CalculatedColumnEntityRow'
import { EntityCollectionView } from '../Components/EntityCollectionView';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';
import { UIHelper } from '../UIHelper';

interface CalculatedColumnPopupProps extends StrategyViewPopupProps<CalculatedColumnPopupComponent> {
    onAddCalculatedColumn: (calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnAddAction
    onEditCalculatedColumn: (index: number, calculatedColumn: ICalculatedColumn) => CalculatedColumnRedux.CalculatedColumnEditAction
    CalculatedColumns: Array<ICalculatedColumn>
    Columns: IColumn[]
    EditedCalculatedColumnInvalidErrorMsg: string
    IsExpressionValid: (expression: string) => CalculatedColumnRedux.CalculatedColumnIsExpressionValidAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}


class CalculatedColumnPopupComponent extends React.Component<CalculatedColumnPopupProps, EditableConfigEntityState> {
    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState() ;
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

        let colItems: IColItem[] = [
            { Content: "Column Name", Size: 3 },
            { Content: "Column Expression", Size: 6 },
            { Content: "", Size: 3 },
        ]

        let propCalculatedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.CalculatedColumns, "ColumnId");
        let calculatedColumns = propCalculatedColumns.map((calculatedColumn: ICalculatedColumn) => {
            let index = this.props.CalculatedColumns.indexOf(calculatedColumn)

            return <CalculatedColumnEntityRow
                Index={index}
                ColItems={colItems}
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

        return <PanelWithButton headerText={StrategyNames.CalculatedColumnStrategyName} style={widePanelStyle} infoBody={infoBody}
            button={newButton} bsStyle="primary" glyphicon={StrategyGlyphs.CalculatedColumnGlyph}>

            {this.props.CalculatedColumns.length > 0 &&
                <EntityCollectionView ColItems={colItems} items={calculatedColumns} />
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
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
         this.props.IsExpressionValid("")
    }

    onFinishWizard() {
        let calculatedColumn: ICalculatedColumn = Helper.cloneObject(this.state.EditedConfigEntity);  
        if (this.state.EditedIndexConfigEntity != -1) {
            this.props.onEditCalculatedColumn(this.state.EditedIndexConfigEntity, calculatedColumn)
        }
        else {
            this.props.onAddCalculatedColumn(calculatedColumn)
        }
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
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

let widePanelStyle = {
    width: '800px'
}