import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { ShortcutEntityRow } from './ShortcutEntityRow';
import { ShortcutWizard } from './Wizard/ShortcutWizard';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import Helper from '../../Utilities/Helpers/Helper';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { Shortcut } from '../../PredefinedConfig/RunTimeState/ShortcutState';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';

interface ShortcutPopupProps extends StrategyViewPopupProps<ShortcutPopupComponent> {
  onAddShortcut: (shortcut: Shortcut) => ShortcutRedux.ShortcutAddAction;
  onEditShortcut: (shortcut: Shortcut) => ShortcutRedux.ShortcutEditAction;
  Shortcuts: Array<Shortcut>;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ShortcutPopupComponent extends React.Component<
  ShortcutPopupProps,
  EditableConfigEntityState
> {
  constructor(props: ShortcutPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__shortcut';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__shortcut';

    let infoBody: any[] = [
      'Use shortcuts to replace frequently entered text (in numeric or date columns) with a single keystroke.',
      <br />,
      <br />,
      "Numeric shortcuts update the existing cell value based on a 'calculation'.",
      <br />,
      <br />,
      'Date shortcuts replace the contents of the cell with a new date value.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Columns', Size: 2 },
      { Content: 'Key', Size: 1 },
      { Content: 'Operation', Size: 3 },
      { Content: 'Value', Size: 4 },
      { Content: '', Size: 2 },
    ];

    const shortcutOperationList: Array<MathOperation> = [
      MathOperation.Add,
      MathOperation.Subtract,
      MathOperation.Multiply,
      MathOperation.Divide,
    ];

    let shortcuts = this.props.Shortcuts.map((shortcut: Shortcut, index: number) => {
      return (
        <ShortcutEntityRow
          cssClassName={cssClassName}
          AdaptableBlotterObject={shortcut}
          key={'ns' + index}
          onEdit={null}
          colItems={colItems}
          AvailableActions={shortcutOperationList}
          AvailableKeys={this.getAvailableKeys(shortcut)}
          onShare={() => this.props.onShare(shortcut)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={ShortcutRedux.ShortcutDelete(shortcut)}
          onChangeKey={(shortcut, newKey) => this.onChangeKeyShortcut(shortcut, newKey)}
          onChangeOperation={(shortcut, newOperation) =>
            this.onChangeOperationShortcut(shortcut, newOperation)
          }
          onChangeResult={(shortcut, newResult) => this.onChangeResultShortcut(shortcut, newResult)}
        />
      );
    });

    let newButton = (
      <ButtonNew
        className={cssClassName}
        onClick={() => this.onNew()}
        tooltip="Create New Shortcut"
        AccessLevel={this.props.AccessLevel}
      />
    );

    let shortcut: Shortcut = this.state.EditedAdaptableBlotterObject as Shortcut;

    return (
      <Flex className={cssClassName} flex={1} flexDirection="column">
        <PanelWithButton
          cssClassName={cssClassName}
          headerText={StrategyConstants.ShortcutStrategyName}
          className="ab_main_popup"
          button={newButton}
          glyphicon={StrategyConstants.ShortcutGlyph}
          infoBody={infoBody}
          bodyProps={{ padding: 0 }}
        >
          {shortcuts.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={shortcuts}
            />
          ) : (
            <EmptyContent>Click 'New' to add a new Shortcut.</EmptyContent>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <ShortcutWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={shortcut}
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              Blotter={this.props.Blotter}
              DateKeysAvailable={
                shortcut.ShortcutKey
                  ? keys
                      .filter(
                        x =>
                          this.props.Shortcuts.filter(s => s.ColumnType == DataType.Date).findIndex(
                            y => y.ShortcutKey == x
                          ) == -1
                      )
                      .concat(shortcut.ShortcutKey)
                      .sort()
                  : keys.filter(
                      x =>
                        this.props.Shortcuts.filter(s => s.ColumnType == DataType.Date).findIndex(
                          y => y.ShortcutKey == x
                        ) == -1
                    )
              }
              NumericKeysAvailable={
                shortcut.ShortcutKey
                  ? keys
                      .filter(
                        x =>
                          this.props.Shortcuts.filter(
                            s => s.ColumnType == DataType.Number
                          ).findIndex(y => y.ShortcutKey == x) == -1
                      )
                      .concat(shortcut.ShortcutKey)
                      .sort()
                  : keys.filter(
                      x =>
                        this.props.Shortcuts.filter(s => s.ColumnType == DataType.Number).findIndex(
                          y => y.ShortcutKey == x
                        ) == -1
                    )
              }
              WizardStartIndex={this.state.WizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onChangeKeyShortcut(shortcut: Shortcut, newKey: string): void {
    let clonedShortcut: Shortcut = Helper.cloneObject(shortcut);
    clonedShortcut.ShortcutKey = newKey;
    this.props.onEditShortcut(clonedShortcut);
  }
  onChangeOperationShortcut(shortcut: Shortcut, newMathOperation: MathOperation): void {
    let clonedShortcut: Shortcut = Helper.cloneObject(shortcut);
    clonedShortcut.ShortcutOperation = newMathOperation;
    this.props.onEditShortcut(clonedShortcut);
  }
  onChangeResultShortcut(shortcut: Shortcut, newResult: any): void {
    let clonedShortcut: Shortcut = Helper.cloneObject(shortcut);
    clonedShortcut.ShortcutResult = newResult;
    this.props.onEditShortcut(clonedShortcut);
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let shortcut = this.state.EditedAdaptableBlotterObject as Shortcut;
    this.props.onAddShortcut(shortcut);
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let shortcut = this.state.EditedAdaptableBlotterObject as Shortcut;

    return (
      StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutResult) &&
      StringExtensions.IsNotNullOrEmpty(shortcut.ShortcutKey)
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyShortcut(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  getAvailableKeys(shortcut: Shortcut): string[] {
    return shortcut.ColumnType == DataType.Number
      ? keys
          .filter(
            x =>
              this.props.Shortcuts.filter(s => s.ColumnType == DataType.Number).findIndex(
                y => y.ShortcutKey == x
              ) == -1
          )
          .concat(shortcut.ShortcutKey)
          .sort()
      : keys
          .filter(
            x =>
              this.props.Shortcuts.filter(s => s.ColumnType == DataType.Date).findIndex(
                y => y.ShortcutKey == x
              ) == -1
          )
          .concat(shortcut.ShortcutKey)
          .sort();
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Shortcuts: state.Shortcut.Shortcuts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddShortcut: (shortcut: Shortcut) => dispatch(ShortcutRedux.ShortcutAdd(shortcut)),
    onEditShortcut: (shortcut: Shortcut) => dispatch(ShortcutRedux.ShortcutEdit(shortcut)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ShortcutStrategyId)),
  };
}

export let ShortcutPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortcutPopupComponent);

const keys = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
