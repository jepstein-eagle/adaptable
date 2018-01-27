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
import { IColumn , IConfigEntity} from '../../Core/Interface/IAdaptableBlotter';
import { AdaptablePopover } from '../AdaptablePopover';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { StringExtensions } from '../../Core/Extensions';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { IUIConfirmation } from '../../Core/Interface/IStrategy';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { IRange, ILiveRange } from "../../Core/Interface/IExportStrategy";
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { RangeHelper } from "../../Core/Services/RangeHelper";
import { Helper } from '../../Core/Helper';
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { RangeConfigItem } from './Range/RangeConfigItem'
import { RangeColumnsWizard } from './Range/RangeColumnsWizard'
import { RangeNameWizard } from './Range/RangeNameWizard'
import { RangeExpressionWizard } from './Range/RangeExpressionWizard'
import { ObjectFactory } from '../../Core/ObjectFactory';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import { ConfigEntityRow } from "../Components/ConfigEntityRow";


interface ExportActionProps extends IStrategyViewPopupProps<ExportActionComponent> {
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

interface RangeConfigInternalState {
    EditedRange: IRange
    WizardStartIndex: number
    EditedIndexRange: number
}

class ExportActionComponent extends React.Component<ExportActionProps, RangeConfigInternalState> {

    constructor() {
        super();
        this.state = { EditedRange: null, WizardStartIndex: 0, EditedIndexRange: -1 }
    }

    componentDidMount() {
        if (this.props.PopupParams == "New") {
            this.onNewRange()
        }
        if (this.props.PopupParams == "Edit") {
            let selectedRange: IRange = this.props.Ranges.find(a => a.Name == this.props.CurrentRange);
            let selectedRangeIndex = this.props.Ranges.findIndex(a => a.Name == this.props.CurrentRange);
            this.onEditRange(selectedRangeIndex, selectedRange)
        }
    }

    render() {

        let infoBody: any[] = ["Export works by sending 'ranges' to specified location.", <br />, <br />, "You can use an existing Range or create one of your own..", <br />, <br />]

        let Ranges = this.props.Ranges.map((range: IRange, index) => {
            return <RangeConfigItem Range={range} key={index}
                Columns={this.props.Columns}
                IsLast={index == this.props.Ranges.length - 1}
                UserFilters={this.props.UserFilters}
                LiveRanges={this.props.LiveRanges}
                onShare={() => this.props.onShare(range)}
                onExport={(exportDestination) => this.onApplyExport(range.Name, exportDestination)}
                onRangeStopLive={(exportDestination) => this.props.onRangeStopLive(range.Name, exportDestination)}
                onEdit={() => this.onEditRange(index, range)}
                onDeleteConfirm={RangeRedux.RangeDelete(index)}
                isDropUp = {index>1} />
        });

        let cellInfo: [string, number][] = [["Range", 2], ["Columns", 3], ["Expression", 3], ["", 4]];
        let newButton = <ButtonNew onClick={() => this.onNewRange()}
            overrideTooltip="Create Range"
            DisplayMode="Glyph+Text" 
            size={"small"}/>

        return (
            <PanelWithButton headerText={StrategyNames.ExportStrategyName} bsStyle="primary" glyphicon={StrategyGlyphs.ExportGlyph} infoBody={infoBody} button={newButton} style={panelStyle}>
                {this.props.Ranges.length == 0 ?
                    <Well bsSize="small">Click 'New' to create a new Range.  A range is named group of columns and Unique values..</Well>
                    : <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                }

                <ListGroup style={divStyle}>
                    {Ranges}
                    {<ConfigEntityRow items={[]}/>}
                </ListGroup>
                {this.state.EditedRange &&
                    <AdaptableWizard Steps={[
                        <RangeColumnsWizard Columns={this.props.Columns} />,
                        <RangeExpressionWizard ColumnList={this.props.Columns}
                            UserFilters={this.props.UserFilters}
                            SelectedColumnId={null}
                            getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                        <RangeNameWizard Ranges={this.props.Ranges}/>,
                    ]}
                        Data={this.state.EditedRange}
                        StepStartIndex={this.state.WizardStartIndex}
                        onHide={() => this.closeWizard()}
                        onFinish={() => this.WizardFinish()} >
                    </AdaptableWizard>
                }
            </PanelWithButton>

        );
    }

    private wizardSteps: JSX.Element[]

    closeWizard() {
        this.props.onClearPopupParams()
        this.setState({ EditedRange: null, WizardStartIndex: 0, EditedIndexRange: -1 });
    }
    WizardFinish() {
        this.props.onAddUpdateRange(this.state.EditedIndexRange, this.state.EditedRange)
        this.setState({ EditedRange: null, WizardStartIndex: 0, EditedIndexRange: -1 });
    }

    onNewRange() {
        this.setState({ EditedRange: ObjectFactory.CreateEmptyRange(), WizardStartIndex: 0, EditedIndexRange: -1 })
    }

    onEditRange(index: number, rangeToEdit: IRange) {
        let clonedRangeToEdit = Helper.cloneObject(rangeToEdit)
        this.setState({ EditedRange: clonedRangeToEdit, WizardStartIndex: 0, EditedIndexRange: index })
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

export let ExportAction = connect(mapStateToProps, mapDispatchToProps)(ExportActionComponent);

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
    
}

let panelStyle = {
    width: '800px',
}

