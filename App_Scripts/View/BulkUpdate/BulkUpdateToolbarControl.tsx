import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as BulkUpdateRedux from '../../Redux/ActionsReducers/BulkUpdateRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { Helper } from '../../Core/Helpers/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as ScreenPopups from '../../Core/Constants/ScreenPopups'
import { SortOrder, DistinctCriteriaPairValue } from '../../Core/Enums';
import { IPreviewInfo } from "../../Core/Interface/IPreviewResult";
import { IColumn } from "../../Core/Interface/IColumn";
import { IUserFilter } from "../../Strategy/Interface/IUserFilterStrategy";
import { IUIConfirmation } from "../../Core/Interface/IMessage";
import { PreviewHelper } from "../../Core/Helpers/PreviewHelper";
import { ColumnValueSelector } from "../Components/Selectors/ColumnValueSelector";

interface BulkUpdateToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<BulkUpdateToolbarControlComponent> {
    BulkUpdateValue: string;
    PreviewInfo: IPreviewInfo;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    onBulkUpdateValueChange: (value: string) => BulkUpdateRedux.BulkUpdateChangeValueAction;
    onBulkUpdateCheckSelectedCells: () => BulkUpdateRedux.BulkUpdateCheckCellSelectionAction;
    onApplyBulkUpdate: () => BulkUpdateRedux.BulkUpdateApplyAction;
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
}

class BulkUpdateToolbarControlComponent extends React.Component<BulkUpdateToolbarControlComponentProps, {}> {
    componentWillReceiveProps(nextProps: BulkUpdateToolbarControlComponentProps, nextContext: any) {
        //if there was a selected search and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected text
        //      if (StringExtensions.IsNullOrEmpty(nextProps.CurrentBulkUpdateName) && StringExtensions.IsNotNullOrEmpty(this.props.CurrentBulkUpdateName)) {
        //          (this.refs.typeahead as any).getInstance().clear()
        //      }
    }

    public componentDidMount() {
        //  this.props.onBulkUpdateCheckSelectedCells();
        //   this.props.onBulkUpdateValueChange("");
    }

    render() {


        let col: IColumn
        // if (this.props.PreviewInfo) {
        //    col = this.props.Columns.find(c => c.ColumnId == "counterparty") // hardcoding until can get it from selected cells!
        // }

        // missing datatype validation for time being

        //    let globalValidationMessage: string = PreviewHelper.GetValidationMessage(this.props.PreviewInfo, this.props.BulkUpdateValue);

        //    let showPanel: boolean = this.props.PreviewInfo && StringExtensions.IsNotNullOrEmpty(this.props.BulkUpdateValue) && StringExtensions.IsNotNullOrEmpty(globalValidationMessage)

        // we dont want to show the panel in the form but will need to appear in a popup....


        // turning this off until I can find a way to solve 2 problems
        // 1.  how to get distinct values from a column
        // 2.  listen to selectd cells changed (which might fix 1)
        let content = <span>
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                {col &&
                    <ColumnValueSelector
                        SelectedColumnValue={this.props.BulkUpdateValue}
                        SelectedColumn={col}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        onColumnValueChange={columns => this.onColumnValueSelectedChanged(columns)} />
                }
            </div>
        </span>

        return <div className="adaptable_blotter_style_dashboard_bulkupdate">
            <PanelDashboard headerText={StrategyNames.BulkUpdateStrategyName} glyphicon={StrategyGlyphs.BulkUpdateGlyph} onClose={() => this.props.onClose(StrategyIds.BulkUpdateStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
                {content}
            </PanelDashboard>
        </div>
    }

    private onColumnValueSelectedChanged(selectedColumnValue: any) {
        this.props.onBulkUpdateValueChange(selectedColumnValue);
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        BulkUpdateValue: state.BulkUpdate.BulkUpdateValue,
        PreviewInfo: state.BulkUpdate.PreviewInfo,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onBulkUpdateValueChange: (value: string) => dispatch(BulkUpdateRedux.BulkUpdateChangeValue(value)),
        onBulkUpdateCheckSelectedCells: () => dispatch(BulkUpdateRedux.BulkUpdateCheckCellSelection()),
        onApplyBulkUpdate: () => dispatch(BulkUpdateRedux.BulkUpdateApply(false)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.BulkUpdatePopup, isReadOnly))
    };
}

export let BulkUpdateToolbarControl = connect(mapStateToProps, mapDispatchToProps)(BulkUpdateToolbarControlComponent);
