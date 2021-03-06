import * as React from 'react';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { MathOperation } from '../../PredefinedConfig/Common/Enums';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';

import { EntityRowItem } from '../Components/EntityRowItem';
import { Shortcut } from '../../PredefinedConfig/ShortcutState';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import DropdownButton from '../../components/DropdownButton';

export interface ShortcutEntityRowProps extends SharedEntityRowProps<ShortcutEntityRow> {
  onChangeKey: (shortcut: Shortcut, NewShortcutKey: string) => void;
  onChangeResult: (shortcut: Shortcut, NewShortcutResult: any) => void;
  onChangeOperation: (shortcut: Shortcut, NewShortcutOperation: MathOperation) => void;
  AvailableKeys: Array<string>;
  AvailableActions: Array<MathOperation>;
}

export class ShortcutEntityRow extends React.Component<ShortcutEntityRowProps, {}> {
  render(): any {
    let shortcut: Shortcut = this.props.adaptableObject as Shortcut;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem Content={shortcut.ColumnType == DataType.Date ? 'Date' : 'Numeric'} />
    );

    colItems[1].Content = (
      <EntityRowItem
        Content={
          <DropdownButton
            style={{ minWidth: 'auto', width: '100%' }}
            items={this.props.AvailableKeys.map(x => {
              return {
                value: x,
                label: x,
                onClick: () => this.onKeySelectChange(x),
              };
            })}
            variant="outlined"
            marginRight={2}
          >
            {shortcut.ShortcutKey}
          </DropdownButton>
        }
      />
    );

    colItems[2].Content = (
      <EntityRowItem
        Content={
          shortcut.ColumnType == DataType.Date ? (
            'Replace Cell'
          ) : (
            <DropdownButton
              style={{ minWidth: 'auto', width: '100%' }}
              items={this.props.AvailableActions.map((shortcutOperation: MathOperation) => {
                return {
                  value: shortcutOperation,
                  label: MathOperation[shortcutOperation],
                  onClick: () => this.onActionChange(shortcutOperation),
                };
              })}
              variant="outlined"
              marginRight={2}
            >
              {shortcut.ShortcutOperation}
            </DropdownButton>
          )
        }
      />
    );

    colItems[3].Content = (
      <EntityRowItem
        Content={
          shortcut.IsDynamic ? (
            shortcut.ShortcutResult
          ) : (
            <Input
              width="100%"
              type={shortcut.ColumnType == DataType.Date ? 'date' : 'number'}
              placeholder="Shortcut Result"
              onChange={(e: React.SyntheticEvent) => this.onResultChange(e)}
              value={shortcut.ShortcutResult}
            />
          )
        }
      />
    );
    colItems[4].Content = (
      <EntityListActionButtons
        showEdit={false}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        confirmDeleteAction={this.props.onDeleteConfirm}
        entityType={StrategyConstants.ShortcutStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onResultChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeResult(this.props.adaptableObject as Shortcut, e.value);
  }

  onKeySelectChange(value: any) {
    this.props.onChangeKey(this.props.adaptableObject as Shortcut, value);
  }

  onActionChange(value: MathOperation) {
    this.props.onChangeOperation(this.props.adaptableObject as Shortcut, value as MathOperation);
  }
}
