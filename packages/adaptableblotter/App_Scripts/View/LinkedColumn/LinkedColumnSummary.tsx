import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Core/Helpers/Helper';
import { LinkedColumnWizard } from './Wizard/LinkedColumnWizard'
import * as LinkedColumnRedux from '../../Redux/ActionsReducers/LinkedColumnRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { IAdaptableBlotterObject } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../Core/Enums";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";
import { ILinkedColumn } from "../../Core/Interface/Interfaces";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";
import { StrategyProfile } from "../Components/StrategyProfile";

export interface LinkedColumnSummaryProps extends StrategySummaryProps<LinkedColumnSummaryComponent> {
    LinkedColumns: ILinkedColumn[]
    // onAddUpdateLinkedColumn: (index: number, LinkedColumn: ILinkedColumn) => LinkedColumnRedux.LinkedColumnAddUpdateConditionAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class LinkedColumnSummaryComponent extends React.Component<LinkedColumnSummaryProps, EditableConfigEntityState> {

    constructor(props: LinkedColumnSummaryProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();

    }
    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__LinkedColumn";
        let linkedColumn: ILinkedColumn = this.props.LinkedColumns.find(lk => ArrayExtensions.ContainsItem(lk.ColumnIds, this.props.SummarisedColumn.ColumnId))
        let noLinkedColumn: boolean = linkedColumn == null;

        let linkedColumnRow: any;
        if (noLinkedColumn) {
            linkedColumnRow = <StrategyHeader
                key={StrategyConstants.LinkedColumnStrategyName}
                cssClassName={this.props.cssClassName}
                StrategyId={StrategyConstants.LinkedColumnStrategyId}
                StrategySummary={ "None"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyConstants.LinkedColumnStrategyName}
                AccessLevel={this.props.AccessLevel}
            />
        } else {
            linkedColumnRow = <StrategyDetail
                key={StrategyConstants.LinkedColumnStrategyName}
                cssClassName={this.props.cssClassName}
                Item1={<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={StrategyConstants.LinkedColumnStrategyId} />}
                Item2={linkedColumn.LinkedColumnId}
                ConfigEnity={linkedColumn}
                showShare={this.props.TeamSharingActivated}
                EntityName={StrategyConstants.LinkedColumnStrategyName}
                onEdit={() => this.onEdit(linkedColumn)}
                onShare={() => this.props.onShare(linkedColumn)}
                onDelete={LinkedColumnRedux.LinkedColumnDelete(linkedColumn)}
                showBold={true}
            />
        }

        return <div >
            {linkedColumnRow}

            {this.state.EditedAdaptableBlotterObject &&
                <LinkedColumnWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as ILinkedColumn}
                    ConfigEntities={null}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    LinkedColumns={this.props.LinkedColumns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
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
        let configEntity: ILinkedColumn = ObjectFactory.CreateEmptyLinkedColumn()
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit( LinkedColumn: ILinkedColumn) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(LinkedColumn), WizardStartIndex: 1});
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        //  this.props.onAddUpdateLinkedColumn(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as ILinkedColumn);
        //  this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        //   let LinkedColumn = this.state.EditedAdaptableBlotterObject as ILinkedColumn
        //   return StringExtensions.IsNotNullOrEmpty(LinkedColumn.ColumnId) &&
        //       StringExtensions.IsNotNullOrEmpty(LinkedColumn.NudgeValue.toString()) && // check its a number??
        //       (LinkedColumn.IsDefaultNudge || ExpressionHelper.IsNotEmptyOrInvalidExpression(LinkedColumn.Expression))
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        LinkedColumns: state.LinkedColumn.LinkedColumns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        //   onAddUpdateLinkedColumn: (index: number, LinkedColumn: ILinkedColumn) => dispatch(LinkedColumnRedux.LinkedColumnAddUpdateCondition(index, LinkedColumn)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LinkedColumnStrategyId))
    };
}

export let LinkedColumnSummary = connect(mapStateToProps, mapDispatchToProps)(LinkedColumnSummaryComponent);

