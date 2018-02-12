import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
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
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EntityCollectionView } from '../Components/EntityCollectionView';
import { CellValidationEntityRow } from './CellValidationEntityRow';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';
import { UIHelper } from '../UIHelper';


interface CellValidationPopupProps extends StrategyViewPopupProps<CellValidationPopupComponent> {
    CellValidations: ICellValidationRule[];
    Columns: Array<IColumn>,
    UserFilters: IUserFilter[]
    onAddEditCellValidation: (Index: number, CellValidation: ICellValidationRule) => CellValidationRedux.CellValidationAddUpdateAction
    onChangeCellValidationMode: (index: number, CellValidationMode: CellValidationMode) => CellValidationRedux.CellValidationChangeModeAction
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
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
                this.setState({ EditedConfigEntity: cellValitdation, EditedIndexConfigEntity: -1, WizardStartIndex: 1 });
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
            { Content: "Expression", Size: 3 },
            { Content: "If Rule Broken", Size: 2 },
            { Content: "", Size: 3 },
        ]

        let CellValidationItems = this.props.CellValidations.map((x, index) => {
            let column = this.props.Columns.find(c => c.ColumnId == x.ColumnId)
            return <CellValidationEntityRow
                key={index}
                ColItems={colItems}
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

        return <PanelWithButton headerText={StrategyNames.CellValidationStrategyName} bsStyle="primary" style={widePanelStyle}
            button={newButton}
            glyphicon={StrategyGlyphs.CellValidationGlyph}
            infoBody={infoBody}>
            {CellValidationItems.length > 0 &&
                <EntityCollectionView ColItems={colItems} items={CellValidationItems} />
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
        this.setState({ EditedConfigEntity: Helper.cloneObject(CellValidation), EditedIndexConfigEntity: index, WizardStartIndex: 1 });
    }

    onCellValidationModeChanged(index: number, cellValidationMode: CellValidationMode) {
        this.props.onChangeCellValidationMode(index, cellValidationMode);
    }

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
    }

    onFinishWizard() {
        this.props.onAddEditCellValidation(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as ICellValidationRule);
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1, });
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



let widePanelStyle = {
    width: '800px'
}

