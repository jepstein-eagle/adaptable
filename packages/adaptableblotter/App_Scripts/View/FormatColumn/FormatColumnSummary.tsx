import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { FormatColumnWizard } from './Wizard/FormatColumnWizard'
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { IColumn } from '../../Core/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import { StrategyProfile } from '../Components/StrategyProfile'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { IAdaptableBlotterObject, IFormatColumn } from "../../Core/Api/Interface/AdaptableBlotterObjects";


export interface FormatColumnSummaryProps extends StrategySummaryProps<FormatColumnSummaryComponent> {
    FormatColumns: IFormatColumn[]
    ColorPalette: string[]
    StyleClassNames: string[]
    onAddFormatColumn: (FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction
    onEditFormatColumn: (FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class FormatColumnSummaryComponent extends React.Component<FormatColumnSummaryProps, EditableConfigEntityState> {

    constructor(props: FormatColumnSummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__formatcolumn";

        let formatColumn: IFormatColumn = this.props.FormatColumns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let noFormatColumn: boolean = formatColumn == null;

        let formatColumnRow: any;

        if (noFormatColumn) {
            formatColumnRow = <StrategyHeader
                key={StrategyIds.FormatColumnStrategyName}
                cssClassName={this.props.cssClassName}
                StrategyId={StrategyIds.FormatColumnStrategyId}
                StrategySummary={"No Format Column Set"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyIds.FormatColumnStrategyName}
            />
        } else {
            formatColumnRow = <StrategyDetail
                key={StrategyIds.FormatColumnStrategyName}
                cssClassName={this.props.cssClassName}
                Item1={<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={StrategyIds.FormatColumnStrategyId} />}
                Item2={<StyleVisualItem Style={formatColumn.Style} />}
                ConfigEnity={formatColumn}
                showShare={this.props.TeamSharingActivated}
                EntityName={StrategyIds.FormatColumnStrategyName}
                onEdit={() => this.onEdit(formatColumn)}
                onShare={() => this.props.onShare(formatColumn)}
                onDelete={FormatColumnRedux.FormatColumnDelete(formatColumn)}
                showBold={true}
            />
        }

        return <div>
            {formatColumnRow}

            {this.state.EditedAdaptableBlotterObject &&
                <FormatColumnWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IFormatColumn}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    ConfigEntities={this.props.FormatColumns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    ColorPalette={this.props.ColorPalette}
                    StyleClassNames={this.props.StyleClassNames}
                    WizardStartIndex={this.state.WizardStartIndex}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={() => this.canFinishWizard()}
                    Blotter={this.props.Blotter}
                
                />
            }
        </div>
    }

    onNew() {
        let configEntity: IFormatColumn = ObjectFactory.CreateEmptyFormatColumn()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(formatColumn: IFormatColumn) {
        let clonedObject: IFormatColumn = Helper.cloneObject(formatColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1 });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let formatColumn: IFormatColumn = this.state.EditedAdaptableBlotterObject as IFormatColumn
        if (this.props.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
            this.props.onEditFormatColumn(formatColumn)
        } else {
            this.props.onAddFormatColumn(formatColumn)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let formatColumn = this.state.EditedAdaptableBlotterObject as IFormatColumn
        return StringExtensions.IsNotNullOrEmpty(formatColumn.ColumnId) &&
            UIHelper.IsNotEmptyStyle(formatColumn.Style)
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        FormatColumns: state.FormatColumn.FormatColumns,
        ColorPalette: state.UserInterface.ColorPalette,
        StyleClassNames: state.UserInterface.StyleClassNames
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddFormatColumn: (FormatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnAdd(FormatColumn)),
        onEditFormatColumn: (FormatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnEdit(FormatColumn)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.FormatColumnStrategyId))
    };
}

export let FormatColumnSummary = connect(mapStateToProps, mapDispatchToProps)(FormatColumnSummaryComponent);