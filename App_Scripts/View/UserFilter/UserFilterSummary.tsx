import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { UserFilterWizard } from './Wizard/UserFilterWizard'
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';


export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
    onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => UserFilterRedux.UserFilterAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class UserFilterSummaryComponent extends React.Component<UserFilterSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {

        let strategySummaries: any = []

        // title row
        let titleRow = <StrategyHeader
            key={StrategyNames.UserFilterStrategyName}
            StrategyId={StrategyIds.UserFilterStrategyId}
            StrategySummary={Helper.ReturnItemCount(this.props.UserFilters.filter(uf => uf.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyNames.UserFilterStrategyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyNames.UserFilterStrategyName}
        />
        strategySummaries.push(titleRow);

        // existing items
        this.props.UserFilters.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow =
                    <StrategyDetail
                        key={"UF" + index}
                        Item1={item.Name}
                        Item2={ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns, this.props.UserFilters)}
                        ConfigEnity={item}
                        showShare={this.props.TeamSharingActivated}
                        EntityName={StrategyNames.UserFilterStrategyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={UserFilterRedux.UserFilterDelete(item)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
             {strategySummaries}

            {this.state.EditedAdaptableBlotterObject &&
                <UserFilterWizard
                    EditedUserFilter={this.state.EditedAdaptableBlotterObject as IUserFilter}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    SelectedColumnId={this.props.SummarisedColumn.ColumnId}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: IUserFilter = ObjectFactory.CreateEmptyUserFilter()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, UserFilter: IUserFilter) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(UserFilter), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
         this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let userFilter = this.state.EditedAdaptableBlotterObject as IUserFilter
        this.props.onAddUpdateUserFilter(this.state.EditedAdaptableBlotterObjectIndex, userFilter );
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => dispatch(UserFilterRedux.UserFilterAddUpdate(UserFilter)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.UserFilterStrategyId))
    };
}

export let UserFilterSummary = connect(mapStateToProps, mapDispatchToProps)(UserFilterSummaryComponent);