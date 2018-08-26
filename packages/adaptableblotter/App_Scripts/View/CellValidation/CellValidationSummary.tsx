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
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IAdaptableBlotterObject, ICellValidationRule } from "../../Core/Api/Interface/AdaptableBlotterObjects";

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

        // title row
        let titleRow = <StrategyHeader
            key={StrategyNames.CellValidationStrategyName}
            cssClassName={this.props.cssClassName}
            StrategyId={StrategyIds.CellValidationStrategyId}
            StrategySummary={Helper.ReturnItemCount(this.props.CellValidations.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyNames.CellValidationStrategyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyNames.CellValidationStrategyName}
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
                        Item2={item.Description}
                        ConfigEnity={item}
                        EntityName={StrategyNames.CellValidationStrategyName}
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
                    BlotterOptions={this.props.BlotterOptions}
                    BlotterApi={this.props.BlotterApi}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
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
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CellValidationStrategyId))
    };
}

export let CellValidationSummary = connect(mapStateToProps, mapDispatchToProps)(CellValidationSummaryComponent);

