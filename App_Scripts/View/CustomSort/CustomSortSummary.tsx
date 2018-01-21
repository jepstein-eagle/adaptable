import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { StrategySummaryInternalState } from '../../Core/Interface/IStrategySummary'
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helper';
import { CustomSortWizard } from '../CustomSort/CustomSortWizard'
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategySummaryRow } from '../Components/StrategySummaryRow'
import { StrategyDetailRow } from '../Components/StrategyDetailRow'
import { StrategyHeader } from '../Components/StrategyHeader'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { IRawValueDisplayValuePair, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';


export interface CustomSortSummaryProps extends IStrategySummaryProps<CustomSortSummaryComponent> {
    CustomSorts: ICustomSort[]
    onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction
    onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction
    
}

export class CustomSortSummaryComponent extends React.Component<CustomSortSummaryProps, StrategySummaryInternalState> {

    constructor() {
        super();
        this.state = { EditedItem: null, WizardStartIndex: 0, EditedItemIndex: -1 }
    }
    render(): any {
        let customSort: ICustomSort = this.props.CustomSorts.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let noCustomSort: boolean = customSort == null;

        let customSortRow: any;

        if (noCustomSort) {
            // title row
            customSortRow = <StrategySummaryRow
                key={StrategyNames.CustomSortStrategyName}
                StrategyId={StrategyIds.CustomSortStrategyId}
                StrategySummary={"No Custom Sort set"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyNames.CustomSortStrategyName}
            />
        } else {
            customSortRow = <StrategyDetailRow
            key={StrategyNames.CustomSortStrategyName}
                Item1={<StrategyHeader StrategyId={StrategyIds.CustomSortStrategyId}/>}
                Item2={customSort.CustomSortItems.join(', ')}
                ConfigEnity={customSort}
                EntityName={StrategyNames.CustomSortStrategyName}
                onEdit={() => this.onEdit(customSort)}
                onShare={() => this.props.onShare(customSort)}
                showShare={this.props.TeamSharingActivated}
                onDelete={CustomSortRedux.CustomSortDelete(customSort)}
                showBold={true}
                />
        }

        return <div>
            {customSortRow}

            {this.state.EditedItem &&
                <CustomSortWizard
                    EditedCustomSort={this.state.EditedItem as ICustomSort}
                    CustomSorts={this.props.CustomSorts}
                    Columns={this.props.Columns}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.closeWizard()}
                    WizardFinish={() => this.WizardFinish()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: ICustomSort = ObjectFactory.CreateEmptyCustomSort()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedItem: configEntity, WizardStartIndex: 1 });
    }

    onEdit(customSort: ICustomSort) {
        this.setState({ EditedItem: Helper.cloneObject(customSort), WizardStartIndex: 1 });
    }

    closeWizard() {
           this.props.onClearPopupParams()
        this.setState({ EditedItem: null, WizardStartIndex: 0 });
    }

    WizardFinish() {

        let customSort: ICustomSort = this.state.EditedItem as ICustomSort;
        if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
            this.props.onEditCustomSort(customSort);
        }
        else {
            this.props.onAddCustomSort(customSort);
        }
        this.setState({ EditedItem: null, WizardStartIndex: 0 });
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        CustomSorts: state.CustomSort.CustomSorts
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {

        onAddCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.CustomSortAdd(customSort)),
        onEditCustomSort: (customSort: ICustomSort) => dispatch(CustomSortRedux.CustomSortEdit(customSort)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CustomSortStrategyId))
 
    };
}

export let CustomSortSummary = connect(mapStateToProps, mapDispatchToProps)(CustomSortSummaryComponent);
