import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import { ColumnFilterEntityRow } from './ColumnFilterEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";

interface ColumnFilterPopupProps extends StrategyViewPopupProps<ColumnFilterPopupComponent> {
    ColumnFilters: IColumnFilter[]
    onDeleteFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterDeleteAction,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class ColumnFilterPopupComponent extends React.Component<ColumnFilterPopupProps, {}> {

    constructor() {
        super();
        this.state = { EditedUserFilter: null, WizardStartIndex: 0 }
    }

    render() {
        let infoBody: any[] = ["Column Filters are set using the filter dropdown in the column header menu.", <br />, <br />,
            "This popup allows you to see which columns have filters applied with an option to clear them."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 3 },
            { Content: "Filter", Size: 7 },
            { Content: "", Size: 2 },
        ]
        let columnFilterItems = this.props.ColumnFilters.map((columnFilter, index) => {
            return <ColumnFilterEntityRow
                key={index}
                ColItems={colItems}
                AdaptableBlotterObject={null}
                ColumnFilter={columnFilter}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={null}
                onDeleteConfirm={null}
                onClear={() => this.props.onDeleteFilter(columnFilter)}
            />

        })

        return <div className="adaptable_blotter_style_popup_columnfilter">
            <PanelWithButton headerText={StrategyNames.ColumnFilterStrategyName} bsStyle="primary" className="adaptableblotter_modal_main_panel" infoBody={infoBody}
                button={null} glyphicon={StrategyGlyphs.ColumnFilterGlyph}>

                {columnFilterItems.length > 0 &&
                    <AdaptableObjectCollection ColItems={colItems} items={columnFilterItems} />
                }

                {columnFilterItems.length == 0 &&
                    <Well bsSize="small">There are currently no column filters applied.  Create column filters by using the filter dropdown in each column header.</Well>
                }

            </PanelWithButton>
        </div>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnFilters: state.ColumnFilter.ColumnFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteFilter: (columnFilter: IColumnFilter) => dispatch(ColumnFilterRedux.ColumnFilterDelete(columnFilter)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.UserFilterStrategyId))
    };
}

export let ColumnFilterPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnFilterPopupComponent);
