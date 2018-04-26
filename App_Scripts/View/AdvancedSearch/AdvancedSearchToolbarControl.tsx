import * as React from "react";
import * as Redux from 'redux'
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { IAdvancedSearch } from '../../Strategy/Interface/IAdvancedSearchStrategy';
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
import { InputGroup } from "react-bootstrap";

interface AdvancedSearchToolbarControlComponentProps extends ToolbarStrategyViewPopupProps<AdvancedSearchToolbarControlComponent> {
    CurrentAdvancedSearchName: string;
    AdvancedSearches: IAdvancedSearch[];
    onSelectAdvancedSearch: (advancedSearchName: string) => AdvancedSearchRedux.AdvancedSearchSelectAction;
    onNewAdvancedSearch: () => PopupRedux.PopupShowAction;
    onEditAdvancedSearch: () => PopupRedux.PopupShowAction;
}

class AdvancedSearchToolbarControlComponent extends React.Component<AdvancedSearchToolbarControlComponentProps, {}> {
    componentWillReceiveProps(nextProps: AdvancedSearchToolbarControlComponentProps, nextContext: any) {
        //if there was a selected search and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected text
        if (StringExtensions.IsNullOrEmpty(nextProps.CurrentAdvancedSearchName) && StringExtensions.IsNotNullOrEmpty(this.props.CurrentAdvancedSearchName)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }
    render() {
        let cssClassName: string = this.props.cssClassName + "__advancedsearch";

        let savedSearch: IAdvancedSearch = this.props.AdvancedSearches.find(s => s.Name == this.props.CurrentAdvancedSearchName);

        let currentSearchName = StringExtensions.IsNullOrEmpty(this.props.CurrentAdvancedSearchName) ?
            "select" : this.props.CurrentAdvancedSearchName

        let sortedAdvancedSearches: IAdvancedSearch[] = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.AdvancedSearches, "Name")

        let content = <InputGroup>
            <Typeahead
                ref="typeahead"
                emptyLabel={"No Advanced Search"}
                placeholder={"Select a Search"}
                labelKey={"Name"}
                filterBy={["Name"]}
                clearButton={true}
                selected={savedSearch ? [savedSearch] : []}
                onChange={(selected) => { this.onSelectedSearchChanged(selected) }}
                options={sortedAdvancedSearches}
            />

            <InputGroup.Button>
                <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                    <ButtonEdit
                        style={{ marginLeft: "2px" }}
                        onClick={() => this.props.onEditAdvancedSearch()}
                        cssClassName={cssClassName}
                        size={"small"}
                        overrideTooltip="Edit Current Advanced Search"
                        overrideDisableButton={currentSearchName == "select"}
                        ConfigEntity={savedSearch}
                        DisplayMode="Glyph" />
                </span>
            </InputGroup.Button>
            <InputGroup.Button>
                <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                    <ButtonNew
                        style={{ marginLeft: "2px" }}
                        cssClassName={cssClassName} onClick={() => this.props.onNewAdvancedSearch()}
                        size={"small"}
                        overrideTooltip="Create New Advanced Search"
                        DisplayMode="Glyph" />
                </span>
            </InputGroup.Button>
            <InputGroup.Button>
                <span className={this.props.IsReadOnly ? "ab_readonly" : ""}>
                    <ButtonDelete
                        style={{ marginLeft: "2px" }}
                        cssClassName={cssClassName}
                        size={"small"}
                        overrideTooltip="Delete Advanced Search"
                        overrideDisableButton={currentSearchName == "select"}
                        ConfigEntity={savedSearch}
                        DisplayMode="Glyph"
                        ConfirmAction={AdvancedSearchRedux.AdvancedSearchDelete(savedSearch)}
                        ConfirmationMsg={"Are you sure you want to delete '" + !savedSearch ? "" : savedSearch.Name + "'?"}
                        ConfirmationTitle={"Delete Advanced Search"} />
                </span>
            </InputGroup.Button>
        </InputGroup>

        return <PanelDashboard cssClassName={cssClassName} headerText={StrategyNames.AdvancedSearchStrategyName} glyphicon={StrategyGlyphs.AdvancedSearchGlyph} onClose={() => this.props.onClose(StrategyIds.AdvancedSearchStrategyId)} onConfigure={() => this.props.onConfigure(this.props.IsReadOnly)}>
            {content}
        </PanelDashboard>
    }

    onSelectedSearchChanged(selected: IAdvancedSearch[]) {
        this.props.onSelectAdvancedSearch(selected.length > 0 ? selected[0].Name : "");
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
