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
import { ColumnFilterSummary } from '../ColumnFilter/ColumnFilterSummary';
import { PlusMinusSummary } from '../PlusMinus/PlusMinusSummary';
import { FormatColumnSummary } from '../FormatColumn/FormatColumnSummary';
import { FlashingCellSummary } from '../FlashingCells/FlashingCellSummary';
import { CalculatedColumnSummary } from '../CalculatedColumn/CalculatedColumnSummary';
import { DataType, SelectionMode, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { ColumnSelector } from '../Components/Selectors/ColumnSelector';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnCategorySummary } from '../ColumnCategory/ColumnCategorySummary';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { PercentBarSummary } from '../PercentBar/PercentBarSummary';
import { FreeTextColumnSummary } from '../FreeTextColumn/FreeTextColumnSummary';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import AdaptableHelper from '../../Utilities/Helpers/AdaptableHelper';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface ColumnInfoPopupProps extends StrategyViewPopupProps<ColumnInfoPopupComponent> {
  CalculatedColumns: Array<CalculatedColumn>;
  FunctionEntitlements: Entitlement[];
  ColumnCategory: ColumnCategory[];
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
    if (this.props.PopupParams) {
      if (this.props.PopupParams.columnId) {
        let column = ColumnHelper.getColumnFromId(
          this.props.PopupParams.columnId,
          this.props.Columns
        );
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
      if (ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategory)) {
        summaries.push(
          <div
            key={StrategyConstants.ColumnCategoryStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.ColumnCategoryStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <ColumnCategorySummary
              key={StrategyConstants.ColumnChooserStrategyId}
              SummarisedColumn={this.state.SelectedColumn}
              TeamSharingActivated={this.props.TeamSharingActivated}
              Adaptable={this.props.Adaptable}
              AccessLevel={this.getAccessLevel(StrategyConstants.ColumnChooserStrategyId)}
            />
          </div>
        );
      }
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
              SummarisedColumn={this.state.SelectedColumn}
              TeamSharingActivated={this.props.TeamSharingActivated}
              Adaptable={this.props.Adaptable}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.CustomSortStrategyId)}
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
              SummarisedColumn={this.state.SelectedColumn}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              Adaptable={this.props.Adaptable}
              AccessLevel={this.getAccessLevel(StrategyConstants.ConditionalStyleStrategyId)}
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
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.CellValidationStrategyId)}
            />
          </div>
        );
      }
      if (this.isStrategyVisible(StrategyConstants.UserFilterStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.UserFilterStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.UserFilterStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <UserFilterSummary
              key={StrategyConstants.UserFilterStrategyId}
              SummarisedColumn={this.state.SelectedColumn}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.UserFilterStrategyId)}
              Adaptable={this.props.Adaptable}
            />
          </div>
        );
      }
      if (this.isStrategyVisible(StrategyConstants.ColumnFilterStrategyId)) {
        summaries.push(
          <div
            key={StrategyConstants.ColumnFilterStrategyId}
            className={
              this.isStrategyReadOnly(StrategyConstants.ColumnFilterStrategyId)
                ? GeneralConstants.READ_ONLY_STYLE
                : ''
            }
          >
            <ColumnFilterSummary
              key={StrategyConstants.ColumnFilterStrategyId}
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.ColumnFilterStrategyId)}
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
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
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
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
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
              key={StrategyConstants.FormatColumnStrategyId}
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.FormatColumnStrategyId)}
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
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              TeamSharingActivated={this.props.TeamSharingActivated}
              getColumnValueDisplayValuePairDistinctList={
                this.props.Adaptable.getColumnValueDisplayValuePairDistinctList
              }
              AccessLevel={this.getAccessLevel(StrategyConstants.PlusMinusStrategyId)}
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
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              AccessLevel={this.getAccessLevel(StrategyConstants.FlashingCellsStrategyId)}
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
              SummarisedColumn={this.state.SelectedColumn}
              Adaptable={this.props.Adaptable}
              AccessLevel={this.getAccessLevel(StrategyConstants.CalculatedColumnStrategyId)}
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
                ColumnList={this.props.Columns}
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
    return this.getAccessLevel(functionName) == AccessLevel.Full;
  }

  private isStrategyReadOnly(functionName: AdaptableFunctionName): boolean {
    return this.getAccessLevel(functionName) == AccessLevel.ReadOnly;
  }

  private getAccessLevel(functionName: AdaptableFunctionName): AccessLevel {
    return AdaptableHelper.getEntitlementAccessLevelForStrategy(
      this.props.FunctionEntitlements,
      functionName
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
    ColumnCategory: state.ColumnCategory.ColumnCategories,
    FunctionEntitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {};
}

export let ColumnInfoPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnInfoPopupComponent);
