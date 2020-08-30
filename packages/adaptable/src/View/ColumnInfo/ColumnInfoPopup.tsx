import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Flex, Box } from 'rebass';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { CustomSortSummary } from '../CustomSort/CustomSortSummary';
import { ConditionalStyleSummary } from '../ConditionalStyle/ConditionalStyleSummary';
import { CellValidationSummary } from '../CellValidation/CellValidationSummary';
import { UserFilterSummary } from '../UserFilter/UserFilterSummary';
import { FilterSummary } from '../Filter/FilterSummary';
import { PlusMinusSummary } from '../PlusMinus/PlusMinusSummary';
import { FormatColumnSummary } from '../FormatColumn/FormatColumnSummary';
import { FlashingCellSummary } from '../FlashingCells/FlashingCellSummary';
import { CalculatedColumnSummary } from '../CalculatedColumn/CalculatedColumnSummary';
import { DataType, SelectionMode } from '../../PredefinedConfig/Common/Enums';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem, IRawValueDisplayValuePair } from '../UIInterfaces';
import { ColumnSelector } from '../Components/Selectors/ColumnSelector';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { PercentBarSummary } from '../PercentBar/PercentBarSummary';
import { FreeTextColumnSummary } from '../FreeTextColumn/FreeTextColumnSummary';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { GradientColumnSummary } from '../GradientColumn/GradientColumnSummary';

interface ColumnInfoPopupProps extends StrategyViewPopupProps<ColumnInfoPopupComponent> {
  CalculatedColumns: Array<CalculatedColumn>;
}

export interface ColumnInfoState {
  SelectedColumn: AdaptableColumn;
  ShowSelector: boolean;
}

class ColumnInfoPopupComponent extends React.Component<ColumnInfoPopupProps, ColumnInfoState> {
  constructor(props: ColumnInfoPopupProps) {
    super(props);
    this.state = { SelectedColumn: null, ShowSelector: true };
  }

