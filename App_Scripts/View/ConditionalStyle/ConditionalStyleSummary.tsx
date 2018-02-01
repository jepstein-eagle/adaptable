import { IConditionalStyleCondition } from '../../Strategy/Interface/IConditionalStyleStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { Col, Row } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ConditionalStyleWizard } from './Wizard/ConditionalStyleWizard'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import { StringExtensions } from '../../Core/Extensions'
import { DistinctCriteriaPairValue, ConditionalStyleScope } from '../../Core/Enums'
import { IRawValueDisplayValuePair, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'


export interface ConditionalStyleSummaryProps extends IStrategySummaryProps<ConditionalStyleSummaryComponent> {
    ConditionalStyles: IConditionalStyleCondition[]
    PredefinedColorChoices: string[]
    onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyleCondition) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
    
}

export class ConditionalStyleSummaryComponent extends React.Component<ConditionalStyleSummaryProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 }

    }
    render(): any {
        let strategySummaries: any = []

        let existingItems = this.props.ConditionalStyles.filter(cs => cs.ColumnId == this.props.SummarisedColumn.ColumnId && cs.ConditionalStyleScope == ConditionalStyleScope.Column)
        let existingItemCount: any = (existingItems) ? existingItems.length : "No";
        // title row
        let titleRow = <StrategySummaryRow
            key={StrategyNames.ConditionalStyleStrategyName}
            StrategyId={StrategyIds.ConditionalStyleStrategyId}
             StrategySummary={Helper.ReturnItemCount(this.props.ConditionalStyles.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId && item.ConditionalStyleScope == ConditionalStyleScope.Column), StrategyNames.ConditionalStyleStrategyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyNames.ConditionalStyleStrategyName}
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
                        EntityName={StrategyNames.ConditionalStyleStrategyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={ConditionalStyleRedux.ConditionalStyleDelete(index, item)}
                    />
                strategySummaries.push(detailRow);
            }
        })


        return <div>
            {strategySummaries}

            {this.state.EditedConfigEntity &&
                <ConditionalStyleWizard
                    EditedConditionalStyleCondition={this.state.EditedConfigEntity as IConditionalStyleCondition}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    PredefinedColorChoices={this.props.PredefinedColorChoices}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: IConditionalStyleCondition = ObjectFactory.CreateEmptyConditionalStyle()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        configEntity.ConditionalStyleScope = ConditionalStyleScope.Column;
        this.setState({ EditedConfigEntity: configEntity, WizardStartIndex: 1, EditedIndexConfigEntity: -1 });
    }

    onEdit(index: number, ConditionalStyle: IConditionalStyleCondition) {
        this.setState({ EditedConfigEntity: Helper.cloneObject(ConditionalStyle), WizardStartIndex: 1, EditedIndexConfigEntity: index });
    }

    onCloseWizard() {
        //   this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

    onFinishWizard() {
        this.props.onAddUpdateConditionalStyle(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as IConditionalStyleCondition);
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        ConditionalStyles: state.ConditionalStyle.ConditionalStyleConditions,
        UserFilters: state.UserFilter.UserFilters,
        PredefinedColorChoices: state.UIControlConfig.PredefinedColorChoices
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyleCondition) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyle)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ConditionalStyleStrategyId))
    };
}

export let ConditionalStyleSummary = connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleSummaryComponent);

