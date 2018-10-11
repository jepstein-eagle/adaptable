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
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IAdaptableBlotterObject, IAlertDefinition } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { AlertHelper } from "../../Core/Helpers/AlertHelper";
import { AccessLevel } from "../../Core/Enums";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";

export interface AlertSummaryProps extends StrategySummaryProps<AlertSummaryComponent> {
    Alerts: IAlertDefinition[]
    onAddUpdateAlert: (index: number, Alert: IAlertDefinition) => AlertRedux.AlertDefinitionAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class AlertSummaryComponent extends React.Component<AlertSummaryProps, EditableConfigEntityState> {

    constructor(props: AlertSummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__Alert";
        let strategySummaries: any = []
        
        // title row
        let titleRow = <StrategyHeader
            key={StrategyConstants.AlertStrategyName}
            cssClassName={this.props.cssClassName}
            StrategyId={StrategyConstants.AlertStrategyId}
            StrategySummary={Helper.ReturnItemCount(this.props.Alerts.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyConstants.AlertStrategyName)}
            onNew={() => this.onNew()}
            NewButtonTooltip={StrategyConstants.AlertStrategyName}
            AccessLevel={this.props.AccessLevel}
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
                        Item2={AlertHelper.createAlertDescription( item, this.props.Columns)}
                        ConfigEnity={item}
                        EntityName={StrategyConstants.AlertStrategyName}
                        showShare={this.props.TeamSharingActivated}
                        onEdit={() => this.onEdit(index, item)}
                        onShare={() => this.props.onShare(item)}
                        onDelete={AlertRedux.AlertDefinitionDelete(index)}
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
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
       };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateAlert: (index: number, Alert: IAlertDefinition) => dispatch(AlertRedux.AlertDefinitionAddUpdate(index, Alert)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId))
    };
}

export let AlertSummary = connect(mapStateToProps, mapDispatchToProps)(AlertSummaryComponent);
