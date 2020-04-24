import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyProfile } from '../Components/StrategyProfile';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
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
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { SharedEntity } from '../../PredefinedConfig/TeamSharingState';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';

interface TeamSharingPopupProps extends StrategyViewPopupProps<TeamSharingPopupComponent> {
  Entities: Array<SharedEntity>;
  onTeamSharingFetch: () => TeamSharingRedux.TeamSharingShareAction;
  onImportItem: (
    Entity: AdaptableObject,
    strategy: AdaptableFunctionName
  ) => TeamSharingRedux.TeamSharingImportItemAction;
  onRemoveItem: (Uuid: string) => TeamSharingRedux.TeamSharingRemoveItemAction;
}

class TeamSharingPopupComponent extends React.Component<TeamSharingPopupProps, {}> {
  componentDidMount() {
    this.props.onTeamSharingFetch();
  }

  render() {
    let infoBody: any[] = ['Team Sharing'];

    let colItems: IColItem[] = [
      { Content: 'Function', Size: 2 },
      { Content: 'Description', Size: 2 },
      { Content: 'Audit', Size: 3 },
      { Content: 'Details', Size: 6 },
      { Content: '', Size: 1 },
    ];
    let sharedItems = this.props.Entities.sort((a, b) => {
      return a.FunctionName < b.FunctionName ? -1 : 1;
    }).map((x, index) => {
      return (
        <Flex flexDirection="row" alignItems="center" key={index}>
          <Flex flex={2}>
            <StrategyProfile FunctionName={x.FunctionName} />
          </Flex>
          <Flex flex={2}>{x.Description}</Flex>
          <Flex flex={3}>
            {x.UserName}
            {<br />}
            {new Date(x.Timestamp).toLocaleString()}
          </Flex>
          <Flex flex={6} style={{ fontSize: 'small' }}>
            <Panel variant="primary">{this.getSharedItemDetails(x)}</Panel>
          </Flex>
          <Flex flex={1}>
            <SimpleButton
              variant="text"
              tooltip="import"
              onClick={() => this.props.onImportItem(x.Entity, x.FunctionName)}
            >
              <Icon name="import-export" />
            </SimpleButton>
            <SimpleButton
              variant="text"
              tooltip="remove"
              onClick={() => this.props.onRemoveItem(x.Uuid)}
            >
              <Icon name="delete" />
            </SimpleButton>
          </Flex>
        </Flex>
      );
    });

    return (
      <PanelWithImage
        header={StrategyConstants.TeamSharingStrategyFriendlyName}
        infoBody={infoBody}
        glyphicon={StrategyConstants.TeamSharingGlyph}
      >
        {this.props.Entities.length == 0 ? (
          <HelpBlock>Shared Items will appear here when available.</HelpBlock>
        ) : (
          <PanelWithRow colItems={colItems} />
        )}
        {sharedItems}
      </PanelWithImage>
    );
  }

  getSharedItemDetails(sharedEntity: SharedEntity) {
    switch (sharedEntity.FunctionName) {
      case StrategyConstants.CustomSortStrategyId: {
        let customSort = sharedEntity.Entity as CustomSort;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {ColumnHelper.getFriendlyNameFromColumnId(customSort.ColumnId, this.props.Columns)}
            </Flex>
            <Flex flex={8}>{this.getCustomSortedValues(customSort)}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.CalculatedColumnStrategyId: {
        let calcCol = sharedEntity.Entity as CalculatedColumn;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{calcCol.ColumnId}</Flex>
            <Flex flex={8}>{calcCol.ColumnExpression}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.CellValidationStrategyId: {
        let cellVal = sharedEntity.Entity as CellValidationRule;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {ColumnHelper.getFriendlyNameFromColumnId(cellVal.ColumnId, this.props.Columns)}
            </Flex>
            <Flex flex={4}>
              {this.props.Adaptable.ValidationService.createCellValidationDescription(
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
        let cs = sharedEntity.Entity as ConditionalStyle;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>
              {cs.ConditionalStyleScope == 'Column'
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
        let plusMinus = sharedEntity.Entity as PlusMinusRule;
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
        let shortcut = sharedEntity.Entity as Shortcut;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{shortcut.ColumnType}</Flex>
            <Flex flex={4}>{shortcut.ShortcutKey}</Flex>
            <Flex flex={4}>{shortcut.ShortcutResult}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.UserFilterStrategyId: {
        let filter = sharedEntity.Entity as UserFilter;
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
        let search = sharedEntity.Entity as AdvancedSearch;
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
        let layout = sharedEntity.Entity as Layout;
        return (
          <Flex flexDirection="row" alignItems="center">
            <Flex flex={4}>{layout.Name}</Flex>
            <Flex flex={8}>{layout.Columns.join(', ')}</Flex>
          </Flex>
        );
      }
      case StrategyConstants.FormatColumnStrategyId: {
        let fc = sharedEntity.Entity as FormatColumn;
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
        let range = sharedEntity.Entity as Report;
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
  private getCustomSortedValues(customSort: CustomSort): any {
    if (ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)) {
      return customSort.SortedValues.join(', ');
    } else {
      return 'Custom Sort uses a bespoke function';
    }
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    Entities: state.TeamSharing.SharedEntities,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onTeamSharingFetch: () => dispatch(TeamSharingRedux.TeamSharingFetch()),
    onImportItem: (entity: AdaptableObject, strategy: AdaptableFunctionName) =>
      dispatch(TeamSharingRedux.TeamSharingImportItem(entity, strategy)),
    onRemoveItem: (Uuid: string) => dispatch(TeamSharingRedux.TeamSharingRemoveItem(Uuid)),
  };
}

export let TeamSharingPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamSharingPopupComponent);
