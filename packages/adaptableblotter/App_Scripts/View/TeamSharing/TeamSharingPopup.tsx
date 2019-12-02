import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { ISharedEntity } from '../../Utilities/Interface/ISharedEntity';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyProfile } from '../Components/StrategyProfile';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { ConditionalStyleScope } from '../../PredefinedConfig/Common/Enums';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { AdaptableBlotterObject } from '../../PredefinedConfig/Common/AdaptableBlotterObject';
import { IColItem } from '../UIInterfaces';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { Shortcut } from '../../PredefinedConfig/ShortcutState';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdvancedSearch } from '../../PredefinedConfig/AdvancedSearchState';
import { Layout } from '../../PredefinedConfig/LayoutState';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import { Report } from '../../PredefinedConfig/ExportState';
import { Icon } from '../../components/icons';
import SimpleButton from '../../components/SimpleButton';
import { Flex } from 'rebass';
import Panel from '../../components/Panel';
import HelpBlock from '../../components/HelpBlock';
import ListGroup from '../../components/List/ListGroup';

interface TeamSharingPopupProps extends StrategyViewPopupProps<TeamSharingPopupComponent> {
  Entities: Array<ISharedEntity>;
  onGetSharedItems: () => TeamSharingRedux.TeamSharingShareAction;
  onImportItem: (
    entity: AdaptableBlotterObject,
    strategy: string
  ) => TeamSharingRedux.TeamSharingImportItemAction;
}

class TeamSharingPopupComponent extends React.Component<TeamSharingPopupProps, {}> {
  componentDidMount() {
    this.props.onGetSharedItems();
  }

  render() {
    let infoBody: any[] = ['Team Sharing'];

    let colItems: IColItem[] = [
      { Content: 'Function', Size: 2 },
      { Content: 'Audit', Size: 3 },
      { Content: 'Details', Size: 6 },
      { Content: '', Size: 1 },
    ];
    let sharedItems = this.props.Entities.sort((a, b) => {
      return a.strategy < b.strategy ? -1 : 1;
    }).map((x, index) => {
      return (
        <li className="list-group-item" key={index}>
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={2}>
              <StrategyProfile StrategyId={x.strategy} />
            </Flex>
            <Flex flex={3}>
              {x.user}
              {<br />}
              {x.timestamp.toLocaleString()}
            </Flex>
            <Flex flex={6} style={{ fontSize: 'small' }}>
              <Panel variant="primary">{this.getSharedItemDetails(x)}</Panel>
            </Flex>
            <Flex flex={1}>
              <SimpleButton
                variant="text"
                tooltip="import"
                onClick={() => this.props.onImportItem(x.entity, x.strategy)}
              >
                <Icon name="import-export" />
              </SimpleButton>
            </Flex>
          </Flex>
        </li>
      );
    });

    return (
      <PanelWithImage
        header={StrategyConstants.TeamSharingStrategyName}
        infoBody={infoBody}
        glyphicon={StrategyConstants.TeamSharingGlyph}
      >
        {this.props.Entities.length == 0 ? (
          <HelpBlock>Shared Items will appear here when available.</HelpBlock>
        ) : (
          <PanelWithRow colItems={colItems} />
        )}
        <ListGroup>{sharedItems}</ListGroup>
      </PanelWithImage>
    );
  }

