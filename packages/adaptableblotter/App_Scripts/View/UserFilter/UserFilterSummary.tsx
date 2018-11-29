import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { UserFilterWizard } from './Wizard/UserFilterWizard'
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux'
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IUserFilter, IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../Utilities/Enums";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";


export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
    onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => UserFilterRedux.UserFilterAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class UserFilterSummaryComponent extends React.Component<UserFilterSummaryProps, EditableConfigEntityState> {


    constructor(props: UserFilterSummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__userfilter";
         let strategySummaries: any = []



        // title row
        let titleRow = <StrategyHeader
            key={StrategyConstants.UserFilterStrategyName}
            cssClassName={this.props.cssClassName}
            StrategyId={StrategyConstants.UserFilterStrategyId}
            StrategySummary={this.getSummary()}
            onNew={() => this.onNew()}
            NewButtonDisabled={!this.isFilterable()}
            NewButtonTooltip={StrategyConstants.UserFilterStrategyName}
            AccessLevel={this.props.AccessLevel}
        />
        strategySummaries.push(titleRow);

        // existing items
        this.props.UserFilters.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow =
                    <StrategyDetail
                        key={"UF" + index}
                        cssClassName={this.props.cssClassName}
                        Item1={item.Name}
                        Item2={this.getDescription(item)}
                        ConfigEnity={item}
                        showShare={this.props.TeamSharingActivated}
                        showEdit={this.isFilterable()}
                        EntityName={StrategyConstants.UserFilterStrategyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={UserFilterRedux.UserFilterDelete(item)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div >
            {strategySummaries}

            {this.state.EditedAdaptableBlotterObject &&
                <UserFilterWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IUserFilter}
                    ConfigEntities={null}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    SelectedColumnId={this.props.SummarisedColumn.ColumnId}
                    Blotter={this.props.Blotter}
                    WizardStartIndex={this.state.WizardStartIndex}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={() => this.canFinishWizard()}
                />
            }
        </div>
    }

    getSummary(): string {
        if (!this.isGridFilterable()) {
            return "Grid is not filterable"
        }

        if (!this.isColumnFilterable()) {
            return "Column is not filterable"
        }

        return Helper.ReturnItemCount(this.props.UserFilters.filter(uf => uf.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyConstants.UserFilterStrategyName)
    }

    getDescription(userFilter: IUserFilter): string {
        if (!this.isGridFilterable()) {
            return "Grid is not filterable"
        }

        if (!this.isColumnFilterable()) {
            return "Column is not filterable"
        }

        return ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns)
    }

    isFilterable(): boolean {
        if (!this.isGridFilterable() || !this.isColumnFilterable()) {
            return false;
        }
        return true;
    }

    isGridFilterable(): boolean {
        if (this.props.Blotter && !this.props.Blotter.isFilterable()) {
            return false;
        }
        return true;
    }

    isColumnFilterable(): boolean {
        if (this.props.SummarisedColumn && !this.props.SummarisedColumn.Filterable) {
            return false
        }
        return true;
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
        this.props.onAddUpdateUserFilter(this.state.EditedAdaptableBlotterObjectIndex, userFilter);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let userFilter = this.state.EditedAdaptableBlotterObject as IUserFilter
        return StringExtensions.IsNotNullOrEmpty(userFilter.Name) && StringExtensions.IsNotEmpty(userFilter.ColumnId) && ExpressionHelper.IsNotEmptyOrInvalidExpression(userFilter.Expression);
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateUserFilter: (index: number, UserFilter: IUserFilter) => dispatch(UserFilterRedux.UserFilterAddUpdate(index, UserFilter)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId))
    };
}

export let UserFilterSummary = connect(mapStateToProps, mapDispatchToProps)(UserFilterSummaryComponent);