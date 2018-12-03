import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ConditionalStyleWizard } from './Wizard/ConditionalStyleWizard'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { ConditionalStyleScope, AccessLevel } from '../../Utilities/Enums'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IConditionalStyle, IAdaptableBlotterObject } from "../../api/Interface/IAdaptableBlotterObjects";
import { IColumnCategory } from "../../api/Interface/Interfaces";


export interface ConditionalStyleSummaryProps extends StrategySummaryProps<ConditionalStyleSummaryComponent> {
    ConditionalStyles: IConditionalStyle[]
    ColorPalette: string[]
    ColumnCategories: IColumnCategory[]
    StyleClassNames: string[]
    onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyle) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction

}

export class ConditionalStyleSummaryComponent extends React.Component<ConditionalStyleSummaryProps, EditableConfigEntityState> {

    constructor(props: ConditionalStyleSummaryProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();

    }
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__conditionalstyle";
        let strategySummaries: any = []

        // title row
        let titleRow = <StrategyHeader
            key={StrategyConstants.ConditionalStyleStrategyName}
            cssClassName={this.props.cssClassName}
            StrategyId={StrategyConstants.ConditionalStyleStrategyId}
            StrategySummary={Helper.ReturnItemCount(this.props.ConditionalStyles.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId && item.ConditionalStyleScope == ConditionalStyleScope.Column), StrategyConstants.ConditionalStyleStrategyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyConstants.ConditionalStyleStrategyName}
            AccessLevel={this.props.AccessLevel}
        />
        strategySummaries.push(titleRow);

        // existing items
        this.props.ConditionalStyles.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId && item.ConditionalStyleScope == ConditionalStyleScope.Column) {
                let detailRow =
                    <StrategyDetail
                        cssClassName={this.props.cssClassName}
                        key={"CS" + index}
                        Item1={<StyleVisualItem Style={item.Style} />}
                        Item2={ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns)}
                        ConfigEnity={item}
                        EntityName={StrategyConstants.ConditionalStyleStrategyName}
                        showShare={this.props.TeamSharingActivated}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={ConditionalStyleRedux.ConditionalStyleDelete(index, item)}
                    />
                strategySummaries.push(detailRow);
            }
        })


        return <div >
            {strategySummaries}

            {this.state.EditedAdaptableBlotterObject &&
                <ConditionalStyleWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IConditionalStyle}
                    ConfigEntities={null}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    ColorPalette={this.props.ColorPalette}
                    StyleClassNames={this.props.StyleClassNames}
                    ColumnCategories={this.props.ColumnCategories}
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
        let configEntity: IConditionalStyle = ObjectFactory.CreateEmptyConditionalStyle()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        configEntity.ConditionalStyleScope = ConditionalStyleScope.Column;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, ConditionalStyle: IConditionalStyle) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(ConditionalStyle), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        this.props.onAddUpdateConditionalStyle(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as IConditionalStyle);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let conditionalStyle = this.state.EditedAdaptableBlotterObject as IConditionalStyle
        return (conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Row || StringExtensions.IsNotNullOrEmpty(conditionalStyle.ColumnId)) &&
            ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) &&
            UIHelper.IsNotEmptyStyle(conditionalStyle.Style)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
        ColorPalette: state.UserInterface.ColorPalette,
        StyleClassNames: state.UserInterface.StyleClassNames,
        ColumnCategories: state.ColumnCategory.ColumnCategories
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyle) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyle)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId))
    };
}

export let ConditionalStyleSummary = connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleSummaryComponent);

