import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { CellValidationWizard } from './Wizard/CellValidationWizard'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { CellValidationEntityRow } from './CellValidationEntityRow';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from "../../Utilities/Helpers/ExpressionHelper";
import { IAdaptableBlotterObject } from "../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject";
import { ICellValidationRule } from "../../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { CellValidationHelper } from "../../Utilities/Helpers/CellValidationHelper";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";


interface CellValidationPopupProps extends StrategyViewPopupProps<CellValidationPopupComponent> {
    CellValidations: ICellValidationRule[];
    onAddEditCellValidation: (Index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onChangeActionMode: (index: number, ActionMode: any) => CellValidationRedux.CellValidationChangeModeAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}


class CellValidationPopupComponent extends React.Component<CellValidationPopupProps, EditableConfigEntityState> {
    constructor(props: CellValidationPopupProps) {
        super(props);
        this.state = UIHelper.getEmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let cellValitdation = ObjectFactory.CreateEmptyCellValidation()
                cellValitdation.ColumnId = arrayParams[1]
                this.setState({ EditedAdaptableBlotterObject: cellValitdation, EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 1 });
            }
        }
    }
    render() {
        let cssClassName: string = this.props.cssClassName + "__cellValidation";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__cellvalidation";

        let infoBody: any[] = ["Cell Validation Rules determine whether an edit is valid.", <br />, <br />,
            "Rules can disallow all edits for a specified column, or only those that fail to meet specified criteria.", <br />, <br />,
            "When a rule is broken, you can choose whether to prevent the edit outright, or allow it after a warning is displayed."]

        let colItems: IColItem[] = [
            { Content: "Validation Rule", Size: 4 },
            { Content: "Expression", Size: 3 },
            { Content: "Action", Size: 3 },
            { Content: "", Size: 2 },
        ]

        let CellValidationItems = this.props.CellValidations.map((x, index) => {
            let column = ColumnHelper.getColumnFromId(x.ColumnId, this.props.Columns);
            return <CellValidationEntityRow
                key={index}
                cssClassName={cssClassName}
                colItems={colItems}
                AdaptableBlotterObject={x}
                Column={column}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(index, x as ICellValidationRule)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={CellValidationRedux.CellValidationDelete(index)}
                onChangeActionMode={(index, x) => this.onActionModeChanged(index, x)}
            />


        })
        let newButton = <ButtonNew cssClassName={cssClassName} onClick={() => this.createCellValidation()}
            overrideTooltip="Create Cell Validation Rule"
            DisplayMode="Glyph+Text"
            size={"small"}
            AccessLevel={this.props.AccessLevel}
        />

        return <div className={cssClassName}>
            <PanelWithButton headerText={StrategyConstants.CellValidationStrategyName} bsStyle="primary" cssClassName={cssClassName}
                button={newButton}
                glyphicon={StrategyConstants.CellValidationGlyph}
                infoBody={infoBody}>
                {CellValidationItems.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={CellValidationItems} />
                }

                {CellValidationItems.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating rules for valid cell edits.</HelpBlock>
                        <HelpBlock>Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason).</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <CellValidationWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as ICellValidationRule}
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

    createCellValidation() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyCellValidation(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }

    onEdit(index: number, CellValidation: ICellValidationRule) {
        this.setState({ EditedAdaptableBlotterObject: Helper.cloneObject(CellValidation), EditedAdaptableBlotterObjectIndex: index, WizardStartIndex: 1 });
    }

    onActionModeChanged(index: number, ActionMode: any) {
        this.props.onChangeActionMode(index, ActionMode);
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        this.props.onAddEditCellValidation(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as ICellValidationRule);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }


    canFinishWizard() {
        let cellValidationRule = this.state.EditedAdaptableBlotterObject as ICellValidationRule
        return StringExtensions.IsNotNullOrEmpty(cellValidationRule.ColumnId) &&
            (ExpressionHelper.IsEmptyOrValidExpression(cellValidationRule.Expression)) &&
            StringExtensions.IsNotNullOrEmpty(CellValidationHelper.createCellValidationDescription(cellValidationRule, this.props.Columns))
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CellValidations: state.CellValidation.CellValidations
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditCellValidation: (index: number, CellValidation: ICellValidationRule) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onChangeActionMode: (index: number, ActionMode: any) => dispatch(CellValidationRedux.CellValidationChangeMode(index, ActionMode)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CellValidationStrategyId))
    };
}

export let CellValidationPopup = connect(mapStateToProps, mapDispatchToProps)(CellValidationPopupComponent);


