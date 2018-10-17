import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { CellValidationWizard } from './Wizard/CellValidationWizard'
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IAdaptableBlotterObject, ICellValidationRule } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../Core/Enums";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";
import { CellValidationHelper } from "../../Core/Helpers/CellValidationHelper";

export interface CellValidationSummaryProps extends StrategySummaryProps<CellValidationSummaryComponent> {
    CellValidations: ICellValidationRule[]
    onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class CellValidationSummaryComponent extends React.Component<CellValidationSummaryProps, EditableConfigEntityState> {

    constructor(props: CellValidationSummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__cellvalidation";
        let strategySummaries: any = []
        alert("AccessLevel for cv: " + this.props.AccessLevel)


        // title row
        let titleRow = <StrategyHeader
            key={StrategyConstants.CellValidationStrategyName}
            cssClassName={this.props.cssClassName}
            StrategyId={StrategyConstants.CellValidationStrategyId}
            StrategySummary={Helper.ReturnItemCount(this.props.CellValidations.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyConstants.CellValidationStrategyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyConstants.CellValidationStrategyName}
            AccessLevel={this.props.AccessLevel}
        />
        strategySummaries.push(titleRow);

        // existing items
        this.props.CellValidations.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow =
                    <StrategyDetail
                        cssClassName={this.props.cssClassName}
                        key={"CV" + index}
                        Item1={StringExtensions.PlaceSpaceBetweenCapitalisedWords(item.ActionMode)}
                        Item2={CellValidationHelper.createCellValidationDescription(item, this.props.Columns)}
                        ConfigEnity={item}
                        EntityName={StrategyConstants.CellValidationStrategyName}
                        showShare={this.props.TeamSharingActivated}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={CellValidationRedux.CellValidationDelete(index)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div >
            {strategySummaries}

            {this.state.EditedAdaptableBlotterObject &&
                <CellValidationWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as ICellValidationRule}
                    ConfigEntities={null}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    Blotter={this.props.Blotter}
                    WizardStartIndex={this.state.WizardStartIndex}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={() => this.canFinishWizard()} />
            }
        </div>
    }

    onNew() {
        let configEntity: ICellValidationRule = ObjectFactory.CreateEmptyCellValidation()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, CellValidation: ICellValidationRule) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(CellValidation), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        this.props.onAddUpdateCellValidation(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as ICellValidationRule);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let cellValidatinRule = this.state.EditedAdaptableBlotterObject as ICellValidationRule
        return true;
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        CellValidations: state.CellValidation.CellValidations,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellValidationStrategyId))
    };
}

export let CellValidationSummary = connect(mapStateToProps, mapDispatchToProps)(CellValidationSummaryComponent);

