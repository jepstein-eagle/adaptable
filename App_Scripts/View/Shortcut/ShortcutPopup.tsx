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
import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';
import { DataType } from '../../Core/Enums'
import { MathOperation } from '../../Core/Enums'
import { ShortcutEntityRow } from './ShortcutEntityRow'
import { ShortcutWizard } from './Wizard/ShortcutWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { EntityCollectionView } from '../Components/EntityCollectionView';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';


interface ShortcutPopupProps extends StrategyViewPopupProps<ShortcutPopupComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => ShortcutRedux.ShortcutChangeKeyAction
    onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutOperation: MathOperation) => ShortcutRedux.ShortcutChangeOperationAction
    onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => ShortcutRedux.ShortcutChangeResultAction

    Shortcuts: Array<IShortcut>,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class ShortcutPopupComponent extends React.Component<ShortcutPopupProps, EditableConfigEntityState> {
    constructor() {
        super();
        this.state = UIHelper.EmptyConfigState();
    }

    render() {
        let infoBody: any[] = ["Use shortcuts to replace frequently entered text (in numeric or date columns) with a single keystroke.", <br />, <br />,
            "Numeric shortcuts update the existing cell value based on a 'calculation'.", <br />, <br />,
            "Date shortcuts replace the contents of the cell with a new date value."]

        let colItems: IColItem[] = [
            { Content: "Type", Size: 2 },
            { Content: "Key", Size: 1 },
            { Content: "Operation", Size: 3 },
            { Content: "Value", Size: 3 },
            { Content: "", Size: 3 },
        ]

        const shortcutOperationList: Array<MathOperation> = [MathOperation.Add, MathOperation.Subtract, MathOperation.Multiply, MathOperation.Divide];

        let shortcuts = this.props.Shortcuts.map((shortcut: IShortcut, index: number) => {
            return <ShortcutEntityRow
                ConfigEntity={shortcut} key={"ns" + index}
                Index={index}
                onEdit={null}
                ColItems={colItems}
                AvailableActions={shortcutOperationList}
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

        let shortcut: IShortcut = this.state.EditedAdaptableBlotterObject as IShortcut

        return <PanelWithButton headerText={StrategyNames.ShortcutStrategyName}
            button={newButton}
            bsStyle="primary" style={panelStyle} glyphicon={StrategyGlyphs.ShortcutGlyph}
            infoBody={infoBody}>

            {shortcuts.length > 0 &&
                <EntityCollectionView ColItems={colItems} items={shortcuts} />
            }

            {shortcuts.length == 0 &&
                <Well bsSize="small">Click 'New' to add a new Shortcut.</Well>
            }

            {this.state.EditedAdaptableBlotterObject != null &&
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
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    onFinishWizard() {
        let shortcut = this.state.EditedAdaptableBlotterObject as IShortcut
        this.props.onAddShortcut(shortcut)
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }

    CreateShortcut() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyShortcut(), WizardStartIndex: 0 });
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

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddShortcut: (shortcut: IShortcut) => dispatch(ShortcutRedux.ShortcutAdd(shortcut)),
        onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => dispatch(ShortcutRedux.ShortcutChangeKey(shortcut, NewShortcutKey)),
        onChangeOperationShortcut: (shortcut: IShortcut, NewshortcutOperation: MathOperation) => dispatch(ShortcutRedux.ShortcutChangeOperation(shortcut, NewshortcutOperation)),
        onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => dispatch(ShortcutRedux.ShortcutChangeResult(shortcut, NewShortcutResult)),
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.ShortcutStrategyId))
    };
}

export let ShortcutPopup = connect(mapStateToProps, mapDispatchToProps)(ShortcutPopupComponent);

let panelStyle: React.CSSProperties = {
    'overflowY': 'auto',
    width: '800px'
}

const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


