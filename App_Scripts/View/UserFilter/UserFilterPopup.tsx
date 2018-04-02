import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as FilterRedux from '../../Redux/ActionsReducers/UserFilterRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import { Helper } from '../../Core/Helpers/Helper';
import { IUserFilter, ISystemFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { UserFilterWizard } from './Wizard/UserFilterWizard'
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { UserFilterEntityRow } from './UserFilterEntityRow';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";

interface UserFilterPopupProps extends StrategyViewPopupProps<UserFilterPopupComponent> {
    onAddUpdateUserFilter: (userFilter: IUserFilter) => FilterRedux.UserFilterAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}


class UserFilterPopupComponent extends React.Component<UserFilterPopupProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let userFilter: IUserFilter = ObjectFactory.CreateEmptyUserFilter();
                userFilter.ColumnId = arrayParams[1]
                this.onEdit(userFilter)
            }
        }
    }
    render() {
        let infoBody: any[] = ["User Filters are named, reusable Column Queries.", <br />, <br />,
            "Once created, User Filters are available in the column's filter dropdown as if a single colum value.", <br />, <br />,
            "Additionally they are available when creating other Queries (e.g. for Advanced Search)", <br />, <br />,
            "A User Filter Query can contain only one Column Condition; but that condition may contain as many column values, filter or ranges as required."]

        let selectedColumnId: string = "";
        if (this.state.EditedAdaptableBlotterObject != null) {
            let filter: IUserFilter = this.state.EditedAdaptableBlotterObject as IUserFilter
            let editedColumn: string = filter.ColumnId;
            if (StringExtensions.IsNotNullOrEmpty(editedColumn)) {
                selectedColumnId = editedColumn;
            }
            else if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
                let arrayParams = this.props.PopupParams.split("|")
                if (arrayParams.length == 2) {
                    selectedColumnId = arrayParams[1];
                }
            }
        }

        let colItems: IColItem[] = [
            { Content: "Name", Size: 2 },
            { Content: "Column", Size: 2 },
            { Content: "Description", Size: 6 },
            { Content: "", Size: 2 },
        ]

        let UserFilterItems = this.props.UserFilters.map((userFilter, index) => {
            return <UserFilterEntityRow
                AdaptableBlotterObject={userFilter}
                ColItems={colItems}
                key={"CS" + index}
                Index={index}
                onShare={() => this.props.onShare(userFilter)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(index, userFilter) => this.onEdit(userFilter as IUserFilter)}
                onDeleteConfirm={FilterRedux.UserFilterDelete(userFilter)} />
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create User Filter"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <div className="adaptable_blotter_style_popup_userfilter">
            <PanelWithButton headerText={StrategyNames.UserFilterStrategyName} bsStyle="primary" className="adaptableblotter_modal_main_popup" infoBody={infoBody}
                button={newButton} glyphicon={StrategyGlyphs.UserFilterGlyph}>

                {UserFilterItems.length > 0 &&
                    <AdaptableObjectCollection ColItems={colItems} items={UserFilterItems} />
                }

                {UserFilterItems.length == 0 &&
                    <Well bsSize="small">Click 'New' to start creating user filters.<p />
                        Once created, user filters are accessible both when filtering columns and creating queries (e.g. Advanced Search, Plus / Minus, Conditional Style etc.).</Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <UserFilterWizard
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IUserFilter}
                        Columns={this.props.Columns}
                        ConfigEntities={null}
                        ModalContainer={this.props.ModalContainer}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        WizardStartIndex={this.state.WizardStartIndex}
                        SelectedColumnId={selectedColumnId}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyUserFilter(), WizardStartIndex: 0 });
    }

    onEdit(userFilter: IUserFilter) {
        let clonedObject: IUserFilter = Helper.cloneObject(userFilter);
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(clonedObject), WizardStartIndex: 1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let userFilter = this.state.EditedAdaptableBlotterObject as IUserFilter
        this.props.onAddUpdateUserFilter(userFilter);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateUserFilter: (userFilter: IUserFilter) => dispatch(FilterRedux.UserFilterAddUpdate(userFilter)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.UserFilterStrategyId))
    };
}

export let UserFilterPopup = connect(mapStateToProps, mapDispatchToProps)(UserFilterPopupComponent);
