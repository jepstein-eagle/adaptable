import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Col, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Core/Interface/IColumn';
import { Helper } from '../../Core/Helpers/Helper';
import { PlusMinusWizard } from './Wizard/PlusMinusWizard'
import { IPlusMinusRule } from '../../Strategy/Interface/IPlusMinusStrategy'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { IUserFilter, ISystemFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Core/Extensions/StringExtensions'
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { PlusMinusEntityRow } from './PlusMinusEntityRow'
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";
import { IUIConfirmation } from "../../Core/Interface/IMessage";

interface PlusMinusPopupProps extends StrategyViewPopupProps<PlusMinusPopupComponent> {
    DefaultNudgeValue: number,
    PlusMinusRules: IPlusMinusRule[]
    onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => PlusMinusRedux.PlusMinusEditConditionAction
    onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusRule) => PlusMinusRedux.PlusMinusAddUpdateConditionAction
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => PopupRedux.PopupShowConfirmationAction;
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class PlusMinusPopupComponent extends React.Component<PlusMinusPopupProps, EditableConfigEntityState> {
    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let plusMinus = ObjectFactory.CreateEmptyPlusMinusRule()
                plusMinus.ColumnId = arrayParams[1]
                this.setState({ EditedAdaptableBlotterObject: plusMinus, EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 1 });
            }
        }
    }

    render() {
        let infoBody: any[] = ["Enables the creation of Plus/Minus 'Nudge' Rules (i.e. how much to increment numeric cells when ", <i>'+'</i>, " or ", <i>'-'</i>, " keys are pressed on the keyboard).", <br />, <br />,
            "Plus/Minus 'Nudge' Rules can be set for any numeric column, with option to specify whether a nudge is always applied or only when a particular condition is met."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 3 },
            { Content: "Nudge Value", Size: 2 },
            { Content: "Row Condition", Size: 5 },
            { Content: "", Size: 2 },
        ]
        let PlusMinusRules = this.props.PlusMinusRules.map((x, index) => {
            let column = this.props.Columns.find(y => y.ColumnId == x.ColumnId)

            return <PlusMinusEntityRow
                ColItems={colItems}
                AdaptableBlotterObject={x}
                key={index}
                Index={index}
                UserFilters={this.props.UserFilters}
                Columns={this.props.Columns}
                onEdit={(index, customSort) => this.onEdit(index, x as IPlusMinusRule)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onShare={() => this.props.onShare(x)}
                onDeleteConfirm={PlusMinusRedux.PlusMinusDeleteCondition(index)}
                Column={column}
                onColumnDefaultNudgeValueChange={(index, event) => this.onColumnDefaultNudgeValueChange(index, event)} />
        })

        let newButton = <ButtonNew onClick={() => this.createColumnNudgeValue()}
            overrideTooltip="Create Plus / Minus Rule"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <div className="adaptable_blotter_style_popup_plusminus">
            <PanelWithButton headerText={StrategyNames.PlusMinusStrategyName} bsStyle="primary" className="adaptable_blotter_modal_main_popup"
                button={newButton} glyphicon={StrategyGlyphs.PlusMinusGlyph}
                infoBody={infoBody}>

                {PlusMinusRules.length > 0 &&
                    <AdaptableObjectCollection ColItems={colItems} items={PlusMinusRules} />
                }

                {PlusMinusRules.length == 0 &&
                    <Well bsSize="small">Click 'New' to create new Nudge Value rules for when the '+' or '-' keys are clicked while in a numeric cell.</Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&

                    <PlusMinusWizard
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IPlusMinusRule}
                        ConfigEntities={null}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        WizardStartIndex={this.state.WizardStartIndex}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
    }


    createColumnNudgeValue() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyPlusMinusRule(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }
    onEdit(index: number, condition: IPlusMinusRule) {
        let clonedObject: IPlusMinusRule = Helper.cloneObject(condition);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, EditedAdaptableBlotterObjectIndex: index, WizardStartIndex: 1 });
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let plusMinus = this.state.EditedAdaptableBlotterObject as IPlusMinusRule
        this.onAddColumnDefaultNudgeValue(this.state.EditedAdaptableBlotterObjectIndex, plusMinus);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onColumnDefaultNudgeValueChange(index: number, event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: this.props.PlusMinusRules[index].ColumnId, DefaultNudge: parseFloat(e.value) });
    }

    onAddColumnDefaultNudgeValue(index: number, plusMinus: IPlusMinusRule) {
        // check if its a default nudge value that there is not one already set for that column
        if (plusMinus.IsDefaultNudge) {
            let existingIndex: number = this.props.PlusMinusRules.findIndex(p => p.ColumnId == plusMinus.ColumnId && p.IsDefaultNudge);
            if (existingIndex > -1) {
                if (existingIndex == index) { // editing the existing default nudge so just do an edit
                    this.props.onEditColumnDefaultNudgeValue(index, { ColumnId: plusMinus.ColumnId, DefaultNudge: plusMinus.NudgeValue });
                } else { // its a new one so need warning that will update
                    this.onConfirmWarningCellValidation(existingIndex, plusMinus);
                }
            } else {
                this.props.onAddColumnDefaultNudgeValue(this.state.EditedAdaptableBlotterObjectIndex, plusMinus);
            }
        } else {
            this.props.onAddColumnDefaultNudgeValue(this.state.EditedAdaptableBlotterObjectIndex, plusMinus);
        }
    }

    private onConfirmWarningCellValidation(index: number, plusMinus: IPlusMinusRule) {
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Existing Default Column Nudge Value for: " + plusMinus.ColumnId,
            ConfirmationMsg: "Do you want to override it with new value: ?",
            ConfirmationText: "Bypass Rule",
            CancelAction: null,
            ConfirmAction: PlusMinusRedux.PlusMinusEditCondition(index, { ColumnId: plusMinus.ColumnId, DefaultNudge: plusMinus.NudgeValue }),
            ShowCommentBox: false
        }
        this.props.onConfirmWarningCellValidation(confirmation)
    }


}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        PlusMinusRules: state.PlusMinus.PlusMinusRules,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onEditColumnDefaultNudgeValue: (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }) => dispatch(PlusMinusRedux.PlusMinusEditCondition(Index, ColumnDefaultNudge)),
        onAddColumnDefaultNudgeValue: (Index: number, ColumnsDefaultNudge: IPlusMinusRule) => dispatch(PlusMinusRedux.PlusMinusAddUpdateCondition(Index, ColumnsDefaultNudge)),
        onConfirmWarningCellValidation: (confirmation: IUIConfirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.PlusMinusStrategyId))
    };
}

export let PlusMinusPopup = connect(mapStateToProps, mapDispatchToProps)(PlusMinusPopupComponent);