  getSharedItemDetails(sharedEntity: ISharedEntity) {
    switch (sharedEntity.strategy) {
      case StrategyConstants.CustomSortStrategyId: {
        let customSort = sharedEntity.entity as CustomSort;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, this.props.Columns)}
            </Flex>
            <Flex flex={8}>{customSort.SortedValues.join(', ')}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.CalculatedColumnStrategyId: {
        let calcCol = sharedEntity.entity as CalculatedColumn;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{calcCol.ColumnId}</Flex>
            <Flex flex={8}>{calcCol.ColumnExpression}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.CellValidationStrategyId: {
        let cellVal = sharedEntity.entity as CellValidationRule;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {ColumnHelper.getFriendlyNameFromColumnId(cellVal.ColumnId, this.props.Columns)}
            </Flex>
            <Flex flex={4}>
              {this.props.Blotter.ValidationService.createCellValidationDescription(
                cellVal,
                this.props.Columns
              )}
            </Flex>
            <Flex flex={4}>
              {ExpressionHelper.IsNotNullOrEmptyExpression(cellVal.Expression)
                ? ExpressionHelper.ConvertExpressionToString(cellVal.Expression, this.props.Columns)
                : 'No Expression'}
            </Flex>
          </Flex>
        );
      }
      case StrategyConstants.ConditionalStyleStrategyId: {
        let cs = sharedEntity.entity as ConditionalStyle;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {cs.ConditionalStyleScope == ConditionalStyleScope.Column
                ? ColumnHelper.getFriendlyNameFromColumnId(cs.ColumnId, this.props.Columns)
                : 'Whole Row'}
            </Flex>
            <Flex flex={3}>
              <StyleVisualItem Style={cs.Style} />
            </Flex>
            <Flex flex={5}>
              {ExpressionHelper.ConvertExpressionToString(cs.Expression, this.props.Columns)}
            </Flex>
          </Flex>
        );
      }
      case StrategyConstants.PlusMinusStrategyId: {
        let plusMinus = sharedEntity.entity as PlusMinusRule;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {ColumnHelper.getFriendlyNameFromColumnId(plusMinus.ColumnId, this.props.Columns)}
            </Flex>
            <Flex flex={3}>{plusMinus.NudgeValue.toString()}</Flex>
            <Flex flex={5}>
              {ExpressionHelper.ConvertExpressionToString(plusMinus.Expression, this.props.Columns)}
            </Flex>
          </Flex>
        );
      }
      case StrategyConstants.ShortcutStrategyId: {
        let shortcut = sharedEntity.entity as Shortcut;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{shortcut.ColumnType}</Flex>
            <Flex flex={4}>{shortcut.ShortcutKey}</Flex>
            <Flex flex={4}>{shortcut.ShortcutResult}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.UserFilterStrategyId: {
        let filter = sharedEntity.entity as UserFilter;
        let expressionString = ExpressionHelper.ConvertExpressionToString(
          filter.Expression,
          this.props.Columns
        );
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{filter.Name}</Flex>
            <Flex flex={8}>{expressionString}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.AdvancedSearchStrategyId: {
        let search = sharedEntity.entity as AdvancedSearch;
        let expressionString = ExpressionHelper.ConvertExpressionToString(
          search.Expression,
          this.props.Columns
        );
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{search.Name}</Flex>
            <Flex flex={8}>{expressionString}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.LayoutStrategyId: {
        let layout = sharedEntity.entity as Layout;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{layout.Name}</Flex>
            <Flex flex={8}>{layout.Columns.join(', ')}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.FormatColumnStrategyId: {
        let fc = sharedEntity.entity as FormatColumn;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {ColumnHelper.getFriendlyNameFromColumnId(fc.ColumnId, this.props.Columns)}
            </Flex>
            <Flex flex={8}>
              <StyleVisualItem Style={fc.Style} />
            </Flex>
          </Flex>
        );
      }
      case StrategyConstants.ExportStrategyId: {
        let range = sharedEntity.entity as Report;
        let expressionString = ExpressionHelper.ConvertExpressionToString(
          range.Expression,
          this.props.Columns
        );
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{range.Name}</Flex>
            <Flex flex={8}>{expressionString}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.ColumnFilterStrategyId: {
        return 'NEED TO DO  COLUMN FILTER'; // not sure actually
      }
      default:
        return 'NOT IMPLEMENTED';
    }
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Entities: state.TeamSharing.SharedEntities,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onGetSharedItems: () => dispatch(TeamSharingRedux.TeamSharingGet()),
    onImportItem: (entity: AdaptableBlotterObject, strategy: string) =>
      dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy)),
  };
}

export let TeamSharingPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamSharingPopupComponent);
