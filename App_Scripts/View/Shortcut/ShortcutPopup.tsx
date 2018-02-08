import { IShortcut } from '../../Strategy/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyIds from '../../Core/Constants/StrategyIds'
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../../Core/Constants/StrategyGlyphs'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { ShortcutEntityRow } from './ShortcutEntityRow'
import { ShortcutWizard } from './Wizard/ShortcutWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityPopupProps';
import { EntityItemList } from '../Components/EntityItemList';
import { IColItem } from '../../Core/Interface/IAdaptableBlotter';
import { UIHelper } from '../UIHelper';


interface ShortcutPopupProps extends StrategyViewPopupProps<ShortcutPopupComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => ShortcutRedux.ShortcutChangeKeyAction
    onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => ShortcutRedux.ShortcutChangeOperationAction
    onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => ShortcutRedux.ShortcutChangeResultAction

    Shortcuts: Array<IShortcut>,
    onShare: (entity: IConfigEntity) => TeamSharingRedux.TeamSharingShareAction
}

class ShortcutPopupComponent extends React.Component<ShortcutPopupProps, EditableConfigEntityState> {
    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState() ;
    }

    render() {
        let infoBody: any[] = ["Use shortcuts to replace frequently entered text (in numeric or date columns) with a single keystroke.", <br />, <br />,
            "Numeric shortcuts update the existing cell value based on a 'calculation'.", <br />, <br />,
            "Date shortcuts replace the contents of the cell with a new date value."]

            let colItems: IColItem[] = [
            { Content: "Type", Size: 2 },
            { Content: "Key", Size: 1 },
            { Content: "Action", Size: 3 },
            { Content: "Value", Size: 3 },
            { Content: "", Size: 3 },
        ]

        const shortcutActionList: Array<ShortcutAction> = [ShortcutAction.Add, ShortcutAction.Subtract, ShortcutAction.Multiply, ShortcutAction.Divide];

        let shortcuts = this.props.Shortcuts.map((shortcut: IShortcut, index: number) => {
            return <ShortcutEntityRow
                ConfigEntity={shortcut} key={"ns" + index}
                Index={index}
                onEdit={null}
                ColItems={colItems}
                AvailableActions={shortcutActionList}
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
            size={"small"} />

        let shortcut: IShortcut = this.state.EditedConfigEntity as IShortcut

        return <PanelWithButton headerText={StrategyNames.ShortcutStrategyName}
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.ShortcutGlyph}
            infoBody={infoBody}>

            {shortcuts.length > 0 &&
                <EntityItemList ColItems={colItems} items={shortcuts} />
            }

            {shortcuts.length == 0 &&
                <Well bsSize="small">Click 'New' to add a new Shortcut.</Well>
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
        this.props.onClearPopupParams()
        this.state = UIHelper.EmptyConfigState() ;
    }

    onFinishWizard() {
        let shortcut = this.state.EditedConfigEntity as IShortcut
       this.props.onAddShortcut(shortcut)
        this.state = UIHelper.EmptyConfigState() ;
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


