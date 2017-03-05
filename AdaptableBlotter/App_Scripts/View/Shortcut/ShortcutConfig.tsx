import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, Checkbox } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ColumnType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { ShortcutConfigItem } from './ShortcutConfigItem'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { ShortcutSettingsWizard } from './ShortcutSettingsWizard'
import { PanelWithRow } from '../PanelWithRow';
import { PanelWithButton } from '../PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';

interface ShortcutConfigProps extends IStrategyViewPopupProps<ShortcutConfigComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => ShortcutRedux.ShortcutChangeKeyAction
    onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => ShortcutRedux.ShortcutChangeOperationAction
    onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => ShortcutRedux.ShortcutChangeResultAction
    onSelectShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutSelectAction
    NumericShortcuts: Array<IShortcut>,
    DateShortcuts: Array<IShortcut>,
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

        let cellInfo: [string, number][] = [["Live", 1], ["Key", 1], ["Columns", 2], ["Action", 2], ["Result", 2], ["", 4]];

        let sortedNumericShortcut = this.props.NumericShortcuts.sort((a, b) => (a.ShortcutKey < b.ShortcutKey) ? -1 : (a.ShortcutKey > b.ShortcutKey) ? 1 : 0)
        let numericShortcuts = sortedNumericShortcut.map((shortcut: IShortcut) => {
            let availableNumericKeys = keys.filter(x => this.props.NumericShortcuts.findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            return <ShortcutConfigItem Shortcut={shortcut} key={"Numeric" + shortcut.ShortcutKey}
                AvailableKeys={availableNumericKeys}
                onSelect={(shortcut) => this.props.onSelectShortcut(shortcut)}
                onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
                onChangeKey={(shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey)}
                onChangeOperation={(shortcut, newOperation) => this.props.onChangeOperationShortcut(shortcut, newOperation)}
                onChangeResult={(shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult)}>
            </ShortcutConfigItem>
        });
        let sortedDateShortcut = this.props.DateShortcuts.sort((a, b) => (a.ShortcutKey < b.ShortcutKey) ? -1 : (a.ShortcutKey > b.ShortcutKey) ? 1 : 0)
        let dateShortcuts = sortedDateShortcut.map((shortcut: IShortcut) => {
            let availableDateKeys = keys.filter(x => this.props.DateShortcuts.findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            return <ShortcutConfigItem Shortcut={shortcut} key={"Date" + shortcut.ShortcutKey}
                AvailableKeys={availableDateKeys}
                onSelect={(shortcut) => this.props.onSelectShortcut(shortcut)}
                onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
                onChangeKey={(shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey)}
                onChangeOperation={(shortcut, newOperation) => this.props.onChangeOperationShortcut(shortcut, newOperation)}
                onChangeResult={(shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult)}>
            </ShortcutConfigItem>
        });

        return <PanelWithButton headerText="Shortcuts"
            buttonClick={() => this.CreateShortcut()}
            buttonContent={"New"} bsStyle="primary"  style={panelStyle} glyphicon={"road"}>


            <PanelWithRow CellInfo={cellInfo} bsStyle="info" />
            <ListGroup style={divStyle}>
                {numericShortcuts}
                {dateShortcuts}
            </ListGroup>

            {this.state.EditedShortcut ?
                <AdaptableWizard Steps={
                    [
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
                    onFinish={() => this.WizardFinish()} ></AdaptableWizard> : null}
        </PanelWithButton>
    }

    closeWizard() {
        this.setState({ EditedShortcut: null, WizardStartIndex: 0 });
    }
    WizardFinish() {
        if (this.state.EditedShortcut.ColumnType == ColumnType.Number) {
            this.props.onAddShortcut(this.state.EditedShortcut)
        }
        else if (this.state.EditedShortcut.ColumnType == ColumnType.Date) {
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
        onSelectShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.ShortcutSelect(shortcut)),
        onAddShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.ShortcutAdd(shortcut)),
        onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => dispatch(ShortcutRedux.ShortcutChangeKey(shortcut, NewShortcutKey)),
        onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => dispatch(ShortcutRedux.ShortcutChangeOperation(shortcut, NewShortcutAction)),
        onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => dispatch(ShortcutRedux.ShortcutChangeResult(shortcut, NewShortcutResult)),
    };
}

export let ShortcutConfig = connect(mapStateToProps, mapDispatchToProps)(ShortcutConfigComponent);

let panelStyle = {
    width: '800px'
}

const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let divStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

