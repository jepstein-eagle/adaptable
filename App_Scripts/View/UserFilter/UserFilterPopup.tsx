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
import { IStrategyViewPopupProps } from '../Components/SharedProps/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helpers/Helper';
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { UserFilterHelper } from '../../Core/Helpers/UserFilterHelper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { UserFilterWizard } from './Wizard/UserFilterWizard'
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { UserFilterEntityRow } from './UserFilterEntityRow';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { EntityItemList } from '../Components/EntityItemList';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';
import { UIHelper } from '../UIHelper';

interface UserFilterPopupProps extends IStrategyViewPopupProps<UserFilterPopupComponent> {
    UserFilters: IUserFilter[]
    Columns: IColumn[],
    onAddUpdateUserFilter: (userFilter: IUserFilter) => FilterRedux.UserFilterAddUpdateAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}


class UserFilterPopupComponent extends React.Component<UserFilterPopupProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState() ;
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
        if (this.state.EditedConfigEntity != null) {
            let filter: IUserFilter = this.state.EditedConfigEntity as IUserFilter
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
            { Content: "Name", Size: 3 },
            { Content: "Description", Size: 6 },
            { Content: "", Size: 3 },
        ]

        let UserFilterItems = this.props.UserFilters.filter(f => !UserFilterHelper.IsSystemUserFilter(f)).map((userFilter, index) => {
            return <UserFilterEntityRow
                ConfigEntity={userFilter}
                ColItems={colItems}
                key={"CS" + index}
                Index={index}
                onShare={() => this.props.onShare(userFilter)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(index, conditionalStyleCondition) => this.onEdit(userFilter as IUserFilter)}
                onDeleteConfirm={FilterRedux.UserFilterDelete(userFilter)} />
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create User Filter"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <PanelWithButton headerText={StrategyNames.UserFilterStrategyName} bsStyle="primary" style={panelStyle} infoBody={infoBody}
            button={newButton} glyphicon={StrategyGlyphs.UserFilterGlyph}>

            {UserFilterItems.length > 0 &&
                <EntityItemList ColItems={colItems} items={UserFilterItems} />
            }

            {UserFilterItems.length == 0 &&
                <Well bsSize="small">Click 'New' to start creating user filters.<p />
                    Once created, user filters are accessible both when filtering columns and creating queries (e.g. Advanced Search, Plus / Minus, Conditional Style etc.).</Well>
            }

            {this.state.EditedConfigEntity != null &&
                <UserFilterWizard
                    EditedUserFilter={this.state.EditedConfigEntity as IUserFilter}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    WizardStartIndex={this.state.WizardStartIndex}
                    SelectedColumnId={selectedColumnId}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </PanelWithButton>
    }

    onNew() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyUserFilter(), WizardStartIndex: 0 });
    }

    onEdit(userFilter: IUserFilter) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedConfigEntity: Helper.cloneObject(userFilter), WizardStartIndex: 1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.state = UIHelper.EmptyConfigState() ;
    }

    onFinishWizard() {
        let userFilter = this.state.EditedConfigEntity as IUserFilter
       this.props.onAddUpdateUserFilter(userFilter);
        this.state = UIHelper.EmptyConfigState() ;
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        UserFilters: state.UserFilter.UserFilters,
        Columns: state.Grid.Columns,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateUserFilter: (userFilter: IUserFilter) => dispatch(FilterRedux.UserFilterAddUpdate(userFilter)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.UserFilterStrategyId))
    };
}

export let UserFilterPopup = connect(mapStateToProps, mapDispatchToProps)(UserFilterPopupComponent);


let panelStyle = {
    width: '800px'
}
