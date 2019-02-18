import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { FreeTextColumnWizard } from './Wizard/FreeTextColumnWizard'
import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux'
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import { StrategyProfile } from '../Components/StrategyProfile'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterObject } from "../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject";
import { IFreeTextColumn } from "../../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";


export interface FreeTextColumnSummaryProps extends StrategySummaryProps<FreeTextColumnSummaryComponent> {
    FreeTextColumns: IFreeTextColumn[]
    onAddFreeTextColumn: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnRedux.FreeTextColumnAddAction
    onEditFreeTextColumn: (FreeTextColumn: IFreeTextColumn) => FreeTextColumnRedux.FreeTextColumnEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class FreeTextColumnSummaryComponent extends React.Component<FreeTextColumnSummaryProps, EditableConfigEntityState> {

    constructor(props: FreeTextColumnSummaryProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__FreeTextcolumn";

        let freeTextColumn: IFreeTextColumn = this.props.FreeTextColumns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let noFreeTextColumn: boolean = freeTextColumn == null;

        let FreeTextColumnRow: any;

        if (!noFreeTextColumn) {
            let description: string = (ArrayExtensions.IsNotEmpty(freeTextColumn.FreeTextStoredValues)) ? " Stored values: " + freeTextColumn.FreeTextStoredValues.length : "No stored values"
            let index = this.props.FreeTextColumns.findIndex(ftc => ftc.ColumnId == this.props.SummarisedColumn.ColumnId);
            FreeTextColumnRow = <StrategyDetail
                key={StrategyConstants.FreeTextColumnStrategyName}
                cssClassName={this.props.cssClassName}
                Item1={<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={StrategyConstants.FreeTextColumnStrategyId} />}
                Item2={description}
                ConfigEnity={freeTextColumn}
                showShare={this.props.TeamSharingActivated}
                EntityType={StrategyConstants.FreeTextColumnStrategyName}
                onEdit={() => this.onEdit(index, freeTextColumn)}
                onShare={() => this.props.onShare(freeTextColumn)}
                onDelete={FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn)}
                showBold={true}
            />
        }

        return <div>
            {FreeTextColumnRow}

            {this.state.EditedAdaptableBlotterObject &&
                <FreeTextColumnWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IFreeTextColumn}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    ConfigEntities={this.props.FreeTextColumns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    WizardStartIndex={this.state.WizardStartIndex}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={() => this.canFinishWizard()}
                    Blotter={this.props.Blotter}

                />
            }
        </div>
    }

    onNew() {
        let configEntity: IFreeTextColumn = ObjectFactory.CreateEmptyFreeTextColumn()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, FreeTextColumn: IFreeTextColumn) {
        let clonedObject: IFreeTextColumn = Helper.cloneObject(FreeTextColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let FreeTextColumn: IFreeTextColumn = this.state.EditedAdaptableBlotterObject as IFreeTextColumn
        if (this.props.FreeTextColumns.find(x => x.ColumnId == FreeTextColumn.ColumnId)) {
            this.props.onEditFreeTextColumn(FreeTextColumn)
        } else {
            this.props.onAddFreeTextColumn(FreeTextColumn)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let FreeTextColumn = this.state.EditedAdaptableBlotterObject as IFreeTextColumn
        return StringExtensions.IsNotNullOrEmpty(FreeTextColumn.ColumnId)
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        FreeTextColumns: state.FreeTextColumn.FreeTextColumns,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddFreeTextColumn: (FreeTextColumn: IFreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnAdd(FreeTextColumn)),
        onEditFreeTextColumn: (index: number, FreeTextColumn: IFreeTextColumn) => dispatch(FreeTextColumnRedux.FreeTextColumnEdit(index, FreeTextColumn)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FreeTextColumnStrategyId))
    };
}

export let FreeTextColumnSummary = connect(mapStateToProps, mapDispatchToProps)(FreeTextColumnSummaryComponent);