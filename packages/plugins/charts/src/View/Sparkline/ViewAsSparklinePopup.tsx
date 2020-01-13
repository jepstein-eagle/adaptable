import * as React from 'react';
import { connect } from 'react-redux';
import { SelectionMode } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { StrategyViewPopupProps } from '@adaptabletools/adaptable/src/View/Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithImage';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '@adaptabletools/adaptable/src/View/Components/Selectors/ColumnSelector';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import {
  ChartData,
  SparklinesChartDefinition,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { ObjectFactory } from '@adaptabletools/adaptable/src/Utilities/ObjectFactory';
import { Flex, Text } from 'rebass';
import ErrorBox from '@adaptabletools/adaptable/src/components/ErrorBox';
import Panel from '@adaptabletools/adaptable/src/components/Panel';
import { ChartContainer } from '@adaptabletools/adaptable/src/components/ChartContainer';
import SparklineChart from '../../components/SparklineChart';
import FormLayout, { FormRow } from '@adaptabletools/adaptable/src/components/FormLayout';
import CheckBox from '@adaptabletools/adaptable/src/components/CheckBox';
import Input from '@adaptabletools/adaptable/src/components/Input';
import { SparklineTypeDropdown } from './Wizard/SparklineColumnSettingsWizard';
import { ArrayExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import { DefaultSparklinesChartProperties } from '@adaptabletools/adaptable/src/Utilities/Defaults/DefaultSparklinesChartProperties';
import { ColorPicker } from '@adaptabletools/adaptable/src/View/ColorPicker';
import { SparklineTypeEnum } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';

interface ViewAsSparklinesPopupProps
  extends StrategyViewPopupProps<ViewAsSparklinesPopupComponent> {}

interface ViewAsSparklinesPopupState {
  SparklinesChartDefinition: SparklinesChartDefinition;

  UseMaxStaticValue: boolean;
  UseMinStaticValue: boolean;

  MaxStaticValue?: number;
  MinStaticValue?: number;

  DisplayType: SparklineTypeEnum;

  ErrorMessage: string;
  DataSource: number[];
  Brush: string;
  NegativeBrush: string;
}

class ViewAsSparklinesPopupComponent extends React.Component<
  ViewAsSparklinesPopupProps,
  ViewAsSparklinesPopupState
> {
  constructor(props: ViewAsSparklinesPopupProps) {
    super(props);

    this.state = {
      DisplayType: SparklineTypeEnum.Line,
      UseMaxStaticValue: false,
      UseMinStaticValue: false,
      SparklinesChartDefinition: ObjectFactory.CreateEmptySparklinesChartDefinition(),
      ErrorMessage: null,
      DataSource: null,
      Brush: DefaultSparklinesChartProperties.Brush,
      NegativeBrush: DefaultSparklinesChartProperties.NegativeBrush,
    };
  }

  hasValidDataSelection(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.SparklinesChartDefinition.ColumnId);
  }

  render() {
    let infoBody: any[] = ['See all the values in the selected column as a sparkline chart'];

    let settingsBlock = (
      <Panel header={'Sparkline Settings'} marginTop={2} bodyScroll>
        <FormLayout columns={[1, 2]}>
          <FormRow>
            <label>Sparkline type</label>
            <SparklineTypeDropdown
              style={{ width: '10rem' }}
              value={this.state.DisplayType}
              onChange={(DisplayType: SparklineTypeEnum) =>
                this.setState({
                  DisplayType,
                })
              }
            />
          </FormRow>
          <FormRow>
            <CheckBox
              checked={this.state.UseMinStaticValue}
              onChange={UseMinStaticValue => {
                this.setState({
                  UseMinStaticValue,
                });
              }}
            >
              Use static min value
            </CheckBox>

            {this.state.UseMinStaticValue ? (
              <Input
                style={{ width: '10rem' }}
                value={this.state.MinStaticValue}
                type="number"
                onChange={(event: any) => {
                  this.setState({
                    MinStaticValue: Number(event.target.value),
                  });
                }}
              />
            ) : (
              <div />
            )}
          </FormRow>

          <FormRow>
            <CheckBox
              checked={this.state.UseMaxStaticValue}
              onChange={UseMaxStaticValue => {
                this.setState({
                  UseMaxStaticValue,
                });
              }}
            >
              Use static max value
            </CheckBox>
            {this.state.UseMaxStaticValue ? (
              <Input
                style={{ width: '10rem' }}
                value={this.state.MaxStaticValue}
                type="number"
                onChange={(event: any) => {
                  this.setState({
                    MaxStaticValue: Number(event.target.value),
                  });
                }}
              />
            ) : (
              <div />
            )}
          </FormRow>
          <FormRow>
            <label>Line Color</label>
            <ColorPicker
              ColorPalette={this.props.ColorPalette}
              value={this.state.Brush}
              onChange={x => this.onBrushColorChange(x)}
            />
          </FormRow>
          <FormRow>
            <label>Negative Color (for Columns)</label>
            <ColorPicker
              ColorPalette={this.props.ColorPalette}
              value={this.state.NegativeBrush}
              onChange={x => this.onNegativeBrushColorChange(x)}
            />
          </FormRow>
        </FormLayout>
      </Panel>
    );

    let chartBlock = (
      <ChartContainer
        sizeAsString={false}
        flexDirection={'column'}
        settingsPanel={settingsBlock}
        style={{
          padding: 'var(--ab-space-2)',
        }}
        chart={
          <SparklineChart
            values={this.state.DataSource || []}
            type={this.state.DisplayType}
            min={this.state.UseMinStaticValue ? this.state.MinStaticValue : undefined}
            max={this.state.UseMaxStaticValue ? this.state.MaxStaticValue : undefined}
            brush={this.state.Brush}
            negativeBrush={this.state.NegativeBrush}
          />
        }
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithImage
          header={StrategyConstants.SparklineStrategyFriendlyName}
          glyphicon={StrategyConstants.SparklinesGlyph}
          infoBody={infoBody}
          variant="primary"
          style={{ height: '100%' }}
          bodyProps={{ style: { display: 'flex', flexDirection: 'column' } }}
        >
          <Flex alignItems="center" flexDirection="row" padding={2}>
            <Text marginRight={2}>Selected Column</Text>
            <ColumnSelector
              style={{ flex: 1 }}
              showClearButton={false}
              SelectedColumnIds={[this.state.SparklinesChartDefinition.ColumnId]}
              SelectionMode={SelectionMode.Single}
              ColumnList={this.props.Adaptable.api.gridApi.getNumericColumns()}
              onColumnChange={columns => this.onDataColumnChanged(columns)}
            />
          </Flex>
          {this.hasValidDataSelection() ? (
            <>
              {this.state.ErrorMessage == null ? (
                chartBlock
              ) : (
                <ErrorBox>{this.state.ErrorMessage}</ErrorBox>
              )}
            </>
          ) : null}
        </PanelWithImage>
      </Flex>
    );
  }

  componentDidMount() {
    if (this.props.PopupParams) {
      const column = this.props.PopupParams.columnId;
      if (StringExtensions.IsNotNullOrEmpty(column)) {
        this.updateDataSource(column, this.props.PopupParams.primaryKeyValues);
      }
    }
  }

  private onDataColumnChanged(columns: AdaptableColumn[]) {
    let columnId = this.state.SparklinesChartDefinition.ColumnId;
    if (columns.length > 0) {
      columnId = columns[0].ColumnId;
    }
    this.updateDataSource(columnId, this.props.PopupParams.primaryKeyValues);
  }

  private updateDataSource(columnId: string, primaryKeyValues?: any[]) {
    let sparklinesChartDefinition: SparklinesChartDefinition = this.state.SparklinesChartDefinition;

    sparklinesChartDefinition = { ...sparklinesChartDefinition, ColumnId: columnId };
    if (ArrayExtensions.IsNotNullOrEmpty(primaryKeyValues)) {
      sparklinesChartDefinition.PrimaryKeyValues = primaryKeyValues;
    }

    let chartData: ChartData = this.props.Adaptable.ChartService.BuildSparklinesChartData(
      sparklinesChartDefinition,
      this.props.Columns
    );
    let dataSource: number[] = chartData.Data;
    let errorMessage: string = chartData.ErrorMessage;

    this.setState({
      SparklinesChartDefinition: sparklinesChartDefinition,
      DataSource: dataSource,
      ErrorMessage: errorMessage,
    });
  }

  private onBrushColorChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Brush: e.value });
  }
  private onNegativeBrushColorChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NegativeBrush: e.value });
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export let ViewAsSparklinesPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAsSparklinesPopupComponent);
