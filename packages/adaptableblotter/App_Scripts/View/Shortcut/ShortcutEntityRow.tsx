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

export interface ShortcutEntityRowProps extends SharedEntityRowProps<ShortcutEntityRow> {
  onChangeKey: (shortcut: Shortcut, NewShortcutKey: string) => void;
  onChangeResult: (shortcut: Shortcut, NewShortcutResult: any) => void;
  onChangeOperation: (shortcut: Shortcut, NewShortcutOperation: MathOperation) => void;
  AvailableKeys: Array<string>;
  AvailableActions: Array<MathOperation>;
}

export class ShortcutEntityRow extends React.Component<ShortcutEntityRowProps, {}> {
  render(): any {
    let shortcut: Shortcut = this.props.AdaptableObject as Shortcut;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem Content={shortcut.ColumnType == DataType.Date ? 'Date' : 'Numeric'} />
    );

    colItems[1].Content = (
      <EntityRowItem
        Content={
          <Dropdown
            style={{ minWidth: 'auto', width: '100%' }}
            showClearButton={false}
            showEmptyItem={false}
            options={this.props.AvailableKeys.map(x => {
              return {
                value: x,
                label: x,
              };
            })}
            value={shortcut.ShortcutKey}
            onChange={(x: any) => this.onKeySelectChange(x)}
          ></Dropdown>
        }
      />
    );

    colItems[2].Content = (
      <EntityRowItem
        Content={
          shortcut.ColumnType == DataType.Date ? (
            'Replace Cell'
          ) : (
            <Dropdown
              style={{ minWidth: 'auto', width: '100%' }}
              showEmptyItem={false}
              showClearButton={false}
              value={shortcut.ShortcutOperation}
              onChange={x => this.onActionChange(x)}
              options={this.props.AvailableActions.map((shortcutOperation: MathOperation) => {
                return { value: shortcutOperation, label: MathOperation[shortcutOperation] };
              })}
            ></Dropdown>
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
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ShortcutStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onResultChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeResult(this.props.AdaptableObject as Shortcut, e.value);
  }

  onKeySelectChange(value: any) {
    this.props.onChangeKey(this.props.AdaptableObject as Shortcut, value);
  }

  onActionChange(value: MathOperation) {
    this.props.onChangeOperation(this.props.AdaptableObject as Shortcut, value as MathOperation);
  }
}
