import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import * as CellRendererRedux from '../../Redux/ActionsReducers/CellRendererRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { CellRendererWizard } from './Wizard/CellRendererWizard'
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { CellRendererEntityRow } from './CellRendererEntityRow';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { IPercentCellRenderer, IAdaptableBlotterObject } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";

interface CellRendererPopupProps extends StrategyViewPopupProps<CellRendererPopupComponent> {
    PercentCellRenderers: IPercentCellRenderer[];
    onAddEditCellRenderer: (Index: number, percentCellRenderer: IPercentCellRenderer) => CellRendererRedux.CellRendererAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
    onPositiveColorChanged: (percentCellRenderer: IPercentCellRenderer, PositiveColor: string) => CellRendererRedux.CellRendererChangePositiveColorAction
    onNegativeColorChanged: (percentCellRenderer: IPercentCellRenderer, NegativeColor: string) => CellRendererRedux.CellRendererChangeNegativeColorAction

}

class CellRendererPopupComponent extends React.Component<CellRendererPopupProps, EditableConfigEntityState> {
    constructor(props: CellRendererPopupProps) {
        super(props);
        this.state = { EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 }
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let newPercentRender: IPercentCellRenderer = ObjectFactory.CreateEmptyPercentCellRenderer()
                newPercentRender.ColumnId = arrayParams[1]
                this.onEdit(-1, newPercentRender)
            }
            if (arrayParams.length == 2 && arrayParams[0] == "Edit") {
                let editPercentRender = this.props.PercentCellRenderers.find(x => x.ColumnId == arrayParams[1])
                let index = this.props.PercentCellRenderers.findIndex(x => x.ColumnId == editPercentRender.ColumnId)
                this.onEdit(index, editPercentRender)
            }
        }
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__cellRenderer";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__cellvalidation";

        let infoBody: any[] = ["To Do."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 3 },
            { Content: "Min", Size: 1 },
            { Content: "Max", Size: 1 },
            { Content: "Positive", Size: 2 },
            { Content: "Negative", Size: 2 },
            { Content: "", Size: 2 },
        ]

        let CellRendererItems = this.props.PercentCellRenderers.map((percentCellRenderer:IPercentCellRenderer, index) => {
            let column = ColumnHelper.getColumnFromId(percentCellRenderer.ColumnId, this.props.Columns);
            return <CellRendererEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={percentCellRenderer}
                Column={column}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                ColorPalette={this.props.ColorPalette}
                Index={index}
                onEdit={(index, object) => this.onEdit(index, percentCellRenderer)}
                onShare={() => this.props.onShare(percentCellRenderer)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={CellRendererRedux.CellRendererDelete(index)}
                onPositiveColorChanged={(percentCellRenderer, positiveColor) => this.props.onPositiveColorChanged(percentCellRenderer, positiveColor)}
                onNegativeColorChanged={(percentCellRenderer, negativeColor) => this.props.onNegativeColorChanged(percentCellRenderer, negativeColor)} 
            />

        })
        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create Cell Renderer "
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyConstants.CellRendererStrategyName} bsStyle="primary" cssClassName={cssClassName}
                button={newButton}
                glyphicon={StrategyConstants.CellRendererGlyph}
                infoBody={infoBody}>
                {CellRendererItems.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={CellRendererItems} />
                }

                {CellRendererItems.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating s for valid cell edits.</HelpBlock>
                        <HelpBlock>Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason).</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <CellRendererWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IPercentCellRenderer}
                        ConfigEntities={null}
                        Blotter={this.props.Blotter}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        ColorPalette={this.props.ColorPalette}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()} />
                }

            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyPercentCellRenderer(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }

    onEdit(index: number, renderedColumn: IPercentCellRenderer) {
         let clonedObject: IPercentCellRenderer = Helper.cloneObject(renderedColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1 , EditedAdaptableBlotterObjectIndex: index});
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        this.props.onAddEditCellRenderer(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as IPercentCellRenderer);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let cellRenderer = this.state.EditedAdaptableBlotterObject as IPercentCellRenderer
        return StringExtensions.IsNotNullOrEmpty(cellRenderer.ColumnId)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        PercentCellRenderers: state.CellRenderer.PercentCellRenderers
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditCellRenderer: (index: number, percentCellRenderer: IPercentCellRenderer) => dispatch(CellRendererRedux.CellRendererAddUpdate(index, percentCellRenderer)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellRendererStrategyId)),
        onPositiveColorChanged: (percentCellRenderer: IPercentCellRenderer, positiveColor: string) => dispatch(CellRendererRedux.CellRendererChangePositiveColor(percentCellRenderer, positiveColor)),
        onNegativeColorChanged: (percentCellRenderer: IPercentCellRenderer, negativeColor: string) => dispatch(CellRendererRedux.CellRendererChangeNegativeColor(percentCellRenderer, negativeColor))
  };
}

export let CellRendererPopup = connect(mapStateToProps, mapDispatchToProps)(CellRendererPopupComponent);