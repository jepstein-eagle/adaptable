import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ColumnCategoryRedux from '../../Redux/ActionsReducers/ColumnCategoryRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { IColumnCategory } from "../../Api/Interface/Interfaces";
import { ColumnCategoryEntityRow } from "./ColumnCategoryEntityRow";
import { ColumnCategoryWizard } from "./Wizard/ColumnCategoryWizard";

interface ColumnCategoryPopupProps extends StrategyViewPopupProps<ColumnCategoryPopupComponent> {
    ColumnCategorys: IColumnCategory[];
    onAddColumnCategory: (ColumnCategory: IColumnCategory) => ColumnCategoryRedux.ColumnCategoryAddAction
    onEditColumnCategory: (Index: number, ColumnCategory: IColumnCategory) => ColumnCategoryRedux.ColumnCategoryEditAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction,
}

class ColumnCategoryPopupComponent extends React.Component<ColumnCategoryPopupProps, EditableConfigEntityState> {
    constructor(props: ColumnCategoryPopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__ColumnCategory";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__ColumnCategory";

        let infoBody: any[] = ["Column Categories allow you to link different columns, primarily for use in Conditional Styles.", <br />, <br />,
            "They are also used in Column Chooser to make it easier to find and manage large column sets."]

        let colItems: IColItem[] = [
            { Content: "Categry", Size: 2 },
            { Content: "Columns", Size: 7 },
            { Content: "", Size: 3 },
        ]

        let ColumnCategoryRows = this.props.ColumnCategorys.map((x, index) => {
            return <ColumnCategoryEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={x}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(index, x as IColumnCategory)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={ColumnCategoryRedux.ColumnCategoryDelete(x)}
            >
            </ColumnCategoryEntityRow>
        })

        let newSearchButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create New Advanced Search"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel} />

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} bsStyle="primary" headerText={StrategyConstants.ColumnCategoryStrategyName} infoBody={infoBody}
                button={newSearchButton} glyphicon={StrategyConstants.ColumnCategoryGlyph} className="ab_main_popup" >

                {ColumnCategoryRows.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={ColumnCategoryRows} />
                }

                {ColumnCategoryRows.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating ColumnCategorys.</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <ColumnCategoryWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject}
                        ConfigEntities={this.props.ColumnCategorys}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        ColumnCategorys={this.props.ColumnCategorys}
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
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyColumnCategory(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 })
    }

    onEdit(index: number, ColumnCategory: IColumnCategory) {
        let clonedObject: IColumnCategory = Helper.cloneObject(ColumnCategory);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index })
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let ColumnCategory = this.state.EditedAdaptableBlotterObject as IColumnCategory
        if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
            this.props.onEditColumnCategory(this.state.EditedAdaptableBlotterObjectIndex, ColumnCategory)
        } else {
            this.props.onAddColumnCategory(ColumnCategory)
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0 });
    }

    canFinishWizard() {
        let ColumnCategory = this.state.EditedAdaptableBlotterObject as IColumnCategory
        return StringExtensions.IsNotEmpty(ColumnCategory.ColumnCategoryId) && ArrayExtensions.IsNotEmpty(ColumnCategory.ColumnIds)
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ColumnCategorys: state.ColumnCategory.ColumnCategories,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddColumnCategory: (ColumnCategory: IColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryAdd(ColumnCategory)),
        onEditColumnCategory: (Index: number, ColumnCategory: IColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryEdit(Index, ColumnCategory)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnCategoryStrategyId))
    };
}

export let ColumnCategoryPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnCategoryPopupComponent);