  UNSAFE_componentWillMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.column) {
        let column = this.props.popupParams.column;
        this.setState({ SelectedColumn: column, ShowSelector: false });
      }
    }
  }

  render() {
    let infoBody: any[] = [
      'Displays information about a column in the grid - which Adaptable Objects it has attached.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Function', Size: 3 },
      { Content: 'Summary', Size: 7 },
      { Content: '', Size: 2 },
    ];
    let selectedColumnId: string = this.state.SelectedColumn
      ? this.state.SelectedColumn.ColumnId
      : null;

    let headerText = StrategyConstants.ColumnInfoStrategyFriendlyName;

    let summaries: any[] = [];
    if (this.state.SelectedColumn) {
      if (this.isStrategyVisible(StrategyConstants.CustomSortStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.CustomSortStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.CustomSortStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <CustomSortSummary
              key={StrategyConstants.CustomSortStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.CustomSortStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }
      if (this.isStrategyVisible(StrategyConstants.ConditionalStyleStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.ConditionalStyleStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.ConditionalStyleStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <ConditionalStyleSummary
              key={StrategyConstants.ConditionalStyleStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.ConditionalStyleStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }
      if (this.isStrategyVisible(StrategyConstants.CellValidationStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.CellValidationStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.CellValidationStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <CellValidationSummary
              key={StrategyConstants.CellValidationStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.CellValidationStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }

      if (this.isStrategyVisible(StrategyConstants.FilterStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.FilterStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.FilterStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <FilterSummary
              key={StrategyConstants.FilterStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.FilterStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }

      if (this.isStrategyVisible(StrategyConstants.FormatColumnStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.FormatColumnStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.FormatColumnStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <FormatColumnSummary
              key={StrategyConstants.FormatColumnStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }
      if (this.isStrategyVisible(StrategyConstants.FreeTextColumnStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.FreeTextColumnStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.FreeTextColumnStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <FreeTextColumnSummary
              key={StrategyConstants.FormatColumnStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }
      if (
        this.isStrategyVisible(StrategyConstants.PercentBarStrategyId) &&
        this.state.SelectedColumn.DataType == DataType.Number
      ) {
        summaries.push(
          <div
            key={StrategyConstants.PercentBarStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.PercentBarStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <PercentBarSummary
              key={StrategyConstants.PercentBarStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.PercentBarStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }
      if (
        this.isStrategyVisible(StrategyConstants.GradientColumnStrategyId) &&
        this.state.SelectedColumn.DataType == DataType.Number
      ) {
        summaries.push(
          <div
            key={StrategyConstants.GradientColumnStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.GradientColumnStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <GradientColumnSummary
              key={StrategyConstants.GradientColumnStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.GradientColumnStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }
      if (
        this.isStrategyVisible(StrategyConstants.PlusMinusStrategyId) &&
        this.state.SelectedColumn.DataType == DataType.Number
      ) {
        summaries.push(
          <div
            key={StrategyConstants.PlusMinusStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.PlusMinusStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <PlusMinusSummary
              key={StrategyConstants.PlusMinusStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              teamSharingActivated={this.props.teamSharingActivated}
              accessLevel={this.getAccessLevel(StrategyConstants.PlusMinusStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }

      if (
        this.isStrategyVisible(StrategyConstants.FlashingCellsStrategyId) &&
        this.state.SelectedColumn.DataType == DataType.Number
      ) {
        summaries.push(
          <div
            key={StrategyConstants.FlashingCellsStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.FlashingCellsStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <FlashingCellSummary
              key={StrategyConstants.FlashingCellsStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              accessLevel={this.getAccessLevel(StrategyConstants.FlashingCellsStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }
      if (
        this.isStrategyVisible(StrategyConstants.CalculatedColumnStrategyId) &&
        ArrayExtensions.ContainsItem(
          this.props.CalculatedColumns.map(cc => cc.ColumnId),
          this.state.SelectedColumn.ColumnId
        )
      ) {
        summaries.push(
          <div
            key={StrategyConstants.CalculatedColumnStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.CalculatedColumnStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <CalculatedColumnSummary
              key={StrategyConstants.CalculatedColumnStrategyId}
              summarisedColumn={this.state.SelectedColumn}
              accessLevel={this.getAccessLevel(StrategyConstants.CalculatedColumnStrategyId)}
              api={this.props.api}
            />
          </div>
        );
      }

      headerText = headerText + ': ' + this.state.SelectedColumn.FriendlyName;
    }

    return (
      <PanelWithImage
        header={headerText}
        variant="primary"
        glyphicon={StrategyConstants.ColumnInfoGlyph}
        infoBody={infoBody}
        bodyProps={{ padding: 2 }}
      >
        {this.state.ShowSelector && (
          <Flex flexDirection="row" alignItems="center" marginBottom={2}>
            <Box>Column: </Box>
            <Box flex={1} marginLeft={2}>
              <ColumnSelector
                SelectedColumnIds={[selectedColumnId]}
                ColumnList={this.props.api.columnApi.getColumns()}
                onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                SelectionMode={SelectionMode.Single}
              />
            </Box>
          </Flex>
        )}

        <Flex flex={1} style={{ overflow: 'auto', width: '100%' }}>
          {this.state.SelectedColumn && (
            <AdaptableObjectCollection
              style={{ width: '100%' }}
              colItems={colItems}
              items={summaries}
              reducedPanel={this.state.ShowSelector}
            />
          )}
        </Flex>
      </PanelWithImage>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState({ SelectedColumn: columns.length > 0 ? columns[0] : null });
  }

  private isStrategyVisible(functionName: AdaptableFunctionName): boolean {
    return this.getAccessLevel(functionName) == 'Full';
  }

  private isStrategyReadOnly(functionName: AdaptableFunctionName): boolean {
    return this.getAccessLevel(functionName) == 'ReadOnly';
  }

  private getAccessLevel(functionName: AdaptableFunctionName): AccessLevel {
    return this.props.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
      functionName
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<ColumnInfoPopupProps> {
  return {
    CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ColumnInfoPopupProps> {
  return {};
}

export let ColumnInfoPopup = connect(mapStateToProps, mapDispatchToProps)(ColumnInfoPopupComponent);
