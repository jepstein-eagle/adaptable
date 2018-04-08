import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import { LayoutWizard } from './Wizard/LayoutWizard'
import { LayoutEntityRow } from './LayoutEntityRow'
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IUserFilter, ISystemFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { IColumn } from "../../Core/Interface/IColumn";
import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";

interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
    Layoutes: ILayout[];
    CurrentLayoutName: string;
    onAddUpdateLayout: (Layout: ILayout) => LayoutRedux.LayoutAddAction,
    onSelectLayout: (SelectedSearchName: string) => LayoutRedux.LayoutSelectAction,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction,
}

class LayoutPopupComponent extends React.Component<LayoutPopupProps, EditableConfigEntityState> {
    constructor(props: LayoutPopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
        // dont think we will ever let you an edit a layout - only create and then save what is currently in the grid.
        if (this.props.PopupParams == "Edit") {
            let currentLayout = this.props.Layoutes.find(as => as.Name == this.props.CurrentLayoutName)
            if (currentLayout) {
                this.onEdit(currentLayout)
            }
        }
    }

    render() {
        let currentLayout = this.props.Layoutes.find(as => as.Name == this.props.CurrentLayoutName)

        let infoBody: any[] = ["Build multi-column named searches by creating a Query - which will contain a selection of column values, filters and ranges.", <br />, <br />,
            "Created searches are available in the Advanced Search Toolbar dropdown in the Dashboard."]

        let colItems: IColItem[] = [
            { Content: "Current", Size: 1 },
            { Content: "Name", Size: 2 },
            { Content: "Details", Size: 7 },
            { Content: "", Size: 2 },
        ]

        let LayoutRows = this.props.Layoutes.map((x, index) => {
            return <LayoutEntityRow
                key={index}
                ColItems={colItems}
                IsCurrentLayout={x.Name == this.props.CurrentLayoutName}
                AdaptableBlotterObject={x}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(x as ILayout)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={LayoutRedux.LayoutDelete(x.Name)}
                onSelect={() => this.props.onSelectLayout(x.Name)}
            >
            </LayoutEntityRow>
        })

        let newSearchButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <div className="adaptable_blotter_style_popup_Layout">
            <PanelWithButton bsStyle="primary" headerText={StrategyNames.LayoutStrategyName} infoBody={infoBody}
                button={newSearchButton} glyphicon={StrategyGlyphs.LayoutGlyph} className="adaptableblotter_modal_main_popup" >

                {LayoutRows.length > 0 &&
                    <AdaptableObjectCollection ColItems={colItems} items={LayoutRows} />
                }

                {LayoutRows.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating advanced searches.</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <LayoutWizard
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
                        ConfigEntities={this.props.Layoutes}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        GridSort={this.props.GridSort}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()} />
                }

            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateLayout(null, null, ""), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 })
    }

    onEdit(Layout: ILayout) {
        let clonedObject: ILayout = Helper.cloneObject(Layout);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: 0 })
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let clonedObject: ILayout = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        this.props.onAddUpdateLayout(clonedObject);
        if (this.state.EditedAdaptableBlotterObjectIndex == -1) {// its new so make it the selected layout
            this.props.onSelectLayout(clonedObject.Name);
        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Layoutes: state.Layout.Layouts,
        CurrentLayoutName: state.Layout.CurrentLayout,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateLayout: (Layout: ILayout) => dispatch(LayoutRedux.LayoutAdd(Layout)),
        onSelectLayout: (selectedSearchName: string) => dispatch(LayoutRedux.LayoutSelect(selectedSearchName)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.LayoutStrategyId))
    };
}

export let LayoutPopup = connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);

