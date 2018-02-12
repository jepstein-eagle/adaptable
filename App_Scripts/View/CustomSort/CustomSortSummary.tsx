import { ICustomSort } from '../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { CustomSortWizard } from './Wizard/CustomSortWizard'
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import { StrategyProfile } from '../Components/StrategyProfile'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { UIHelper } from '../UIHelper';

export interface CustomSortSummaryProps extends StrategySummaryProps<CustomSortSummaryComponent> {
    CustomSorts: ICustomSort[]
    onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction
    onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction   
}

export class CustomSortSummaryComponent extends React.Component<CustomSortSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState() ;  
     }
    render(): any {
        let customSort: ICustomSort = this.props.CustomSorts.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let noCustomSort: boolean = customSort == null;

        let customSortRow: any;

        if (noCustomSort) {
            // title row
            customSortRow = <StrategyHeader
                key={StrategyNames.CustomSortStrategyName}
                StrategyId={StrategyIds.CustomSortStrategyId}
                StrategySummary={"No Custom Sort Set"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyNames.CustomSortStrategyName}
            />
        } else {
            customSortRow = <StrategyDetail
            key={StrategyNames.CustomSortStrategyName}
            Item1={<StrategyProfile StrategyId={StrategyIds.CustomSortStrategyId}/>}
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

        return <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
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
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
     }

    onFinishWizard() {

        let customSort: ICustomSort = this.state.EditedConfigEntity as ICustomSort;
        if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
            this.props.onEditCustomSort(customSort);
        }
        else {
            this.props.onAddCustomSort(customSort);
        }
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
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
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CustomSortStrategyId))
 
    };
}

export let CustomSortSummary = connect(mapStateToProps, mapDispatchToProps)(CustomSortSummaryComponent);
