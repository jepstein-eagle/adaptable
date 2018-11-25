import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as LinkedColumnRedux from '../../Redux/ActionsReducers/LinkedColumnRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
//import { LinkedColumnWizard } from './Wizard/LinkedColumnWizard'
//import { LinkedColumnEntityRow } from './LinkedColumnEntityRow'
import { Helper } from '../../Core/Helpers/Helper';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { IColumn } from "../../Core/Interface/IColumn";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import { SortOrder, AccessLevel } from "../../Core/Enums";
import { IAdaptableBlotterObject } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";
import { EntitlementHelper } from "../../Core/Helpers/EntitlementHelper";
import { ILinkedColumn } from "../../Core/Interface/Interfaces";
import { LinkedColumnEntityRow } from "./LinkedColumnEntityRow";
import { LinkedColumnWizard } from "./Wizard/LinkedColumnWizard";

interface LinkedColumnPopupProps extends StrategyViewPopupProps<LinkedColumnPopupComponent> {
    LinkedColumns: ILinkedColumn[];
    onAddLinkedColumn: (LinkedColumn: ILinkedColumn) => LinkedColumnRedux.LinkedColumnAddAction
    onEditLinkedColumn: (Index: number, LinkedColumn: ILinkedColumn) => LinkedColumnRedux.LinkedColumnEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction,
}

class LinkedColumnPopupComponent extends React.Component<LinkedColumnPopupProps, EditableConfigEntityState> {
    constructor(props: LinkedColumnPopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__LinkedColumn";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__LinkedColumn";



        let infoBody: any[] = ["Linked Columns allow you to group different columns, primarily for use in Conditional Styles.", <br />, <br />,
            "They are also used in Column Chooser to make it easier to find and manage large column sets."]

        let colItems: IColItem[] = [
            { Content: "Link Name", Size: 2 },
            { Content: "Columns", Size: 7 },
            { Content: "", Size: 3 },
        ]

        let LinkedColumnRows = this.props.LinkedColumns.map((x, index) => {
            return <LinkedColumnEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={x}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(index, x as ILinkedColumn)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={LinkedColumnRedux.LinkedColumnDelete(x)}
            >
            </LinkedColumnEntityRow>
        })

        let newSearchButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel} />

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} bsStyle="primary" headerText={StrategyConstants.LinkedColumnStrategyName} infoBody={infoBody}
                button={newSearchButton} glyphicon={StrategyConstants.LinkedColumnGlyph} className="ab_main_popup" >

                {LinkedColumnRows.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={LinkedColumnRows} />
                }

                {LinkedColumnRows.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating LinkedColumns.</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <LinkedColumnWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
                        ConfigEntities={this.props.LinkedColumns}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        LinkedColumns={this.props.LinkedColumns}
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
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyLinkedColumn(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 })
    }

    onEdit(index: number, LinkedColumn: ILinkedColumn) {
        let clonedObject: ILinkedColumn = Helper.cloneObject(LinkedColumn);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index })
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let LinkedColumn = this.state.EditedAdaptableBlotterObject as ILinkedColumn
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditLinkedColumn(this.state.EditedAdaptableBlotterObjectIndex, LinkedColumn)
        } else {
            this.props.onAddLinkedColumn(LinkedColumn)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }

    canFinishWizard() {
        let linkedColumn = this.state.EditedAdaptableBlotterObject as ILinkedColumn
        return StringExtensions.IsNotEmpty(linkedColumn.LinkedColumnId) && ArrayExtensions.IsNotEmpty(linkedColumn.ColumnIds)
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        LinkedColumns: state.LinkedColumn.LinkedColumns,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddLinkedColumn: (LinkedColumn: ILinkedColumn) => dispatch(LinkedColumnRedux.LinkedColumnAdd(LinkedColumn)),
        onEditLinkedColumn: (Index: number, LinkedColumn: ILinkedColumn) => dispatch(LinkedColumnRedux.LinkedColumnEdit(Index, LinkedColumn)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.LinkedColumnStrategyId))
    };
}

export let LinkedColumnPopup = connect(mapStateToProps, mapDispatchToProps)(LinkedColumnPopupComponent);

