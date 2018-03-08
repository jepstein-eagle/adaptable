import { IFormatColumn } from '../../Strategy/Interface/IFormatColumnStrategy';
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
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { IAdaptableBlotterObject, IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import { StrategyProfile } from '../Components/StrategyProfile'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';


export interface FormatColumnSummaryProps extends StrategySummaryProps<FormatColumnSummaryComponent> {
    FormatColumns: IFormatColumn[]
    PredefinedColorChoices: string[]
    onAddFormatColumn: (FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction
    onEditFormatColumn: (FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class FormatColumnSummaryComponent extends React.Component<FormatColumnSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {

 let formatColumn: IFormatColumn = this.props.FormatColumns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let noFormatColumn: boolean = formatColumn == null;

        let formatColumnRow: any;

        if (noFormatColumn) {
            formatColumnRow = <StrategyHeader
                key={StrategyNames.FormatColumnStrategyName}
                StrategyId={StrategyIds.FormatColumnStrategyId}
                StrategySummary={"No Format Column Set"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyNames.FormatColumnStrategyName}
            />
        } else {
            formatColumnRow = <StrategyDetail
                key={StrategyNames.FormatColumnStrategyName}
                Item1={<StrategyProfile StrategyId={StrategyIds.FormatColumnStrategyId} />}
                Item2={<StyleVisualItem Style={formatColumn.Style} />}
                ConfigEnity={formatColumn}
                showShare={this.props.TeamSharingActivated}
                EntityName={StrategyNames.FormatColumnStrategyName}
                onEdit={() => this.onEdit(formatColumn)}
                onShare={() => this.props.onShare(formatColumn)}
                onDelete={FormatColumnRedux.FormatColumnDelete(formatColumn)}
                showBold={true}
            />
        }
       
        return <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
        {formatColumnRow}

            {this.state.EditedConfigEntity &&
                <FormatColumnWizard
                    EditedFormatColumn={this.state.EditedConfigEntity as IFormatColumn}
                    Columns={this.props.Columns}
                    FormatColumns={this.props.FormatColumns}
                    PredefinedColorChoices={this.props.PredefinedColorChoices}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: IFormatColumn = ObjectFactory.CreateEmptyFormatColumn()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedConfigEntity: configEntity, WizardStartIndex: 1, EditedIndexConfigEntity: -1 });
    }

    onEdit(formatColumn: IFormatColumn) {
        let clonedObject: IFormatColumn = Helper.cloneObject(formatColumn);
        this.setState({ EditedConfigEntity: clonedObject, WizardStartIndex: 1 });
     }

    onCloseWizard() {
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
    }

    onFinishWizard() {
        let formatColumn: IFormatColumn = this.state.EditedConfigEntity as IFormatColumn
        if (this.props.FormatColumns.find(x => x.ColumnId == formatColumn.ColumnId)) {
            this.props.onEditFormatColumn(formatColumn)
        } else {
            this.props.onAddFormatColumn(formatColumn)
        }
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        FormatColumns: state.FormatColumn.FormatColumns,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
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