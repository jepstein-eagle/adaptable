import * as React from "react";
import * as Redux from 'redux'
import { Provider, connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux'
import { Form, Panel, FormControl, ControlLabel, Label, Button, OverlayTrigger, Tooltip, Glyphicon, FormGroup, Row } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { StringExtensions } from '../../Core/Extensions';
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IDashboardStrategyControlConfiguration } from '../../Core/Interface/IDashboardStrategy';
import { IColumnFilter } from '../../Core/interface/IFilterStrategy';
import { Helper } from '../../Core/Helper';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import * as StrategyIds from '../../Core/StrategyIds'

interface FilterToolbarControlComponentProps extends IStrategyViewPopupProps<FilterToolbarControlComponent> {
    onChangeControlCollapsedState: (ControlName: string, IsCollapsed: boolean) => DashboardRedux.DashboardChangeControlCollapseStateAction
    onClearFilters: () => FilterRedux.ColumnFilterClearAction,
    FilterDashboardControl: IDashboardStrategyControlConfiguration,
    IsReadOnly: boolean,
    ColumnFilters: IColumnFilter[],
    Columns: IColumn[]
}



class FilterToolbarControlComponent extends React.Component<FilterToolbarControlComponentProps, {}> {

    render(): any {

        let tooltipText = this.props.FilterDashboardControl.IsCollapsed ? "Expand" : "Collapse";
        let collapsedText = this.props.ColumnFilters.length == 0 ? "None" : this.props.ColumnFilters.length + " Column(s)";
        let collapsedContent = <ControlLabel>{collapsedText}</ControlLabel>;
      
        let toolbarHeaderButton = <OverlayTrigger overlay={<Tooltip id="toolexpand">{tooltipText}</Tooltip>}>
            <Button bsStyle="primary" onClick={() => this.expandCollapseClicked()}>
                {' '}<Glyphicon glyph="filter" />{' '}Filters{' '}<Glyphicon glyph={this.props.FilterDashboardControl.IsCollapsed ? "chevron-down" : "chevron-up"} />
            </Button>
        </OverlayTrigger>

        let columnFilterNames: string = "";
        this.props.ColumnFilters.forEach(x => {
            let column: IColumn = this.props.Columns.find(c => c.ColumnId == x.ColumnId);
            if (column) {
                columnFilterNames = columnFilterNames + column.FriendlyName + ", "
            }
        })
        columnFilterNames = StringExtensions.RemoveTrailingComma(columnFilterNames);


        let expandedContent: any = <span>
            <div style={marginButtonStyle} className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
                <ControlLabel> {columnFilterNames}</ControlLabel>
                {' '}
                <ButtonClear onClick={() => this.props.onClearFilters()}
                    size="small"
                    overrideTooltip="Clear Filters"
                    DisplayMode="Glyph+Text"
                    overrideDisableButton={this.props.ColumnFilters.length == 0} />
            </div>
        </span>

        return <Panel className="small-padding-panel">
            <AdaptableBlotterForm className='navbar-form' >
                <FormGroup controlId="formFilter">
                    {this.props.FilterDashboardControl.IsCollapsed ?
                        <span>
                            {toolbarHeaderButton}
                            {' '}
                            {collapsedContent}
                        </span>
                        :
                        <span>
                            {toolbarHeaderButton}
                            {' '}  {' '}
                            {expandedContent}
                        </span>
                    }
                </FormGroup>

            </AdaptableBlotterForm>
        </Panel>


    }

    expandCollapseClicked() {
        this.props.onChangeControlCollapsedState(this.props.FilterDashboardControl.Strategy, !this.props.FilterDashboardControl.IsCollapsed);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        FilterDashboardControl: state.Dashboard.DashboardStrategyControls.find(d => d.Strategy == StrategyIds.FilterStrategyId),
        ColumnFilters: state.Filter.ColumnFilters,
        Columns: state.Grid.Columns
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onChangeControlCollapsedState: (controlName: string, isCollapsed: boolean) => dispatch(DashboardRedux.ChangeCollapsedStateDashboardControl(controlName, isCollapsed)),
        onClearFilters: () => dispatch(FilterRedux.ColumnFilterClear()),
    };
}

export let FilterToolbarControl = connect(mapStateToProps, mapDispatchToProps)(FilterToolbarControlComponent);


var marginButtonStyle = {
    marginTop: '4px'
};