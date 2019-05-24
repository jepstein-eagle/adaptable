import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { Flex } from 'rebass';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { ColumnFilterEntityRow } from './ColumnFilterEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { IAdaptableBlotterObject } from '../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';
import { IColumnFilter } from '../../Utilities/Interface/BlotterObjects/IColumnFilter';
import { IUIPrompt } from '../../Utilities/Interface/IMessage';
import EmptyContent from '../../components/EmptyContent';

interface ColumnFilterPopupProps extends StrategyViewPopupProps<ColumnFilterPopupComponent> {
  ColumnFilters: IColumnFilter[];
  onClearColumnFilter: (columnId: string) => ColumnFilterRedux.ColumnFilterClearAction;
  onShowPrompt: (prompt: IUIPrompt) => PopupRedux.PopupShowPromptAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ColumnFilterPopupComponent extends React.Component<ColumnFilterPopupProps, {}> {
  constructor(props: ColumnFilterPopupProps) {
    super(props);
    this.state = { EditedUserFilter: null, WizardStartIndex: 0 };
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__columnfilter';

    let infoBody: any[] = [
      'Column Filters are set using the filter dropdown in the column header menu.',
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
        <ColumnFilterEntityRow
          key={index}
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={null}
          ColumnFilter={columnFilter}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          Index={index}
          onEdit={null}
          onDeleteConfirm={null}
          onClear={() => this.onClearColumnFilter(columnFilter.ColumnId)}
          onSaveColumnFilterasUserFilter={() => this.onSaveColumnFilterasUserFilter(columnFilter)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    return (
      <Flex className={cssClassName} flex={1} flexDirection="column">
        <PanelWithImage
          cssClassName={cssClassName}
          header={StrategyConstants.ColumnFilterStrategyName}
          bsStyle="primary"
          infoBody={infoBody}
          glyphicon={StrategyConstants.ColumnFilterGlyph}
          style={{ flex: 1 }}
        >
          {columnFilterItems.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={columnFilterItems}
            />
          ) : (
            <EmptyContent>
              <p>There are currently no column filters applied.</p>
              <p>Create column filters by using the filter dropdown in each column header.</p>
            </EmptyContent>
          )}
        </PanelWithImage>
      </Flex>
    );
  }

  private onClearColumnFilter(columnId: string) {
    this.props.onClearColumnFilter(columnId);
    this.props.Blotter.clearColumnFiltering([columnId]);
  }

  private onSaveColumnFilterasUserFilter(columnFilter: IColumnFilter): void {
    let prompt: IUIPrompt = {
      Header: 'Enter name for User Filter',
      Msg: '',
      ConfirmAction: UserFilterRedux.CreateUserFilterFromColumnFilter(columnFilter, ''),
    };
    this.props.onShowPrompt(prompt);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ColumnFilters: state.ColumnFilter.ColumnFilters,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onClearColumnFilter: (columnId: string) =>
      dispatch(ColumnFilterRedux.ColumnFilterClear(columnId)),
    onShowPrompt: (prompt: IUIPrompt) => dispatch(PopupRedux.PopupShowPrompt(prompt)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId)),
  };
}

export let ColumnFilterPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnFilterPopupComponent);
