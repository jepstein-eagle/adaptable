import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, Checkbox, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyConstants'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { ShortcutConfigItem } from './ShortcutConfigItem'
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

    Shortcuts: Array<IShortcut>,
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

        let cellInfo: [string, number][] = [["Type", 2], ["Key", 2], ["Action", 3], ["Value", 2], ["", 3]];

        // we now show all shortcuts in one list without the tab (too confusing)
           let shortcuts = this.props.Shortcuts.map((shortcut: IShortcut, index: number) => {
            return <ShortcutConfigItem Shortcut={shortcut} key={"ns" + index}
                AvailableKeys={this.getAvailableKeys(shortcut)}
                onShare={() => this.props.onShare(shortcut)}
                onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
                onChangeKey={(shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey)}
                onChangeOperation={(shortcut, newOperation) => this.props.onChangeOperationShortcut(shortcut, newOperation)}
                onChangeResult={(shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult)}>
            </ShortcutConfigItem>
        });

        let newButton = <ButtonNew onClick={() => this.CreateShortcut()}
            overrideTooltip="Create New Shortcut"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText="Shortcuts"
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={"road"}
            infoBody={infoBody}>

            {this.props.Shortcuts.length == 0 ?
                <Well bsSize="small">Click 'New' to add a new Shortcut.</Well>
                :
                <div>
                    <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
                    <ListGroup style={divStyle}>
                        {shortcuts}
                    </ListGroup>
                </div>
            }

            {this.state.EditedShortcut ?
                <AdaptableWizard Steps={
                    [
                        <ShortcutTypeWizard />,
                        <ShortcutSettingsWizard DateKeysAvailable={this.state.EditedShortcut.ShortcutKey ?
                            keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(this.state.EditedShortcut.ShortcutKey).sort()
                            : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1)}
                            NumericKeysAvailable={this.state.EditedShortcut.ShortcutKey ?
                                keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(this.state.EditedShortcut.ShortcutKey).sort()
                                : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1)} />,
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

    getAvailableKeys(shortcut: IShortcut): string[] {
        return (shortcut.DataType == DataType.Number) ?
            keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        Shortcuts: state.Shortcut.Shortcuts
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
    width: '800px'
}


const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

