import { IShortcut } from '../../Strategy/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, Checkbox, Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/StrategyIds'
import * as StrategyNames from '../../Core/StrategyNames'
import * as StrategyGlyphs from '../../Core/StrategyGlyphs'
import { IStrategyViewPopupProps } from '../../Core/Interface/IStrategyView'
import { IColumn, IConfigEntity , IEntityRowInfo} from '../../Core/Interface/IAdaptableBlotter';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { ShortcutEntityRow } from './ShortcutEntityRow'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { ShortcutWizard } from './Wizard/ShortcutWizard'
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EditableConfigEntityInternalState } from '../Components/SharedProps/EditableConfigEntityPopupProps';


interface ShortcutPopupProps extends IStrategyViewPopupProps<ShortcutPopupComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => ShortcutRedux.ShortcutChangeKeyAction
    onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => ShortcutRedux.ShortcutChangeOperationAction
    onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => ShortcutRedux.ShortcutChangeResultAction

    Shortcuts: Array<IShortcut>,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class ShortcutPopupComponent extends React.Component<ShortcutPopupProps, EditableConfigEntityInternalState> {
    constructor() {
        super();
        this.state = { EditedConfigEntity: null, WizardStartIndex: 0 , EditedIndexConfigEntity:0}
    }

    render() {
        let infoBody: any[] = ["Use shortcuts to replace frequently entered text with a single keystroke.", <br />, <br />,
            "Numeric shortcuts update the existing cell value based on a calculation'.", <br />, <br />,
            "Date shortcuts replace the contents of the cell with a new date value.", <br />, <br />,
            "Check ", <i>Live</i>, " to turn on a shortcut.", <br />, <br />,
            "Click ", <i><b>New</b></i>, " to create a new shortcut (numeric and date columns only)."]

         let entityRowInfo:IEntityRowInfo [] =[
            {Caption: "Type", Width: 2}, 
            {Caption: "Key", Width: 1}, 
            {Caption: "Action", Width: 3}, 
            {Caption: "Value", Width: 3}, 
            {Caption: "", Width: 3}, 
        ]

        // we now show all shortcuts in one list without the tab (too confusing)
        let shortcuts = this.props.Shortcuts.map((shortcut: IShortcut, index: number) => {
            return <ShortcutEntityRow 
            ConfigEntity={shortcut} key={"ns" + index}
            Index ={index}
            onEdit={null}
            EntityRowInfo={entityRowInfo}
                AvailableKeys={this.getAvailableKeys(shortcut)}
                onShare={() => this.props.onShare(shortcut)}
                TeamSharingActivated={this.props.TeamSharingActivated}
                onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
                onChangeKey={(shortcut, newKey) => this.props.onChangeKeyShortcut(shortcut, newKey)}
                onChangeOperation={(shortcut, newOperation) => this.props.onChangeOperationShortcut(shortcut, newOperation)}
                onChangeResult={(shortcut, newResult) => this.props.onChangeResultShortcut(shortcut, newResult)}>
            </ShortcutEntityRow>
        });

        let newButton = <ButtonNew onClick={() => this.CreateShortcut()}
            overrideTooltip="Create New Shortcut"
            DisplayMode="Glyph+Text" 
            size={"small"}/>

            let shortcut :IShortcut = this.state.EditedConfigEntity as IShortcut
           
        return <PanelWithButton headerText={StrategyNames.ShortcutStrategyName}
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.ShortcutGlyph}
            infoBody={infoBody}>

            {this.props.Shortcuts.length == 0 ?
                <Well bsSize="small">Click 'New' to add a new Shortcut.</Well>
                :
                <div>
                    <PanelWithRow  entityRowInfo={entityRowInfo} bsStyle="info" />
                    <ListGroup style={divStyle}>
                        {shortcuts}
                    </ListGroup>
                </div>
            }

            {this.state.EditedConfigEntity != null &&
                <ShortcutWizard
                    EditedShortcut={shortcut}
                    DateKeysAvailable={shortcut.ShortcutKey ?
                        keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                        : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1)}
                    NumericKeysAvailable={shortcut.ShortcutKey ?
                        keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                        : keys.filter(x => this.props.Shortcuts.filter(s => s.DataType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1)}
                    WizardStartIndex={this.state.WizardStartIndex}
                    closeWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                />
            }
        </PanelWithButton>
    }

      onCloseWizard() {
        this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    onFinishWizard() {
            this.props.onAddShortcut(this.state.EditedConfigEntity as IShortcut)
         this.setState({ EditedConfigEntity: null, WizardStartIndex: 0 });
    }

    CreateShortcut() {
        this.setState({ EditedConfigEntity: ObjectFactory.CreateEmptyShortcut(), WizardStartIndex: 0 });
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

export let ShortcutPopup = connect(mapStateToProps, mapDispatchToProps)(ShortcutPopupComponent);

let panelStyle: React.CSSProperties = {
    'overflowY': 'auto',
    width: '800px'
}


const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'maxHeight': '300px'
}

