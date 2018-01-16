import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, Checkbox, Tabs, Tab, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { ShortcutConfigItemNumber } from './ShortcutConfigItemNumber'
import { ShortcutConfigItemDate } from './ShortcutConfigItemDate'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { ShortcutTypeWizard } from './ShortcutTypeWizard'
import { ShortcutSettingsWizard } from './ShortcutSettingsWizard'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';

interface ShortcutConfigProps extends IStrategyViewPopupProps<ShortcutConfigComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => ShortcutRedux.ShortcutChangeKeyAction
    onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => ShortcutRedux.ShortcutChangeOperationAction
    onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => ShortcutRedux.ShortcutChangeResultAction
    NumericShortcuts: Array<IShortcut>,
    DateShortcuts: Array<IShortcut>,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

interface ShortcutConfigInternalState {
    EditedShortcut: IShortcut;
    WizardStartIndex: number
}

class ShortcutConfigComponent extends React.Component<ShortcutConfigProps, ShortcutConfigInternalState> {
    constructor() {
        super();
        this.state = { EditedShortcut: null, WizardStartIndex: 0 }
    }

    render() {
        let infoBody: any[] = ["Use shortcuts to replace frequently entered text with a single keystroke.", <br />, <br />,
            "Numeric shortcuts update the existing cell value based on a calculation'.", <br />, <br />,
            "Date shortcuts replace the contents of the cell with a new date value.", <br />, <br />,
            "Check ", <i>Live</i>, " to turn on a shortcut.", <br />, <br />,
            "Click ", <i><b>New</b></i>, " to create a new shortcut (numeric and date columns only)."]

        let numericCellInfo: [string, number][] = [["Key", 2], ["Operation", 3], ["Value", 3], ["", 3]];
        let dateCellInfo: [string, number][] = [["Key", 2], ["Output", 6], ["", 3]];

        let sortedNumericShortcut = this.props.NumericShortcuts.sort((a, b) => (a.ShortcutKey < b.ShortcutKey) ? -1 : (a.ShortcutKey > b.ShortcutKey) ? 1 : 0)
        let numericShortcuts = sortedNumericShortcut.map((shortcut: IShortcut) => {
            let availableNumericKeys = keys.filter(x => this.props.NumericShortcuts.findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            return <ShortcutConfigItemNumber Shortcut={shortcut} key={"Numeric" + shortcut.ShortcutKey}
                AvailableKeys={availableNumericKeys}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onShare={() => this.props.onShare(shortcut)}
                onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
                onChangeKey={(shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey)}
                onChangeOperation={(shortcut, newOperation) => this.props.onChangeOperationShortcut(shortcut, newOperation)}
                onChangeResult={(shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult)}>
            </ShortcutConfigItemNumber>
        });
        let sortedDateShortcut = this.props.DateShortcuts.sort((a, b) => (a.ShortcutKey < b.ShortcutKey) ? -1 : (a.ShortcutKey > b.ShortcutKey) ? 1 : 0)
        let dateShortcuts = sortedDateShortcut.map((shortcut: IShortcut) => {
            let availableDateKeys = keys.filter(x => this.props.DateShortcuts.findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            return <ShortcutConfigItemDate Shortcut={shortcut} key={"Date" + shortcut.ShortcutKey}
                AvailableKeys={availableDateKeys}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onShare={() => this.props.onShare(shortcut)}
                onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
                onChangeKey={(shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey)}
                onChangeResult={(shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult)}>
            </ShortcutConfigItemDate>
        });

        let newButton = <ButtonNew onClick={() => this.CreateShortcut()}
            overrideTooltip="Create New Shortcut"
            DisplayMode="Glyph+Text" />

        // work out which tab to show
        // for now logic is: show numeric if both exist; if one exists, show that one
        let defaultActiveKey: Number = (this.props.NumericShortcuts.length > 0) ? 1 : 2;

        return <PanelWithButton headerText="Shortcuts"
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={"road"}
            infoBody={infoBody}>

            {this.props.NumericShortcuts.length == 0 && this.props.DateShortcuts.length == 0 ?
                <Well bsSize="small">Click 'New' to add a new Shortcut.</Well>
                :
                <Tabs defaultActiveKey={defaultActiveKey} id="uncontrolled-tab-example" bsStyle="pills">
                    <Tab eventKey={1} title="Numeric Shortcuts">
                        <PanelWithRow CellInfo={numericCellInfo} bsStyle="info" />
                        <ListGroup style={divStyle}>
                            {numericShortcuts}
                        </ListGroup>

                    </Tab>
                    <Tab eventKey={2} title="Date Shortcuts">
                        <PanelWithRow CellInfo={dateCellInfo} bsStyle="info" />
                        <ListGroup style={divStyle}>
                            {dateShortcuts}
                        </ListGroup>
                    </Tab>
                </Tabs>
            }
            {this.state.EditedShortcut ?
                <AdaptableWizard Steps={
                    [
                        <ShortcutTypeWizard />,
                        <ShortcutSettingsWizard DateKeysAvailable={this.state.EditedShortcut.ShortcutKey ?
                            keys.filter(x => this.props.DateShortcuts.findIndex(y => y.ShortcutKey == x) == -1).concat(this.state.EditedShortcut.ShortcutKey).sort()
                            : keys.filter(x => this.props.DateShortcuts.findIndex(y => y.ShortcutKey == x) == -1)}
                            NumericKeysAvailable={this.state.EditedShortcut.ShortcutKey ?
                                keys.filter(x => this.props.NumericShortcuts.findIndex(y => y.ShortcutKey == x) == -1).concat(this.state.EditedShortcut.ShortcutKey).sort()
                                : keys.filter(x => this.props.NumericShortcuts.findIndex(y => y.ShortcutKey == x) == -1)} />,

                    ]}
                    Data={this.state.EditedShortcut}
                    StepStartIndex={this.state.WizardStartIndex}
                    onHide={() => this.closeWizard()}
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard>
                : null

            }
        </PanelWithButton>
    }

    closeWizard() {
        this.setState({ EditedShortcut: null, WizardStartIndex: 0 });
    }
    WizardFinish() {
        if (this.state.EditedShortcut.DataType == DataType.Number) {
            this.props.onAddShortcut(this.state.EditedShortcut)
        }
        else if (this.state.EditedShortcut.DataType == DataType.Date) {
            this.props.onAddShortcut(this.state.EditedShortcut)
        }

        this.setState({ EditedShortcut: null, WizardStartIndex: 0 });
    }

    CreateShortcut() {
        this.setState({ EditedShortcut: ObjectFactory.CreateEmptyShortcut(), WizardStartIndex: 0 });
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        NumericShortcuts: state.Shortcut.NumericShortcuts,
        DateShortcuts: state.Shortcut.DateShortcuts,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.ShortcutAdd(shortcut)),
        onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => dispatch(ShortcutRedux.ShortcutChangeKey(shortcut, NewShortcutKey)),
        onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => dispatch(ShortcutRedux.ShortcutChangeOperation(shortcut, NewShortcutAction)),
        onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => dispatch(ShortcutRedux.ShortcutChangeResult(shortcut, NewShortcutResult)),
        onShare: (entity: IConfigEntity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ShortcutStrategyId))
    };
}

export let ShortcutConfig = connect(mapStateToProps, mapDispatchToProps)(ShortcutConfigComponent);

let panelStyle: React.CSSProperties = {
    'overflowY': 'auto',
    width: '600px'
}


const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

