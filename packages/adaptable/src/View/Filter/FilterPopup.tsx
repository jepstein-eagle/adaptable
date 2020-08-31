import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { FilterEntityRow } from './FilterEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnFilter } from '../../PredefinedConfig/FilterState';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import EmptyContent from '../../components/EmptyContent';

interface FilterPopupProps extends StrategyViewPopupProps<FilterPopupComponent> {
  ColumnFilters: ColumnFilter[];
  onClearColumnFilter: (columnFilter: ColumnFilter) => FilterRedux.ColumnFilterClearAction;
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class FilterPopupComponent extends React.Component<FilterPopupProps, {}> {
  constructor(props: FilterPopupProps) {
    super(props);
    this.state = { EditedUserFilter: null, wizardStartIndex: 0 };
  }

  render() {
    let infoBody: any[] = [
      'Filters are set using the filter dropdown in the column header menu.',
      <br />,
      <br />,
      'This popup allows you to see which columns have filters applied with an option to clear them.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 3 },
      { Content: 'Filter', Size: 7 },
      { Content: '', Size: 2 },
    ];
    let columnFilterItems = this.props.ColumnFilters.map((columnFilter, index) => {
      return (
        <FilterEntityRow
          key={index}
          colItems={colItems}
          api={this.props.api}
          adaptableObject={null}
          columnFilter={columnFilter}
          onEdit={null}
          onDeleteConfirm={null}
          onClear={() => this.onClearColumnFilter(columnFilter.ColumnId)}
          onSaveColumnFilterasUserFilter={() => this.onSaveColumnFilterasUserFilter(columnFilter)}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    return (
      <PanelWithImage
        header={StrategyConstants.FilterStrategyFriendlyName}
        variant="primary"
        infoBody={infoBody}
        glyphicon={StrategyConstants.FilterGlyph}
        style={{ flex: 1 }}
      >
        {columnFilterItems.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={columnFilterItems} />
        ) : (
          <EmptyContent>
            <p>There are currently no column filters applied.</p>
            <p>Create column filters by using the filter dropdown in each column header.</p>
          </EmptyContent>
        )}
      </PanelWithImage>
    );
  }

  private onClearColumnFilter(columnId: string) {
    this.props.api.filterApi.clearColumnFilterByColumn(columnId);
  }

  private onSaveColumnFilterasUserFilter(columnFilter: ColumnFilter): void {
    let prompt: IUIPrompt = {
      Header: 'Enter name for User Filter',
      Msg: '',
      ConfirmAction: FilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
    };
    this.props.onShowPrompt(prompt);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<FilterPopupProps> {
  return {
    ColumnFilters: state.Filter.ColumnFilters,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<FilterPopupProps> {
  return {
    onClearColumnFilter: (columnFilter: ColumnFilter) =>
      dispatch(FilterRedux.ColumnFilterClear(columnFilter)),
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.FilterStrategyId, description)
      ),
  };
}

export let FilterPopup = connect(mapStateToProps, mapDispatchToProps)(FilterPopupComponent);
