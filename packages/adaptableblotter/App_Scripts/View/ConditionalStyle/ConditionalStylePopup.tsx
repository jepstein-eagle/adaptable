import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { Well } from 'react-bootstrap';
import { ConditionalStyleScope, AccessLevel } from '../../Utilities/Enums'
import { ConditionalStyleEntityRow } from './ConditionalStyleEntityRow'
import { ConditionalStyleWizard } from './Wizard/ConditionalStyleWizard'
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IAdaptableBlotterObject, IConditionalStyle, IColumnCategory } from "../../Utilities/Interface/IAdaptableBlotterObjects";

interface ConditionalStylePopupProps extends StrategyViewPopupProps<ConditionalStylePopupComponent> {
    ConditionalStyles: IConditionalStyle[]
    StyleClassNames: string[]
    ColumnCategories: IColumnCategory[]
    onAddUpdateConditionalStyle: (index: number, condiditionalStyleCondition: IConditionalStyle) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}


class ConditionalStylePopupComponent extends React.Component<ConditionalStylePopupProps, EditableConfigEntityState> {

    constructor(props: ConditionalStylePopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let _editedConditionalStyle: IConditionalStyle = ObjectFactory.CreateEmptyConditionalStyle();
                _editedConditionalStyle.ColumnId = arrayParams[1]
                _editedConditionalStyle.ConditionalStyleScope = ConditionalStyleScope.Column
                this.setState({ EditedAdaptableBlotterObject: _editedConditionalStyle, WizardStartIndex: 1 });
            }
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__conditionalstyle";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__conditionalstyle";

        let infoBody: any[] = ["Conditional Styles enable columns and rows to be given distinct styles according to user rules.", <br />, <br />,
            "Styles include selection of fore and back colours, and font properties."]

        let colItems: IColItem[] = [
            { Content: "Target", Size: 2 },
            { Content: "Style", Size: 2 },
            { Content: "Query", Size: 6 },
            { Content: "", Size: 2 },
        ]
        let conditionalStyles = this.props.ConditionalStyles.map((conditionalStyle: IConditionalStyle, index) => {
            return <ConditionalStyleEntityRow
                cssClassName={cssClassName}
                AdaptableBlotterObject={conditionalStyle}
                colItems={colItems}
                key={"CS" + index}
                Index={index}
                onShare={() => this.props.onShare(conditionalStyle)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(index, conditionalStyle) => this.onEdit(index, conditionalStyle as IConditionalStyle)}
                onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(index, conditionalStyle)} />
        });

        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.onNew()}
            overrideTooltip="Create Conditional Style"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyConstants.ConditionalStyleStrategyName} button={newButton} bsStyle={StyleConstants.PRIMARY_BSSTYLE} cssClassName={cssClassName} glyphicon={StrategyConstants.ConditionalStyleGlyph} infoBody={infoBody}>

                {this.props.ConditionalStyles.length == 0 &&
                    <Well bsSize="small">Click 'New' to create a new conditional style to be applied at row or column level.</Well>
                }

                {conditionalStyles.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={conditionalStyles} />
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <ConditionalStyleWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IConditionalStyle}
                        ConfigEntities={null}
                        ModalContainer={this.props.ModalContainer}
                        ColorPalette={this.props.ColorPalette}
                        ColumnCategories={this.props.ColumnCategories}
                        StyleClassNames={this.props.StyleClassNames}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
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
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyConditionalStyle(), WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1 });
    }

    onEdit(index: number, condition: IConditionalStyle) {
        let clonedObject: IConditionalStyle = Helper.cloneObject(condition);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let conditionalStyle: IConditionalStyle = this.state.EditedAdaptableBlotterObject as IConditionalStyle;
        this.props.onAddUpdateConditionalStyle(this.state.EditedAdaptableBlotterObjectIndex, conditionalStyle);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    canFinishWizard() {
        let conditionalStyle = this.state.EditedAdaptableBlotterObject as IConditionalStyle
        if (conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column && StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnId)) {
            return false;
        }
        if (conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory && StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnCategoryId)) {
            return false;
        }
        return ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) && UIHelper.IsNotEmptyStyle(conditionalStyle.Style)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
        StyleClassNames: state.UserInterface.StyleClassNames,
        ColumnCategories: state.ColumnCategory.ColumnCategories
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyle) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyle)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId))
    };
}

export let ConditionalStylePopup = connect(mapStateToProps, mapDispatchToProps)(ConditionalStylePopupComponent);


