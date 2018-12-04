import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as LayoutRedux from '../../Redux/ActionsReducers/LayoutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { LayoutWizard } from './Wizard/LayoutWizard'
import { LayoutEntityRow } from './LayoutEntityRow'
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { IColumn } from "../../Api/Interface/IColumn";
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { SortOrder, AccessLevel } from "../../Utilities/Enums";
import { ILayout, IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";

interface LayoutPopupProps extends StrategyViewPopupProps<LayoutPopupComponent> {
    Layouts: ILayout[];
    CurrentLayoutName: string;
    onPreSaveLayout: (index: number, layout: ILayout) => LayoutRedux.LayoutPreSaveAction,
    onSelectLayout: (SelectedSearchName: string) => LayoutRedux.LayoutSelectAction,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction,
}

class LayoutPopupComponent extends React.Component<LayoutPopupProps, EditableConfigEntityState> {
    constructor(props: LayoutPopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
        // dont think we will ever let you an edit a layout this way - only create and then save what is currently in the grid.
        //   if (this.props.PopupParams == "Edit") {
        //       let currentLayout = this.props.Layouts.find(as => as.Name == this.props.CurrentLayoutName)
        //       if (currentLayout) {
        ///          this.onEdit(currentLayout)
        //     }
        //  }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__layout";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__layout";
       

        let currentLayout = this.props.Layouts.find(as => as.Name == this.props.CurrentLayoutName)

        let infoBody: any[] = ["Create layouts - groups of column order, visibility and sorts.", <br />, <br />,
            "You can create as many layouts as you wish."]

        let colItems: IColItem[] = [
            { Content: "Current", Size: 1 },
            { Content: "Name", Size: 2 },
            { Content: "Details", Size: 7 },
            { Content: "", Size: 2 },
        ]

        let LayoutRows = this.props.Layouts.filter(l => l.Name != GeneralConstants.DEFAULT_LAYOUT).map((x, index) => {
            return <LayoutEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                IsCurrentLayout={x.Name == this.props.CurrentLayoutName}
                AdaptableBlotterObject={x}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(index, x as ILayout)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={LayoutRedux.LayoutDelete(x.Name)}
                onSelect={() => this.props.onSelectLayout(x.Name)}
            >
            </LayoutEntityRow>
        })

        let newSearchButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text"
            size={"small"} 
            AccessLevel={this.props.AccessLevel}/>

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} bsStyle="primary" headerText={StrategyConstants.LayoutStrategyName} infoBody={infoBody}
                button={newSearchButton} glyphicon={StrategyConstants.LayoutGlyph} className="ab_main_popup" >

                {LayoutRows.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={LayoutRows} />
                }

                {LayoutRows.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating layouts.</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <LayoutWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
                        ConfigEntities={this.props.Layouts}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        GridSorts={this.props.GridSorts}
                        Blotter={this.props.Blotter}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()}
                    />
                }

            </PanelWithButton>
        </div>
    }

    onNew() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateLayout([], [], null, ""), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 })
    }

    onEdit(index: number, layout: ILayout) {
        let clonedObject: ILayout = Helper.cloneObject(layout);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index })
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let clonedObject: ILayout = Helper.cloneObject(this.state.EditedAdaptableBlotterObject);

        let layoutNameChanged: boolean = this.state.EditedAdaptableBlotterObjectIndex == -1;
        if (this.state.EditedAdaptableBlotterObjectIndex > -1) {
            let previousLayout = this.props.Layouts[this.state.EditedAdaptableBlotterObjectIndex + 1];
            layoutNameChanged = previousLayout.Name == this.props.CurrentLayoutName;
        }
        // note: add 1 to index if editing because default layout not included in collection
        let index = (this.state.EditedAdaptableBlotterObjectIndex > -1) ? this.state.EditedAdaptableBlotterObjectIndex + 1 : this.state.EditedAdaptableBlotterObjectIndex
        this.props.onPreSaveLayout(index, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });

        if (layoutNameChanged) { // its new so make it the selected layout or name has changed.
            this.props.onSelectLayout(clonedObject.Name);
        }
    }


    canFinishWizard() {
        let layout = this.state.EditedAdaptableBlotterObject as ILayout
        if (ArrayExtensions.IsNotNullOrEmpty(layout.GridSorts)) {
            let canFinish: boolean = true;
            layout.GridSorts.forEach(gs => {
                if (StringExtensions.IsNullOrEmpty(gs.Column) || gs.SortOrder == SortOrder.Unknown) {
                    canFinish = false;
                }
            })
            if (!canFinish) {
                return false
            }
        }
        return StringExtensions.IsNotNullOrEmpty(layout.Name) &&
            ArrayExtensions.IsNotNullOrEmpty(layout.Columns)

    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Layouts: state.Layout.Layouts,
        CurrentLayoutName: state.Layout.CurrentLayout,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onPreSaveLayout: (index: number, layout: ILayout) => dispatch(LayoutRedux.LayoutPreSave(index, layout)),
        onSelectLayout: (selectedSearchName: string) => dispatch(LayoutRedux.LayoutSelect(selectedSearchName)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LayoutStrategyId))
    };
}

export let LayoutPopup = connect(mapStateToProps, mapDispatchToProps)(LayoutPopupComponent);

