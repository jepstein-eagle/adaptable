import * as React from 'react';

import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IColItem } from '../UIInterfaces';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AdvancedSearch } from '../../PredefinedConfig/RunTimeState/AdvancedSearchState';
import Radio from '../../components/Radio';

export interface AdvancedSearchEntityRowProps<AdvancedSearchEntityRow>
  extends SharedEntityExpressionRowProps<AdvancedSearchEntityRow> {
  IsCurrentAdvancedSearch: boolean;
  onSelect: (advancedSearch: AdvancedSearch) => void;
}

export class AdvancedSearchEntityRow extends React.Component<
  AdvancedSearchEntityRowProps<AdvancedSearchEntityRow>,
  {}
> {
  render(): any {
    let advancedSearch: AdvancedSearch = this.props.AdaptableBlotterObject as AdvancedSearch;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <Radio
        onChange={() => this.props.onSelect(advancedSearch)}
        checked={this.props.IsCurrentAdvancedSearch}
      />
    );
    colItems[1].Content = <EntityRowItem Content={advancedSearch.Name} />;
    colItems[2].Content = (
      <EntityRowItem
        Content={ExpressionHelper.ConvertExpressionToString(
          advancedSearch.Expression,
          this.props.Columns
        )}
      />
    );

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(advancedSearch)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={undefined}
        EntityType={StrategyConstants.AdvancedSearchStrategyName}
      />
    );

    colItems[3].Content = buttons;

    return (
      <AdaptableObjectRow
        colItems={colItems}
        onClick={() => this.props.onSelect(advancedSearch)}
        style={{ cursor: 'pointer' }}
      />
    );
  }
}
