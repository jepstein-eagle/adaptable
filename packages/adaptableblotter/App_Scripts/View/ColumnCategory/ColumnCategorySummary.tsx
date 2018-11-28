import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ColumnCategoryWizard } from './Wizard/ColumnCategoryWizard'
import * as ColumnCategoryRedux from '../../Redux/ActionsReducers/ColumnCategoryRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../Core/Enums";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";
import { IColumnCategory } from "../../Core/Interface/Interfaces";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { StrategyProfile } from "../Components/StrategyProfile";

export interface ColumnCategorySummaryProps extends StrategySummaryProps<ColumnCategorySummaryComponent> {
    ColumnCategorys: IColumnCategory[]
    // onAddUpdateColumnCategory: (index: number, ColumnCategory: IColumnCategory) => ColumnCategoryRedux.ColumnCategoryAddUpdateConditionAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class ColumnCategorySummaryComponent extends React.Component<ColumnCategorySummaryProps, EditableConfigEntityState> {

    constructor(props: ColumnCategorySummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();

    }
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__ColumnCategory";
        let ColumnCategory: IColumnCategory = this.props.ColumnCategorys.find(lk => ArrayExtensions.ContainsItem(lk.ColumnIds, this.props.SummarisedColumn.ColumnId))
        let noColumnCategory: boolean = ColumnCategory == null;

        let ColumnCategoryRow: any;
        if (noColumnCategory) {
            ColumnCategoryRow = <StrategyHeader
                key={StrategyConstants.ColumnCategoryStrategyName}
                cssClassName={this.props.cssClassName}
                StrategyId={StrategyConstants.ColumnCategoryStrategyId}
                StrategySummary={ "None"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyConstants.ColumnCategoryStrategyName}
                AccessLevel={this.props.AccessLevel}
            />
        } else {
            ColumnCategoryRow = <StrategyDetail
                key={StrategyConstants.ColumnCategoryStrategyName}
                cssClassName={this.props.cssClassName}
                Item1={<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={StrategyConstants.ColumnCategoryStrategyId} />}
                Item2={ColumnCategory.ColumnCategoryId}
                ConfigEnity={ColumnCategory}
                showShare={this.props.TeamSharingActivated}
                EntityName={StrategyConstants.ColumnCategoryStrategyName}
                onEdit={() => this.onEdit(ColumnCategory)}
                onShare={() => this.props.onShare(ColumnCategory)}
                onDelete={ColumnCategoryRedux.ColumnCategoryDelete(ColumnCategory)}
                showBold={true}
            />
        }

        return <div >
            {ColumnCategoryRow}

            {this.state.EditedAdaptableBlotterObject &&
                <ColumnCategoryWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IColumnCategory}
                    ConfigEntities={null}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    ColumnCategorys={this.props.ColumnCategorys}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    Blotter={this.props.Blotter}
                    WizardStartIndex={this.state.WizardStartIndex}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={() => this.canFinishWizard()}
                />
            }
        </div>
    }


    onNew() {
        let configEntity: IColumnCategory = ObjectFactory.CreateEmptyColumnCategory()
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit( ColumnCategory: IColumnCategory) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(ColumnCategory), WizardStartIndex: 1});
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        //  this.props.onAddUpdateColumnCategory(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as IColumnCategory);
        //  this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        //   let ColumnCategory = this.state.EditedAdaptableBlotterObject as IColumnCategory
        //   return StringExtensions.IsNotNullOrEmpty(ColumnCategory.ColumnId) &&
        //       StringExtensions.IsNotNullOrEmpty(ColumnCategory.NudgeValue.toString()) && // check its a number??
        //       (ColumnCategory.IsDefaultNudge || ExpressionHelper.IsNotEmptyOrInvalidExpression(ColumnCategory.Expression))
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        ColumnCategorys: state.ColumnCategory.ColumnCategories,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        //   onAddUpdateColumnCategory: (index: number, ColumnCategory: IColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryAddUpdateCondition(index, ColumnCategory)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnCategoryStrategyId))
    };
}

export let ColumnCategorySummary = connect(mapStateToProps, mapDispatchToProps)(ColumnCategorySummaryComponent);

