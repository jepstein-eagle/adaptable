import { IPlusMinusCondition } from '../../Strategy/Interface/IPlusMinusStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { PlusMinusWizard } from './Wizard/PlusMinusWizard'
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';

export interface PlusMinusSummaryProps extends IStrategySummaryProps<PlusMinusSummaryComponent> {
    DefaultNudgeValue: number,
    PlusMinusConditions: IPlusMinusCondition[]
    onAddUpdatePlusMinus: (index: number, PlusMinus: IPlusMinusCondition) => PlusMinusRedux.PlusMinusAddUpdateConditionAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

export class PlusMinusSummaryComponent extends React.Component<PlusMinusSummaryProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 }

    }
    render(): any {
        let strategySummaries: any = []

        // title row
        let titleRow = <StrategySummaryRow
            key={StrategyNames.PlusMinusStrategyName}
            StrategyId={StrategyIds.PlusMinusStrategyId}
             StrategySummary={Helper.ReturnItemCount(this.props.PlusMinusConditions.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), "Plus Minus Condition")}
            onNew={() => this.onNew()}
            NewButtonTooltip={"Plus / Minus Rule"}
        />

        strategySummaries.push(titleRow);

        // existing items
        this.props.PlusMinusConditions.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow =
                    <StrategyDetailRow
                        key={"PM" + index}
                        Item1={"Nudge Value: " + item.DefaultNudge}
                        Item2={this.wrapExpressionDescription(ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns, this.props.UserFilters))}
                        ConfigEnity={item}
                        EntityName={StrategyNames.PlusMinusStrategyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={PlusMinusRedux.PlusMinusDeleteCondition(index)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div>
            {strategySummaries}

            {this.state.EditedConfigEntity &&
                <PlusMinusWizard
                    EditedPlusMinusCondition={this.state.EditedConfigEntity as IPlusMinusCondition}
                    PlusMinusConditions={this.props.PlusMinusConditions}
                    Columns={this.props.Columns}
                    SelectedColumnId={this.props.SummarisedColumn.ColumnId}
                    UserFilters={this.props.UserFilters}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </div>
    }


    onNew() {
        let configEntity: IPlusMinusCondition = ObjectFactory.CreateEmptyPlusMinusCondition(this.props.DefaultNudgeValue)
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedConfigEntity: configEntity, WizardStartIndex: 1, EditedIndexConfigEntity: -1 });
    }

    onEdit(index: number, PlusMinus: IPlusMinusCondition) {
        this.setState({ EditedConfigEntity: Helper.cloneObject(PlusMinus), WizardStartIndex: 1, EditedIndexConfigEntity: index });
    }

    onCloseWizard() {
        //   this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

    onFinishWizard() {
         this.props.onAddUpdatePlusMinus(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as IPlusMinusCondition );
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

        // wrappng this so that any becomes [Default Column Nudge Value]
        private wrapExpressionDescription(expressionDescription: string): string {
            return (expressionDescription == "Any") ? "[Default Column Nudge Value]" : expressionDescription;
        }
    
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        DefaultNudgeValue: state.PlusMinus.DefaultNudge,
        PlusMinusConditions: state.PlusMinus.PlusMinusConditions,
        UserFilters: state.UserFilter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdatePlusMinus: (index: number, PlusMinus: IPlusMinusCondition) => dispatch(PlusMinusRedux.PlusMinusAddUpdateCondition(index, PlusMinus)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.PlusMinusStrategyId))
    };
}

export let PlusMinusSummary = connect(mapStateToProps, mapDispatchToProps)(PlusMinusSummaryComponent);

