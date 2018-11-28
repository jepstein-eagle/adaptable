import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PlusMinusWizard } from './Wizard/PlusMinusWizard'
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux'
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
import { IAdaptableBlotterObject, IPlusMinusRule } from "../../Api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../Core/Enums";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";

export interface PlusMinusSummaryProps extends StrategySummaryProps<PlusMinusSummaryComponent> {
    PlusMinusRules: IPlusMinusRule[]
    onAddUpdatePlusMinus: (index: number, PlusMinus: IPlusMinusRule) => PlusMinusRedux.PlusMinusAddUpdateConditionAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class PlusMinusSummaryComponent extends React.Component<PlusMinusSummaryProps, EditableConfigEntityState> {

    constructor(props: PlusMinusSummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();

    }
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__plusminus";
         let strategySummaries: any = []

        // title row
        let titleRow = <StrategyHeader
            key={StrategyConstants.PlusMinusStrategyName}
            cssClassName={this.props.cssClassName}
            StrategyId={StrategyConstants.PlusMinusStrategyId}
            StrategySummary={Helper.ReturnItemCount(this.props.PlusMinusRules.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), "Plus Minus Condition")}
            onNew={() => this.onNew()}
            NewButtonTooltip={"Plus / Minus Rule"}
            AccessLevel={this.props.AccessLevel}
        />

        strategySummaries.push(titleRow);

        // existing items
        this.props.PlusMinusRules.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow =
                    <StrategyDetail
                        key={"PM" + index}
                        cssClassName={this.props.cssClassName}
                        Item1={"Nudge Value: " + item.NudgeValue}
                        Item2={this.wrapExpressionDescription(ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns))}
                        ConfigEnity={item}
                        showShare={this.props.TeamSharingActivated}
                        EntityName={StrategyConstants.PlusMinusStrategyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={PlusMinusRedux.PlusMinusDeleteCondition(index)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div >
            {strategySummaries}

            {this.state.EditedAdaptableBlotterObject &&
                <PlusMinusWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IPlusMinusRule}
                    ConfigEntities={null}
                     ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    SelectedColumnId={this.props.SummarisedColumn.ColumnId}
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
        let configEntity: IPlusMinusRule = ObjectFactory.CreateEmptyPlusMinusRule()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, PlusMinus: IPlusMinusRule) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(PlusMinus), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        this.props.onAddUpdatePlusMinus(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as IPlusMinusRule);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let plusMinus = this.state.EditedAdaptableBlotterObject as IPlusMinusRule
        return StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
            StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
            (plusMinus.IsDefaultNudge || ExpressionHelper.IsNotEmptyOrInvalidExpression(plusMinus.Expression))
    }

    wrapExpressionDescription(expressionDescription: string): string {
        return (expressionDescription == "Any") ? "[Default Column Nudge Value]" : expressionDescription;
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        PlusMinusRules: state.PlusMinus.PlusMinusRules,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
        };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdatePlusMinus: (index: number, PlusMinus: IPlusMinusRule) => dispatch(PlusMinusRedux.PlusMinusAddUpdateCondition(index, PlusMinus)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PlusMinusStrategyId))
    };
}

export let PlusMinusSummary = connect(mapStateToProps, mapDispatchToProps)(PlusMinusSummaryComponent);

