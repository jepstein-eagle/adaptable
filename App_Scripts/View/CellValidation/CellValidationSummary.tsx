import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';
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
import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';

export interface CellValidationSummaryProps extends StrategySummaryProps<CellValidationSummaryComponent> {
    CellValidations: ICellValidationRule[]
    onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class CellValidationSummaryComponent extends React.Component<CellValidationSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let strategySummaries: any = []

        // title row
        let titleRow = <StrategyHeader
            key={StrategyNames.CellValidationStrategyName}
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
                        key={"CV" + index}
                        Item1={StringExtensions.PlaceSpaceBetweenCapitalisedWords(item.CellValidationMode)}
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

        return <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
            {strategySummaries}

            {this.state.EditedConfigEntity &&
                <CellValidationWizard
                    EditedCellValidation={this.state.EditedConfigEntity as ICellValidationRule}
                    Columns={this.props.Columns}
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
        let configEntity: ICellValidationRule = ObjectFactory.CreateEmptyCellValidation()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedConfigEntity: configEntity, WizardStartIndex: 1, EditedIndexConfigEntity: -1 });
    }

    onEdit(index: number, CellValidation: ICellValidationRule) {
        this.setState({ EditedConfigEntity: Helper.cloneObject(CellValidation), WizardStartIndex: 1, EditedIndexConfigEntity: index });
    }

    onCloseWizard() {
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
    }

    onFinishWizard() {
        this.props.onAddUpdateCellValidation(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as ICellValidationRule);
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        CellValidations: state.CellValidation.CellValidations,
        UserFilters: state.UserFilter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CellValidationStrategyId))
    };
}

export let CellValidationSummary = connect(mapStateToProps, mapDispatchToProps)(CellValidationSummaryComponent);

