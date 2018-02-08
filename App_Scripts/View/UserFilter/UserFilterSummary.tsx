import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../Components/SharedProps/IStrategySummary'
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
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
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { UIHelper } from '../UIHelper';


export interface UserFilterSummaryProps extends IStrategySummaryProps<UserFilterSummaryComponent> {
    onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => UserFilterRedux.UserFilterAddUpdateAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

export class UserFilterSummaryComponent extends React.Component<UserFilterSummaryProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState() ;  
    }

    render(): any {

        let strategySummaries: any = []

        // title row
        let titleRow = <StrategyHeader
            key={StrategyNames.UserFilterStrategyName}
            IsReadOnly={this.props.IsReadOnly}
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
                        IsReadOnly={this.props.IsReadOnly}
                        Item1={item.FriendlyName}
                        Item2={ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns, this.props.UserFilters)}
                        ConfigEnity={item}
                        EntityName={StrategyNames.UserFilterStrategyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={UserFilterRedux.UserFilterDelete(item)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div>
            {strategySummaries}

            {this.state.EditedConfigEntity &&
                <UserFilterWizard
                    EditedUserFilter={this.state.EditedConfigEntity as IUserFilter}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
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
            this.setState({ EditedConfigEntity: configEntity, WizardStartIndex: 1, EditedIndexConfigEntity: -1 });
    }

    onEdit(index: number, UserFilter: IUserFilter) {
        this.setState({ EditedConfigEntity: Helper.cloneObject(UserFilter), WizardStartIndex: 1, EditedIndexConfigEntity: index });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

    onFinishWizard() {
        this.props.onAddUpdateUserFilter(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as IUserFilter, );
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => dispatch(UserFilterRedux.UserFilterAddUpdate(UserFilter)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.UserFilterStrategyId))
    };
}

export let UserFilterSummary = connect(mapStateToProps, mapDispatchToProps)(UserFilterSummaryComponent);