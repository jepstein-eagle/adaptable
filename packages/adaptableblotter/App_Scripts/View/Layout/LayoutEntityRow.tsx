import * as React from 'react';

import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';

import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IColItem } from '../UIInterfaces';
import { DEFAULT_LAYOUT } from '../../Utilities/Constants/GeneralConstants';
import { LayoutHelper } from '../../Utilities/Helpers/LayoutHelper';
import { Layout } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { EntityRowItem } from '../Components/EntityRowItem';
import Radio from '../../components/Radio';

export interface LayoutEntityRowProps<LayoutEntityRow>
  extends SharedEntityExpressionRowProps<LayoutEntityRow> {
  IsCurrentLayout: boolean;
  onSelect: (Layout: Layout) => void;
}

export class LayoutEntityRow extends React.Component<LayoutEntityRowProps<LayoutEntityRow>, {}> {
  render(): any {
    let layout: Layout = this.props.AdaptableBlotterObject as Layout;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={
          <Radio
            style={{ padding: '0px', margin: '0px' }}
            onChange={() => this.props.onSelect(layout)}
            checked={this.props.IsCurrentLayout}
          />
        }
      />
    );
    colItems[1].Content = <EntityRowItem Content={layout.Name} />;
    colItems[2].Content = (
      <EntityRowItem Content={LayoutHelper.getLayoutDescription(layout, this.props.Columns)} />
    );

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(layout)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={false}
        overrideDisableDelete={layout.Name == DEFAULT_LAYOUT}
        EntityType={StrategyConstants.LayoutStrategyName}
      />
    );

    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
