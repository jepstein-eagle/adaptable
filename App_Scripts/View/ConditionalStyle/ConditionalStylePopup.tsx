import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { Well } from 'react-bootstrap';
import { ConditionalStyleScope } from '../../Core/Enums'
import { ConditionalStyleEntityRow } from './ConditionalStyleEntityRow'
import { ConditionalStyleWizard } from './Wizard/ConditionalStyleWizard'
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { ConditionalStyleGlyph } from '../../Core/Constants/StrategyGlyphs';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IAdaptableBlotterObject, IConditionalStyle } from "../../Core/Api/Interface/AdaptableBlotterObjects";

interface ConditionalStylePopupProps extends StrategyViewPopupProps<ConditionalStylePopupComponent> {
    ConditionalStyles: IConditionalStyle[]
    StyleClassNames: string[]
    onAddUpdateConditionalStyle: (index: number, condiditionalStyleCondition: IConditionalStyle) => ConditionalStyleRedux.ConditionalStyleAddUpdateAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}


class ConditionalStylePopupComponent extends React.Component<ConditionalStylePopupProps, EditableConfigEntityState> {

    constructor(props: ConditionalStylePopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
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
            size={"small"} />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyNames.ConditionalStyleStrategyName} button={newButton} bsStyle="primary" cssClassName={cssClassName} glyphicon={StrategyGlyphs.ConditionalStyleGlyph} infoBody={infoBody}>

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
                        BlotterOptions={this.props.BlotterOptions}
                        BlotterApi={this.props.BlotterApi}
                        ModalContainer={this.props.ModalContainer}
                        ColorPalette={this.props.ColorPalette}
                        StyleClassNames={this.props.StyleClassNames}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
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
        return (conditionalStyle.ConditionalStyleScope== ConditionalStyleScope.Row ||  StringExtensions.IsNotNullOrEmpty(conditionalStyle.ColumnId)) &&
            ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) &&
            UIHelper.IsNotEmptyStyle(conditionalStyle.Style)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
        StyleClassNames: state.UserInterface.StyleClassNames
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateConditionalStyle: (index: number, conditionalStyle: IConditionalStyle) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyle)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ConditionalStyleStrategyId))
    };
}

export let ConditionalStylePopup = connect(mapStateToProps, mapDispatchToProps)(ConditionalStylePopupComponent);


