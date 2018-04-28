import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux'
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
import { SortOrder } from '../../Core/Enums';
import { InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import { ButtonClear } from "../Components/Buttons/ButtonClear";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { IAdvancedSearch } from "../../Core/Api/AdaptableBlotterObjects";


interface AdvancedSearchToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<AdvancedSearchToolbarControlComponent> {
    CurrentAdvancedSearchName: string;
    AdvancedSearches: IAdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.PopupShowAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowAction;
}

class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
   
   
    render() {
        const selectSearchString: string = "Select a Search"
        let cssClassName: string = this.props.cssClassName + "__advancedsearch";

        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Name == this.props.CurrentAdvancedSearchName);

        let currentSearchName = StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName) ?
            selectSearchString : this.props.CurrentAdvancedSearchName

        let sortedAdvancedSearches: IAdvancedSearch[] = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.AdvancedSearches, "Name")

        let availableSearches: any[] = sortedAdvancedSearches.filter(s => s.Name != this.props.CurrentAdvancedSearchName).map((search, index) => {
            return <MenuItem key={index} eventKey={index} onClick={() => this.onSelectedSearchChanged(search.Name)} >{search.Name}</MenuItem>
        })
        let content = <span>

            <InputGroup>
                <DropdownButton disabled={availableSearches.length == 0} style={{ minWidth: "120px" }} 
                  className={cssClassName} bsSize={"small"} bsStyle={"default"} title={currentSearchName} id="advancedSearch" componentClass={InputGroup.Button}>
                    {availableSearches}
                </DropdownButton>
                {currentSearchName != selectSearchString &&
                    <InputGroup.Button>
                        <ButtonClear
                            bsStyle={"default"}
                            cssClassName={cssClassName}
                            onClick={() => this.onSelectedSearchChanged("")}
                            size={"small"}
                            overrideTooltip="Clear Search"
                            overrideDisableButton={currentSearchName == selectSearchString}
                            ConfigEntity={savedSearch}
                            DisplayMode="Glyph" />
                    </InputGroup.Button>
                }
            </InputGroup>

            <span className={this.props.IsReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                <ButtonEdit
                    style={{ marginLeft: "5px" }}
                    onClick={() => this.props.onEditAdvancedSearch()}
                    cssClassName={cssClassName}
                    size={"small"}
                    overrideTooltip="Edit Current Advanced Search"
                    overrideDisableButton={currentSearchName == selectSearchString}
                    ConfigEntity={savedSearch}
                    DisplayMode="Glyph" />
                <ButtonNew
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName} onClick={() => this.props.onNewAdvancedSearch()}
                    size={"small"}
                    overrideTooltip="Create New Advanced Search"
                    DisplayMode="Glyph" />
                <ButtonDelete
                    style={{ marginLeft: "2px" }}
                    cssClassName={cssClassName}
                    size={"small"}
                    overrideTooltip="Delete Advanced Search"
                    overrideDisableButton={currentSearchName == selectSearchString}
                    ConfigEntity={savedSearch}
                    DisplayMode="Glyph"
                    ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(savedSearch)}
                    ConfirmationMsg={"Are you sure you want to delete '" + !savedSearch ? "" : savedSearch.Name + "'?"}
                    ConfirmationTitle={"Delete Advanced Search"} />
            </span>
        </span>


        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.AdvancedSearchStrategyName} glyphicon={StrategyGlyphs.AdvancedSearchGlyph} onClose={() => this.props.onClose(StrategyIds.AdvancedSearchStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
    }

    onSelectedSearchChanged(searchName: string) {
        this.props.onSelectAdvancedSearch(searchName);
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentAdvancedSearchName: state.AdvancedSearch.CurrentAdvancedSearch,
        AdvancedSearches: state.AdvancedSearch.AdvancedSearches,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onSelectAdvancedSearch: (advancedSearchName: string) => dispatch(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName)),
        onNewAdvancedSearch: () => dispatch(PopupRedux.PopupShow(ScreenPopups.AdvancedSearchPopup, false, "New")),
        onEditAdvancedSearch: () => dispatch(PopupRedux.PopupShow(ScreenPopups.AdvancedSearchPopup, false, "Edit")),
        onClose: (dashboardControl: string) => dispatch(DashboardRedux.ChangeVisibilityDashboardControl(dashboardControl)),
        onConfigure: (isReadOnly: boolean) => dispatch(PopupRedux.PopupShow(ScreenPopups.AdvancedSearchPopup, isReadOnly))
    };
}

export let AdvancedSearchToolbarControl = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchToolbarControlComponent);
