import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import { Col, Row } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { CellValidationWizard } from '../CellValidation/CellValidationWizard'
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import { StringExtensions } from '../../Core/Extensions'
import { DistinctCriteriaPairValue, CellValidationMode } from '../../Core/Enums'
import { IRawValueDisplayValuePair, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IUserFilter } from '../../Core/Interface/IExpression'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'

export interface CellValidationSummaryProps extends IStrategySummaryProps<CellValidationSummaryComponent> {
    CellValidations: ICellValidationRule[]
    onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

export class CellValidationSummaryComponent extends React.Component<CellValidationSummaryProps, StrategySummaryInternalState> {

    constructor() {
        super();
        this.state = { EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 }
    }
    
    render(): any {
        let strategySummaries: any = []

        // title row
        let titleRow = <StrategySummaryRow
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
                    <StrategyDetailRow
                        key={"CV" + index}
                        Item1={StringExtensions.PlaceSpaceBetweenCapitalisedWords(item.CellValidationMode)}
                        Item2={item.Description}
                        ConfigEnity={item}
                        EntityName={StrategyNames.CellValidationStrategyName}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={CellValidationRedux.CellValidationDelete(index)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div>
            {strategySummaries}

            {this.state.EditedItem &&
                <CellValidationWizard
                    EditedCellValidation={this.state.EditedItem as ICellValidationRule}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.closeWizard()}
                    WizardFinish={() => this.WizardFinish()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: ICellValidationRule = ObjectFactory.CreateEmptyCellValidation()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedItem: configEntity, WizardStartIndex: 1, EditedItemIndex: -1 });
    }

    onEdit(index: number, CellValidation: ICellValidationRule) {
        this.setState({ EditedItem: Helper.cloneObject(CellValidation), WizardStartIndex: 1, EditedItemIndex: index });
    }

    closeWizard() {
        //   this.props.onClearPopupParams()
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }

    WizardFinish() {
       this.props.onAddUpdateCellValidation(this.state.EditedItemIndex, this.state.EditedItem as ICellValidationRule );
        this.setState({ EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 });
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        CellValidations: state.CellValidation.CellValidations,
        UserFilters: state.Filter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateCellValidation: (index: number, CellValidation: ICellValidationRule) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CellValidationStrategyId))
    };
}

export let CellValidationSummary = connect(mapStateToProps, mapDispatchToProps)(CellValidationSummaryComponent);

