
import { IFormatColumn } from '../../Core/Interface/IFormatColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { FormatColumnWizard } from '../FormatColumn/FormatColumnWizard'
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyConstants from '../../Core/StrategyConstants'
import { StringExtensions } from '../../Core/Extensions'
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { IRawValueDisplayValuePair, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import { FormatColumnReducer } from '../../Redux/ActionsReducers/FormatColumnRedux';
import { StyleVisualItem } from '../Components/StyleVisualItem'


export interface FormatColumnSummaryProps extends IStrategySummaryProps<FormatColumnSummaryComponent> {
    FormatColumns: IFormatColumn[]
    PredefinedColorChoices: string[]
    onAddFormatColumn: ( FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnAddAction
    onEditFormatColumn: ( FormatColumn: IFormatColumn) => FormatColumnRedux.FormatColumnEditAction
}

export class FormatColumnSummaryComponent extends React.Component<FormatColumnSummaryProps, StrategySummaryInternalState> {

    constructor() {
        super();
        this.state = { EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 }
    }

    render(): any {

        let formatColumn: IFormatColumn = this.props.FormatColumns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let noFormatColumn: boolean = formatColumn == null;

        let formatColumnRow: any;

        if (noFormatColumn) {
            formatColumnRow = <StrategySummaryRow
                key={StrategyConstants.FormatColumnStrategyFriendlyName}
                StrategyName={StrategyConstants.FormatColumnStrategyFriendlyName}
                StrategySummary={"No Format Column set"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyConstants.FormatColumnStrategyFriendlyName}
            />
        } else {
            formatColumnRow = <StrategyDetailRow
                key={StrategyConstants.FormatColumnStrategyFriendlyName}
                Item1={StrategyConstants.FormatColumnStrategyFriendlyName}
                Item2={<StyleVisualItem Style={formatColumn.Style} />}
                ConfigEnity={formatColumn}
                EntityName={StrategyConstants.FormatColumnStrategyFriendlyName}
                onEdit={() => this.onEdit(formatColumn)}
                onDelete={FormatColumnRedux.FormatColumnDelete(formatColumn)}
                showBold={true}
            />
        }
        return <div>
            {formatColumnRow}

            {this.state.EditedItem &&
                <FormatColumnWizard
                    EditedFormatColumn={this.state.EditedItem as IFormatColumn}
                    Columns={this.props.Columns}
                    FormatColumns={this.props.FormatColumns}
                    PredefinedColorChoices={this.props.PredefinedColorChoices}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.closeWizard()}
                    WizardFinish={() => this.WizardFinish()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: IFormatColumn = ObjectFactory.CreateEmptyFormatColumn()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
         this.setState({ EditedItem: configEntity, WizardStartIndex: 0, EditedItemIndex: -1 });
    }

    onEdit(FormatColumn: IFormatColumn) {
        this.setState({ EditedItem: Helper.cloneObject(FormatColumn), WizardStartIndex: 1, EditedItemIndex: -1 });
    }

    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }

    WizardFinish() {
        this.props.onAddFormatColumn( this.state.EditedItem as IFormatColumn, );
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
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
        onEditFormatColumn: ( FormatColumn: IFormatColumn) => dispatch(FormatColumnRedux.FormatColumnEdit(FormatColumn)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam())
    };
}

export let FormatColumnSummary = connect(mapStateToProps, mapDispatchToProps)(FormatColumnSummaryComponent);
