import * as React from "react";
import * as Redux from "redux";
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PercentBarWizard } from './Wizard/PercentBarWizard'
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IColumn } from '../../Api/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader'
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail'
import { StrategyProfile } from '../Components/StrategyProfile'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterObject, IPercentBar } from "../../Utilities/Interface/IAdaptableBlotterObjects";


export interface PercentBarSummaryProps extends StrategySummaryProps<PercentBarSummaryComponent> {
    PercentBars: IPercentBar[]
    ColorPalette: string[]
    StyleClassNames: string[]
    onAddPercentBar: (PercentBar: IPercentBar) => PercentBarRedux.PercentBarAddAction
    onEditPercentBar: (index: number, PercentBar: IPercentBar) => PercentBarRedux.PercentBarEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

export class PercentBarSummaryComponent extends React.Component<PercentBarSummaryProps, EditableConfigEntityState> {

    constructor(props: PercentBarSummaryProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    render(): any {
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__percentBar";
      
        let percentBar: IPercentBar = this.props.PercentBars.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let percentBarIndex: number = this.props.PercentBars.findIndex(c => c.ColumnId == this.props.SummarisedColumn.ColumnId)
        let noPercentBar: boolean = percentBar == null;

        let percentBarRow: any;

        if (noPercentBar) {
            percentBarRow = <StrategyHeader
                key={StrategyConstants.PercentBarStrategyName}
                cssClassName={this.props.cssClassName}
                StrategyId={StrategyConstants.PercentBarStrategyId}
                StrategySummary={"No Percnt Bar"}
                onNew={() => this.onNew()}
                NewButtonTooltip={StrategyConstants.PercentBarStrategyName}
                AccessLevel={this.props.AccessLevel}
            />
        } else {
            percentBarRow = <StrategyDetail
                key={StrategyConstants.PercentBarStrategyName}
                cssClassName={this.props.cssClassName}
                Item1={<StrategyProfile cssClassName={this.props.cssClassName} StrategyId={StrategyConstants.PercentBarStrategyId} />}
                Item2={"Percent Bar set"}
                ConfigEnity={percentBar}
                showShare={this.props.TeamSharingActivated}
                EntityName={StrategyConstants.PercentBarStrategyName}
                onEdit={() => this.onEdit(percentBarIndex, percentBar)}
                onShare={() => this.props.onShare(percentBar)}
                onDelete={PercentBarRedux.PercentBarDelete(percentBarIndex)}
                showBold={true}
            />
        }

        return <div>
            {percentBarRow}

            {this.state.EditedAdaptableBlotterObject &&
                <PercentBarWizard
                    cssClassName={cssWizardClassName}
                    EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IPercentBar}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    ConfigEntities={this.props.PercentBars}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    ColorPalette={this.props.ColorPalette}
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
        let configEntity: IPercentBar = ObjectFactory.CreateEmptyPercentBar()
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, renderedColumn: IPercentBar) {
        let clonedObject: IPercentBar = Helper.cloneObject(renderedColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let percentBar: IPercentBar = this.state.EditedAdaptableBlotterObject as IPercentBar
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditPercentBar(this.state.EditedAdaptableBlotterObjectIndex, percentBar)
        }
        else {
            this.props.onAddPercentBar(percentBar)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let percentBar = this.state.EditedAdaptableBlotterObject as IPercentBar
        return StringExtensions.IsNotNullOrEmpty(percentBar.ColumnId)
    }

}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        PercentBars: state.PercentBar.PercentBars,
        ColorPalette: state.UserInterface.ColorPalette,
        Entitlements: state.Entitlements.FunctionEntitlements,
        StyleClassNames: state.UserInterface.StyleClassNames
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddPercentBar: (PercentBar: IPercentBar) => dispatch(PercentBarRedux.PercentBarAdd(PercentBar)),
        onEditPercentBar: (index: number, PercentBar: IPercentBar) => dispatch(PercentBarRedux.PercentBarEdit(index, PercentBar)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId))
    };
}

export let PercentBarSummary = connect(mapStateToProps, mapDispatchToProps)(PercentBarSummaryComponent);