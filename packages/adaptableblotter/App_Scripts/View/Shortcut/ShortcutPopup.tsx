import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { Well } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux'
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux'
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { DataType, AccessLevel } from '../../Core/Enums'
import { MathOperation } from '../../Core/Enums'
import { ShortcutEntityRow } from './ShortcutEntityRow'
import { ShortcutWizard } from './Wizard/ShortcutWizard'
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from "../UIInterfaces";
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Core/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IShortcut, IAdaptableBlotterObject } from "../../Api/Interface/IAdaptableBlotterObjects";
import { EntitlementHelper } from "../../Utilities/Helpers/EntitlementHelper";


interface ShortcutPopupProps extends StrategyViewPopupProps<ShortcutPopupComponent> {
    onAddShortcut: (shortcut: IShortcut) => ShortcutRedux.ShortcutAddAction
    onChangeKeyShortcut: (shortcut: IShortcut, NewShortcutKey: string) => ShortcutRedux.ShortcutChangeKeyAction
    onChangeOperationShortcut: (shortcut: IShortcut, NewShortcutOperation: MathOperation) => ShortcutRedux.ShortcutChangeOperationAction
    onChangeResultShortcut: (shortcut: IShortcut, NewShortcutResult: any) => ShortcutRedux.ShortcutChangeResultAction
    Shortcuts: Array<IShortcut>,
    onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction
}

class ShortcutPopupComponent extends React.Component<ShortcutPopupProps, EditableConfigEntityState> {
    constructor(props: ShortcutPopupProps) {
        super(props);
        this.state = UIHelper.EmptyConfigState();
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__shortcut";
        let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + "__shortcut";
      
        let infoBody: any[] = ["Use shortcuts to replace frequently entered text (in numeric or date columns) with a single keystroke.", <br />, <br />,
            "Numeric shortcuts update the existing cell value based on a 'calculation'.", <br />, <br />,
            "Date shortcuts replace the contents of the cell with a new date value."]

        let colItems: IColItem[] = [
            { Content: "Columns", Size: 2 },
            { Content: "Key", Size: 2 },
            { Content: "Operation", Size: 3 },
            { Content: "Value", Size: 3 },
            { Content: "", Size: 2 },
        ]

        const shortcutOperationList: Array<MathOperation> = [MathOperation.Add, MathOperation.Subtract, MathOperation.Multiply, MathOperation.Divide];

        let shortcuts = this.props.Shortcuts.map((shortcut: IShortcut, index: number) => {
            return <ShortcutEntityRow
                cssClassName={cssClassName}
                AdaptableBlotterObject={shortcut} key={"ns" + index}
                Index={index}
                onEdit={null}
                colItems={colItems}
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

        let newButton = <ButtonNew cssClassName={cssClassName} 
        onClick={() => this.CreateShortcut()}
            overrideTooltip="Create New Shortcut"
            DisplayMode="Glyph+Text"
            size={"small"} 
            AccessLevel = {this.props.AccessLevel}
            />

        let shortcut: IShortcut = this.state.EditedAdaptableBlotterObject as IShortcut

        return <div className={cssClassName}>
            <PanelWithButton cssClassName={cssClassName} headerText={StrategyConstants.ShortcutStrategyName} className="ab_main_popup"
                button={newButton}
                bsStyle="primary" glyphicon={StrategyConstants.ShortcutGlyph}
                infoBody={infoBody}>

                {shortcuts.length > 0 &&
                    <AdaptableObjectCollection cssClassName={cssClassName} colItems={colItems} items={shortcuts} />
                }

                {shortcuts.length == 0 &&
                    <Well bsSize="small">Click 'New' to add a new Shortcut.</Well>
                }

                {this.state.EditedAdaptableBlotterObject != null &&
                    <ShortcutWizard
                        cssClassName={cssWizardClassName}
                        EditedAdaptableBlotterObject={shortcut}
                        ConfigEntities={null}
                        ModalContainer={this.props.ModalContainer}
                        Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        DateKeysAvailable={shortcut.ShortcutKey ?
                            keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                            : keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1)}
                        NumericKeysAvailable={shortcut.ShortcutKey ?
                            keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
                            : keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1)}
                        WizardStartIndex={this.state.WizardStartIndex}
                        onCloseWizard={() => this.onCloseWizard()}
                        onFinishWizard={() => this.onFinishWizard()}
                        canFinishWizard={() => this.canFinishWizard()}
                    />
                }
            </PanelWithButton>
        </div>
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

    canFinishWizard() {
        let shortcut = this.state.EditedAdaptableBlotterObject as IShortcut

        return StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutResult) &&
            StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutKey)
    }

    CreateShortcut() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyShortcut(), WizardStartIndex: 0 });
    }

    getAvailableKeys(shortcut: IShortcut): string[] {
        return (shortcut.ColumnType == DataType.Number) ?
            keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == DataType.Number).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
            : keys.filter(x => this.props.Shortcuts.filter(s => s.ColumnType == DataType.Date).findIndex(y => y.ShortcutKey == x) == -1).concat(shortcut.ShortcutKey).sort()
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
        onShare: (entity: IAdaptableBlotterObject) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ShortcutStrategyId))
    };
}

export let ShortcutPopup = connect(mapStateToProps, mapDispatchToProps)(ShortcutPopupComponent);

const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
