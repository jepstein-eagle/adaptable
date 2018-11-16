import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
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


interface CellRendererPopupProps extends StrategyViewPopupProps<CellRendererPopupComponent> {
    PercentCellRenderers: IPercentCellRenderer[];
    onAddEditCellRenderer: (Index: number, CellRenderer: IPercentCellRenderer) => CellRendererRedux.CellRendererAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}


class CellRendererPopupComponent extends React.Component<CellRendererPopupProps, EditableConfigEntityState> {
    constructor(props: CellRendererPopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__cellRenderer";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__cellvalidation";

        let infoBody: any[] = ["To Do."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 4 },
            { Content: "", Size: 2 },
        ]

        let CellRendererItems = this.props.PercentCellRenderers.map((x, index) => {
            let column = this.props.Columns.find(c => c.ColumnId == x.ColumnId)
            return <CellRendererEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={x}
                Column={column}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(index, x as IPercentCellRenderer)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={CellRendererRedux.CellRendererDelete(index)}
            />


        })
        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.createCellRenderer()}
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

    createCellRenderer() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyCellRenderer(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }

    onEdit(index: number, CellRenderer: IPercentCellRenderer) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(CellRenderer), EditedAdaptableBlotterObjectIndex: index, WizardStartIndex: 1 });
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
        onAddEditCellRenderer: (index: number, CellRenderer: IPercentCellRenderer) => dispatch(CellRendererRedux.CellRendererAddUpdate(index, CellRenderer)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellRendererStrategyId))
    };
}

export let CellRendererPopup = connect(mapStateToProps, mapDispatchToProps)(CellRendererPopupComponent);


