import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';
import { IColumn } from '../../Core/Interface/IColumn';
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { CellValidationMode } from '../../Core/Enums'
import { CellValidationWizard } from './Wizard/CellValidationWizard'
import { StringExtensions } from '../../Core/Extensions/StringExtensions';
import { IUserFilter, ISystemFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { CellValidationEntityRow } from './CellValidationEntityRow';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import { IAdaptableBlotterObject } from "../../Core/Interface/Interfaces";


interface CellValidationPopupProps extends StrategyViewPopupProps<CellValidationPopupComponent> {
    CellValidations: ICellValidationRule[];
    onAddEditCellValidation: (Index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => CellValidationRedux.CellValidationChangeModeAction
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}


class CellValidationPopupComponent extends React.Component<CellValidationPopupProps, EditableConfigEntityState> {
    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
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

        let infoBody: any[] = ["Cell Validation Rules determine whether an edit is valid.", <br />, <br />,
            "Rules can disallow all edits for a specified column, or only those that fail to meet specified criteria.", <br />, <br />,
            "When a rule is broken, you can choose whether to prevent the edit outright, or allow it after a warning is displayed."]

        let colItems: IColItem[] = [
            { Content: "Column", Size: 2 },
            { Content: "Disallowed Edit", Size: 2 },
            { Content: "Expression", Size: 4 },
            { Content: "If Rule Broken", Size: 2 },
            { Content: "", Size: 2 },
        ]

        let CellValidationItems = this.props.CellValidations.map((x, index) => {
            let column = this.props.Columns.find(c => c.ColumnId == x.ColumnId)
            return <CellValidationEntityRow
                key={index}
                ColItems={colItems}
                AdaptableBlotterObject={x}
                Column={column}
                Columns={this.props.Columns}
                UserFilters={this.props.UserFilters}
                Index={index}
                onEdit={(index, x) => this.onEdit(index, x as ICellValidationRule)}
                onShare={() => this.props.onShare(x)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={CellValidationRedux.CellValidationDelete(index)}
                onChangeCellValidationMode={(index, x) => this.onCellValidationModeChanged(index, x)}
            />


        })
        let newButton = <ButtonNew onClick={() => this.createCellValidation()}
            overrideTooltip="Create Cell Validation Rule"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return <div className="adaptable_blotter_style_popup_cellvalidation">
            <PanelWithButton headerText={StrategyNames.CellValidationStrategyName} bsStyle="primary" className="adaptableblotter_modal_main_popup"
                button={newButton}
                glyphicon={StrategyGlyphs.CellValidationGlyph}
                infoBody={infoBody}>
                {CellValidationItems.length > 0 &&
                    <AdaptableObjectCollection ColItems={colItems} items={CellValidationItems} />
                }

                {CellValidationItems.length == 0 &&
                    <Well bsSize="small">
                        <HelpBlock>Click 'New' to start creating rules for valid cell edits.</HelpBlock>
                        <HelpBlock>Edits that fail validation can be either prevented altogether or allowed (after over-riding a warning and providing a reason).</HelpBlock>
                    </Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <CellValidationWizard
                        EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as ICellValidationRule}
                        ConfigEntities={null}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                    />
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

    onCellValidationModeChanged(index: number, cellValidationMode: CellValidationMode) {
        this.props.onChangeCellValidationMode(index, cellValidationMode);
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        this.props.onAddEditCellValidation(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as ICellValidationRule);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
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
        onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => dispatch(CellValidationRedux.CellValidationChangeMode(index, CellValidationMode)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CellValidationStrategyId))
    };
}

export let CellValidationPopup = connect(mapStateToProps, mapDispatchToProps)(CellValidationPopupComponent);


