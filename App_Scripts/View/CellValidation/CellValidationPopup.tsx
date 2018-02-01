import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Button, Form, FormControl, Col, Panel, ListGroup, Row, Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { ICellValidationRule, ICellValidationStrategy } from '../../Strategy/Interface/ICellValidationStrategy';
import { IColumn, IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import * as CellValidationRedux from '../../Redux/ActionsReducers/CellValidationRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import { Helper } from '../../Core/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { CellValidationMode } from '../../Core/Enums'
import { IStrategy } from '../../Strategy/Interface/IStrategy';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { CellValidationWizard } from './Wizard/CellValidationWizard'
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EntityItemList } from '../Components/EntityItemList';
import { CellValidationEntityRow } from './CellValidationEntityRow';
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';

interface CellValidationPopupProps extends IStrategyViewPopupProps<CellValidationPopupComponent> {
    CellValidations: ICellValidationRule[];
    Columns: Array<IColumn>,
    UserFilters: IUserFilter[]
    onAddEditCellValidation: (Index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => CellValidationRedux.CellValidationChangeModeAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}


class CellValidationPopupComponent extends React.Component<CellValidationPopupProps, EditableConfigEntityInternalState> {
    constructor() {
        super();
        this.state = { EditedConfigEntity: null, EditedIndexConfigEntity: -1, WizardStartIndex: 0 }
    }
    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|")
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let cellValitdation = ObjectFactory.CreateEmptyCellValidation()
                cellValitdation.ColumnId = arrayParams[1]
                this.setState({ EditedConfigEntity: cellValitdation, EditedIndexConfigEntity: -1, WizardStartIndex: 1 });
            }
        }
    }
    render() {

        let infoBody: any[] = ["Cell Validation Rules determine whether an edit is valid.", <br />, <br />,
            "Rules can disallow all edits for a specified column, or only those that fail to meet specified criteria.", <br />, <br />,
            "When a rule is broken, you can choose whether to prevent the edit outright, or allow it after a warning is displayed."]

        let entityRowInfo:IEntityRowInfo [] =[
            {Caption: "Column", Width: 2}, 
            {Caption: "Disallowed Edit", Width: 3}, 
            {Caption: "Expression", Width: 2}, 
            {Caption: "If Rule Broken", Width: 2}, 
            {Caption: "", Width: 3}, 
        ]

        let CellValidationItems = this.props.CellValidations.map((x, index) => {
            let column = this.props.Columns.find(c => c.ColumnId == x.ColumnId)
            return <CellValidationEntityRow
                key={index}
                EntityRowInfo={entityRowInfo}
                ConfigEntity={x}
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

        return <PanelWithButton headerText={StrategyNames.CellValidationStrategyName} bsStyle="primary" style={panelStyle}
            button={newButton}
            glyphicon={StrategyGlyphs.CellValidationGlyph}
            infoBody={infoBody}>
            {CellValidationItems.length > 0 &&
                <EntityItemList entityRowInfo={entityRowInfo} items={CellValidationItems} />
            }

            {CellValidationItems.length == 0 &&
                <Well bsSize="small">
                    <HelpBlock>Click 'New' to start creating rules for valid cell edits.</HelpBlock>
                    <HelpBlock>Edits that fail can be prevented altogether or allowed after user sees a warning.</HelpBlock>
                </Well>
            }

            {this.state.EditedConfigEntity != null &&
                <CellValidationWizard
                    EditedCellValidation={this.state.EditedConfigEntity as ICellValidationRule}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }

        </PanelWithButton>
    }

    createCellValidation() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyCellValidation(), EditedIndexConfigEntity: -1, WizardStartIndex: 0 });
    }

    onEdit(index: number, CellValidation: ICellValidationRule) {
        //we clone the condition as we do not want to mutate the redux state here....
        this.setState({ EditedConfigEntity: Helper.cloneObject(CellValidation), EditedIndexConfigEntity: index, WizardStartIndex: 1 });
    }

    onCellValidationModeChanged(index: number, cellValidationMode: CellValidationMode) {
        // need to do something!
        this.props.onChangeCellValidationMode(index, cellValidationMode);
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, EditedIndexConfigEntity: -1, WizardStartIndex: 0 });
    }

    onFinishWizard() {
        this.props.onAddEditCellValidation(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as ICellValidationRule);
        this.setState({ EditedConfigEntity: null, EditedIndexConfigEntity: -1, WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        CellValidations: state.CellValidation.CellValidations
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditCellValidation: (index: number, CellValidation: ICellValidationRule) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => dispatch(CellValidationRedux.CellValidationChangeMode(index, CellValidationMode)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CellValidationStrategyId))
    };
}

export let CellValidationPopup = connect(mapStateToProps, mapDispatchToProps)(CellValidationPopupComponent);



let panelStyle = {
    width: '800px'
}

