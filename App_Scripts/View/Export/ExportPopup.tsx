import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead'
import { FormControl, Panel, Form, FormGroup, ListGroup, MenuItem, Button, ControlLabel, Checkbox, Row, Col, Well, HelpBlock, OverlayTrigger, Tooltip, DropdownButton } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux'
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux'
import * as RangeRedux from '../../Redux/ActionsReducers/RangeRedux'
import { ExportDestination, PopoverType, SortOrder } from '../../Core/Enums'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { IColumn, IConfigEntity, IEntityRowInfo } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper'
import { StringExtensions } from '../../Core/Extensions';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { IUIConfirmation } from '../../Strategy/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IRange, ILiveRange } from "../../Strategy/Interface/IExportStrategy";
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { RangeHelper } from "../../Core/Helpers/RangeHelper";
import { Helper } from '../../Core/Helpers/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { RangeEntityRow } from './RangeEntityRow'
import { RangeWizard } from './Wizard/RangeWizard'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import { ConfigEntityRowItem } from "../Components/ConfigEntityRowItem";
import { EntityItemList } from '../Components/EntityItemList';
import { encode } from "punycode";
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';

interface ExportPopupProps extends IStrategyViewPopupProps<ExportPopupComponent> {
    Ranges: IRange[],
    LiveRanges: ILiveRange[];
    CurrentRange: string,
    onApplyExport: (value: string, exportDestination: ExportDestination) => ExportRedux.ExportApplyAction;
    onAddUpdateRange: (index: number, Range: IRange) => RangeRedux.RangeAddUpdateAction;
    onRangeStopLive: (range: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => RangeRedux.RangeStopLiveAction;
    UserFilters: IUserFilter[]
    Columns: Array<IColumn>
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}


class ExportPopupComponent extends React.Component<ExportPopupProps, EditableConfigEntityInternalState> {

    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 }
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNew()
        }
        if (this.props.PopupParams == "Edit") {
            let selectedRange: IRange = this.props.Ranges.find(a => a.Name == this.props.CurrentRange);
            let selectedRangeIndex = this.props.Ranges.findIndex(a => a.Name == this.props.CurrentRange);
            this.onEdit(selectedRangeIndex, selectedRange)
        }
    }

    render() {

        let infoBody: any[] = ["Export works by sending 'ranges' to specified location.", <br />, <br />, "You can use an existing Range or create one of your own..", <br />, <br />]

        let entityRowInfo: IEntityRowInfo[] = [
            { Caption: "Range", Width: 2 },
            { Caption: "Columns", Width: 3 },
            { Caption: "Expression", Width: 3 },
            { Caption: "", Width: 4 },
        ]

        let ranges = this.props.Ranges.map((range: IRange, index) => {
            return <RangeEntityRow
                ConfigEntity={range}
                key={index}
                EntityRowInfo={entityRowInfo}
                Index={index}
                Columns={this.props.Columns}
                IsLast={index == this.props.Ranges.length - 1}
                UserFilters={this.props.UserFilters}
                LiveRanges={this.props.LiveRanges}
                onShare={() => this.props.onShare(range)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onExport={(exportDestination) => this.onApplyExport(range.Name, exportDestination)}
                onRangeStopLive={(exportDestination) => this.props.onRangeStopLive(range.Name, exportDestination)}
                onEdit={(index, range) => this.onEdit(index, range as IRange)}
                onDeleteConfirm={RangeRedux.RangeDelete(index)}
                isDropUp={index > 1} />
        });

        let newButton = <ButtonNew onClick={() => this.onNew()}
            overrideTooltip="Create Range"
            DisplayMode="Glyph+Text"
            size={"small"} />

        return (
            <PanelWithButton headerText={StrategyNames.ExportStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.ExportGlyph} infoBody={infoBody} button={newButton} style={panelStyle}>

                {ranges.length > 0 &&
                    <EntityItemList entityRowInfo={entityRowInfo} items={ranges} />
                }

                {ranges.length == 0 &&
                    <Well bsSize="small">Click 'New' to create a new Range.  A range is named group of columns and Unique values..</Well>
                }

                {this.state.EditedConfigEntity &&
                    <RangeWizard
                        EditedConfigEntity={this.state.EditedConfigEntity as IRange}
                        ConfigEntities={this.props.Ranges}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()} />
                }
            </PanelWithButton>

        );
    }

    private wizardSteps: JSX.Element[]

    onCloseWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }
    onFinishWizard() {
        this.props.onAddUpdateRange(this.state.EditedIndexConfigEntity, this.state.EditedConfigEntity as IRange)
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0, EditedIndexConfigEntity: -1 });
    }

    onNew() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyRange(), WizardStartIndex: 0, EditedIndexConfigEntity: -1 })
    }

    onEdit(index: number, rangeToEdit: IRange) {
        let clonedRangeToEdit = Helper.cloneObject(rangeToEdit)
        this.setState({ EditedConfigEntity: clonedRangeToEdit, WizardStartIndex: 0, EditedIndexConfigEntity: index })
    }

    onApplyExport(range: string, exportDestination: ExportDestination) {
        this.props.onApplyExport(range, exportDestination);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Ranges: state.Range.Ranges,
        CurrentRange: state.Range.CurrentRange,
        LiveRanges: state.Range.CurrentLiveRanges,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onApplyExport: (value: string, exportDestination: ExportDestination) => dispatch(ExportRedux.ApplyExport(value, exportDestination)),
        onAddUpdateRange: (Index: number, Range: IRange) => dispatch(RangeRedux.RangeAddUpdate(Index, Range)),
        onRangeStopLive: (range: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull) => dispatch(RangeRedux.RangeStopLive(range, exportDestination)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ExportStrategyId))
    };
}

export let ExportPopup = connect(mapStateToProps, mapDispatchToProps)(ExportPopupComponent);


let panelStyle = {
    width: '800px',
}

