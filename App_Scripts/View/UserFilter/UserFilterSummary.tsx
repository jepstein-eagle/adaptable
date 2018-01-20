import { IUserFilter } from '../../Core/Interface/IExpression';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import { UserFilterWizard } from '../UserFilter/UserFilterWizard'
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyConstants from '../../Core/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterHelper } from '../../Core/Services/UserFilterHelper';
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { IRawValueDisplayValuePair, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';


export interface UserFilterSummaryProps extends IStrategySummaryProps<UserFilterSummaryComponent> {
    onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => FilterRedux.UserFilterAddUpdateAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

export class UserFilterSummaryComponent extends React.Component<UserFilterSummaryProps, StrategySummaryInternalState> {

    constructor() {
        super();
        this.state = { EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 }
    }

    render(): any {

        let strategySummaries: any = []

        // title row
        let titleRow = <StrategySummaryRow
            key={StrategyConstants.FilterStrategyFriendlyName}
            StrategyName={StrategyConstants.FilterStrategyFriendlyName}
            StrategySummary={Helper.ReturnItemCount(this.props.UserFilters.filter(uf => uf.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyConstants.FilterStrategyFriendlyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyConstants.FilterStrategyFriendlyName}
        />
        strategySummaries.push(titleRow);

        // existing items
        this.props.UserFilters.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow =
                    <StrategyDetailRow
                        key={"UF" + index}
                        Item1={item.FriendlyName}
                        Item2={ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns, this.props.UserFilters)}
                        ConfigEnity={item}
                        EntityName={StrategyConstants.FilterStrategyFriendlyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={FilterRedux.UserFilterDelete(item)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div>
            {strategySummaries}

            {this.state.EditedItem &&
                <UserFilterWizard
                    EditedUserFilter={this.state.EditedItem as IUserFilter}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SelectedColumnId={this.props.SummarisedColumn.ColumnId}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.closeWizard()}
                    WizardFinish={() => this.WizardFinish()}
                />
            }
        </div>
    }

    onNew() {
        this.setState({ EditedItem: ObjectFactory.CreateEmptyUserFilter(), WizardStartIndex: 0, EditedItemIndex: -1 });
    }

    onEdit(index: number, UserFilter: IUserFilter) {
        this.setState({ EditedItem: Helper.cloneObject(UserFilter), WizardStartIndex: 1, EditedItemIndex: index });
    }

    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }

    WizardFinish() {
        this.props.onAddUpdateUserFilter(this.state.EditedItemIndex, this.state.EditedItem as IUserFilter, );
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => dispatch(FilterRedux.UserFilterAddUpdate(UserFilter)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellValidationStrategyId))
    };
}

export let UserFilterSummary = connect(mapStateToProps, mapDispatchToProps)(UserFilterSummaryComponent);