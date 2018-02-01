import { ICustomSort } from '../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { IStrategySummaryProps } from '../../Core/Interface/IStrategySummary'
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { Provider, connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { CustomSortWizard } from './Wizard/CustomSortWizard'
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

export class CustomSortSummaryComponent extends React.Component<CustomSortSummaryProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 }
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
                StrategySummary={"No Custom Sort Set"}
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

            {this.state.EditedConfigEntity &&
                <CustomSortWizard
                    EditedCustomSort={this.state.EditedConfigEntity as ICustomSort}
                    CustomSorts={this.props.CustomSorts}
                    Columns={this.props.Columns}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </div>
    }

    onNew() {
        let configEntity: ICustomSort = ObjectFactory.CreateEmptyCustomSort()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedConfigEntity: configEntity, WizardStartIndex: 1 });
    }

    onEdit(customSort: ICustomSort) {
        this.setState({ EditedConfigEntity: Helper.cloneObject(customSort), WizardStartIndex: 1 });
    }

    onCloseWizard() {
           this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    onFinishWizard() {

        let customSort: ICustomSort = this.state.EditedConfigEntity as ICustomSort;
        if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
            this.props.onEditCustomSort(customSort);
        }
        else {
            this.props.onAddCustomSort(customSort);
        }
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
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
