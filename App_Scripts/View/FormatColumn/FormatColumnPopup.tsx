import { IFormatColumn } from '../../Strategy/Interface/IFormatColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn, IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';
import { Well } from 'react-bootstrap';
import { FormatColumnEntityRow } from './FormatColumnEntityRow'
import { FormatColumnWizard } from './Wizard/FormatColumnWizard'
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { EntityCollectionView } from '../Components/EntityCollectionView';
import { IColItem } from "../UIInterfaces";


interface FormatColumnPopupProps extends StrategyViewPopupProps<FormatColumnPopupComponent> {
    FormatColumns: Array<IFormatColumn>,
    Columns: IColumn[],
    PredefinedColorChoices: string[],
    onAddFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction
    onEditFormatColumn: (formatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class FormatColumnPopupComponent extends React.Component<FormatColumnPopupProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex:0 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newFormatColumn = ObjectFactory.CreateEmptyFormatColumn()
                newFormatColumn.ColumnId = arrayParams[1]
                this.onEdit(newFormatColumn)
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editFormatColumn = this.props.FormatColumns.find(x => x.ColumnId == arrayParams[1])
                this.onEdit(editFormatColumn)
            }
        }
    }

    render() {

        let infoBody: any[] = ["Format a column so it styles with the colours and font properties that you provide.", <br />, <br />, "Unlike Conditional Styles the column is ", <b>always</b>, " formatted as set and is not dependent on a rule being met."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 3 },
            { Content: "Style", Size: 5 },
            { Content: "", Size: 3 },
        ]
        let FormatColumns = this.props.FormatColumns.map((formatColumn: IFormatColumn, index) => {
            return <FormatColumnEntityRow
                key={index}
                ColItems={colItems}
                ConfigEntity={formatColumn}
                Columns={this.props.Columns}
                UserFilters={null}
                Index={index}
                onEdit={(index, x) => this.onEdit(formatColumn)}
                onShare={() => this.props.onShare(formatColumn)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={FormatColumnRedux.FormatColumnDelete(formatColumn)} />
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create Format Column"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton headerText={StrategyNames.FormatColumnStrategyName}
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.FormatColumnGlyph} infoBody={infoBody}>

            {this.props.FormatColumns.length == 0 &&
                <Well bsSize="small">Click 'New' to create a new column format.</Well>
            }

            {FormatColumns.length > 0 &&
                <EntityCollectionView ColItems={colItems} items={FormatColumns} />
            }

            {this.state.EditedAdaptableBlotterObject != null &&
                <FormatColumnWizard
                    EditedFormatColumn={this.state.EditedAdaptableBlotterObject as IFormatColumn}
                    PredefinedColorChoices={this.props.PredefinedColorChoices}
                    Columns={this.props.Columns.filter(x => !this.props.FormatColumns.find(y => y.ColumnId == x.ColumnId))}
                    FormatColumns={this.props.FormatColumns}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </PanelWithButton>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyFormatColumn(), WizardStartIndex: 0 });
    }

    onEdit(formatColumn: IFormatColumn) {
        let clonedObject: IFormatColumn = Helper.cloneObject(formatColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }

    onFinishWizard() {
       let formatColumn = this.state.EditedAdaptableBlotterObject as IFormatColumn
        if (this.props.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
            this.props.onEditFormatColumn(formatColumn)
        } else {
            this.props.onAddFormatColumn(formatColumn)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FormatColumns: state.FormatColumn.FormatColumns,
        Columns: state.Grid.Columns,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddFormatColumn: (formatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnAdd(formatColumn)),
        onEditFormatColumn: (formatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnEdit(formatColumn)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.FormatColumnStrategyId))
    };
}

export let FormatColumnPopup = connect(mapStateToProps, mapDispatchToProps)(FormatColumnPopupComponent);

let panelStyle = {
    width: '800px'
}

