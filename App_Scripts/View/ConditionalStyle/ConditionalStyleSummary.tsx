import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import { Col, Row } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ConditionalStyleWizard } from '../ConditionalStyle/ConditionalStyleWizard'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyConstants from '../../Core/StrategyConstants'
import { StringExtensions } from '../../Core/Extensions'
import { DistinctCriteriaPairValue, ConditionalStyleScope } from '../../Core/Enums'
import { IRawValueDisplayValuePair , IConfigEntity} from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'


export interface ConditionalStyleSummaryProps extends IStrategySummaryProps<ConditionalStyleSummaryComponent> {
    ConditionalStyles: IConditionalStyleCondition[]
    PredefinedColorChoices: string[]
    onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

export class ConditionalStyleSummaryComponent extends React.Component<ConditionalStyleSummaryProps, StrategySummaryInternalState> {

    constructor() {
        super();
        this.state = { EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 }

    }
    render(): any {
        let strategySummaries: any = []

        let existingItems = this.props.ConditionalStyles.filter(cs => cs.ColumnId == this.props.SummarisedColumn.ColumnId && cs.ConditionalStyleScope == ConditionalStyleScope.Column)
        let existingItemCount: any = (existingItems) ? existingItems.length : "No";
        // title row
        let titleRow = <StrategySummaryRow
            key={StrategyConstants.ConditionalStyleStrategyFriendlyName}
            StrategyName={StrategyConstants.ConditionalStyleStrategyFriendlyName}
            StrategySummary={Helper.ReturnItemCount(this.props.ConditionalStyles.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId && item.ConditionalStyleScope == ConditionalStyleScope.Column), StrategyConstants.ConditionalStyleStrategyFriendlyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyConstants.ConditionalStyleStrategyFriendlyName}
        />
        strategySummaries.push(titleRow);

        // existing items
        this.props.ConditionalStyles.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId && item.ConditionalStyleScope == ConditionalStyleScope.Column) {
                let detailRow =
                    <StrategyDetailRow
                        key={"CS" + index}
                        Item1={<StyleVisualItem Style={item.Style} />}
                        Item2={ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns, this.props.UserFilters)}
                        ConfigEnity={item}
                        EntityName={StrategyConstants.ConditionalStyleStrategyFriendlyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                onDelete={ConditionalStyleRedux.ConditionalStyleDelete(index, item)}
                    />
                strategySummaries.push(detailRow);
            }
        })


        return <div>
            {strategySummaries}

            {this.state.EditedItem &&
                <ConditionalStyleWizard
                    EditedConditionalStyleCondition={this.state.EditedItem as IConditionalStyleCondition}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    PredefinedColorChoices={this.props.PredefinedColorChoices}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.closeWizard()}
                    WizardFinish={() => this.WizardFinish()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        configEntity.ConditionalStyleScope = ConditionalStyleScope.Column;
        this.setState({ EditedItem: configEntity, WizardStartIndex: 1, EditedItemIndex: -1 });
    }

   onEdit(index: number, ConditionalStyle: IConditionalStyleCondition) {
        this.setState({ EditedItem: Helper.cloneObject(ConditionalStyle), WizardStartIndex: 1, EditedItemIndex: index });
    }

    closeWizard() {
        //   this.props.onClearPopupParams()
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }

    WizardFinish() {
        this.props.onAddUpdateConditionalStyle(this.state.EditedItemIndex, this.state.EditedItem as IConditionalStyleCondition );
         this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        ConditionalStyles: state.ConditionalStyle.ConditionalStyleConditions,
        UserFilters: state.Filter.UserFilters,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyle)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId))
    };
}

export let ConditionalStyleSummary = connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleSummaryComponent);

