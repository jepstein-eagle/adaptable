import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { AlertWizard } from './Wizard/AlertWizard'
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux'
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
import { IAdaptableBlotterObject, IAlertDefinition } from "../../Core/Api/Interface/AdaptableBlotterObjects";

export interface AlertSummaryProps extends StrategySummaryProps<AlertSummaryComponent> {
    Alerts: IAlertDefinition[]
    onAddUpdateAlert: (index: number, Alert: IAlertDefinition) => AlertRedux.AlertAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class AlertSummaryComponent extends React.Component<AlertSummaryProps, EditableConfigEntityState> {

    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__Alert";
        let strategySummaries: any = []

        // title row
        let titleRow = <StrategyHeader
            key={StrategyNames.AlertStrategyName}
            cssClassName={this.props.cssClassName}
            StrategyId={StrategyIds.AlertStrategyId}
            StrategySummary={Helper.ReturnItemCount(this.props.Alerts.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyNames.AlertStrategyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyNames.AlertStrategyName}
        />
        strategySummaries.push(titleRow);

        // existing items
        this.props.Alerts.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow =
                    <StrategyDetail
                        cssClassName={this.props.cssClassName}
                        key={"CV" + index}
                        Item1={"something here?"}
                        Item2={item.Description}
                        ConfigEnity={item}
                        EntityName={StrategyNames.AlertStrategyName}
                        showShare={this.props.TeamSharingActivated}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={AlertRedux.AlertDelete(index)}
                    />
                strategySummaries.push(detailRow);
            }
        })

        return <div >
            {strategySummaries}

            {this.state.EditedAdaptableBlotterObject &&
                <AlertWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IAlertDefinition}
                    ConfigEntities={null}
                    BlotterOptions={this.props.BlotterOptions}
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
        let configEntity: IAlertDefinition = ObjectFactory.CreateEmptyAlertDefinition()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, Alert: IAlertDefinition) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(Alert), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        this.props.onAddUpdateAlert(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as IAlertDefinition);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
      //  let alertDefinition = this.state.EditedAdaptableBlotterObject as IAlertDefinition
        return true;
    }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        Alerts: state.Alert.AlertDefinitions,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateAlert: (index: number, Alert: IAlertDefinition) => dispatch(AlertRedux.AlertAddUpdate(index, Alert)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.AlertStrategyId))
    };
}

export let AlertSummary = connect(mapStateToProps, mapDispatchToProps)(AlertSummaryComponent);
