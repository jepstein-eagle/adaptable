import * as React from 'react';
import { connect } from 'react-redux';

import { SelectionMode } from '../../PredefinedConfig/Common/Enums';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterForm } from '../Components/Forms/AdaptableBlotterForm';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../Components/Selectors/ColumnSelector';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { IgrItemLegendModule } from 'igniteui-react-charts/ES2015/igr-item-legend-module';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChartModule } from 'igniteui-react-charts/ES2015/igr-doughnut-chart-module';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrRingSeriesModule } from 'igniteui-react-charts/ES2015/igr-ring-series-module';
import { IgrRingSeries } from 'igniteui-react-charts/ES2015/igr-ring-series';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';
import { AdaptablePopover } from '../AdaptablePopover';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';

import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { PieChartDefinition, PieChartDataItem, ChartData } from '../../PredefinedConfig/ChartState';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import {
  PieChartLabelPosition,
  SliceSortOption,
  OthersCategoryType,
} from '../../PredefinedConfig/Common/ChartEnums';
import { PieChartUIHelper } from '../Chart/PieChart/PieChartUIHelper';
import { Flex, Box, Text } from 'rebass';
import ErrorBox from '../../components/ErrorBox';
import HelpBlock from '../../components/HelpBlock';
import Input from '../../components/Input';
import Checkbox from '../../components/CheckBox';
import Panel from '../../components/Panel';
import Dropdown from '../../components/Dropdown';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { ChartContainer } from '../../components/ChartContainer';

interface PieChartPopupProps extends StrategyViewPopupProps<PieChartPopupComponent> {}

interface PieChartPopupState {
  PieChartDefinition: PieChartDefinition;

  ErrorMessage: string;
  DataSource: PieChartDataItem[];
  OthersCategoryType: OthersCategoryType;
  OthersCategoryThreshold: number;
  ShowAsDoughnut: boolean;

  SliceLabelsPosition: string;
  SliceLabelsMapping: string;
  SliceLegendMapping: string;
  SliceValuesMapping: string;
  SliceSortOption: SliceSortOption;
  SliceBrushes: string[];
}

class PieChartPopupComponent extends React.Component<PieChartPopupProps, PieChartPopupState> {
  public doughnutChart: IgrDoughnutChart;
  public doughnutLegend: IgrItemLegend;
  public pieChart: IgrPieChart;
  public pieChartLegend: IgrItemLegend;

  constructor(props: PieChartPopupProps) {
    super(props);
    this.state = {
      PieChartDefinition: ObjectFactory.CreateEmptyPieChartDefinition(),
      ErrorMessage: null,
      DataSource: null,

      OthersCategoryType: OthersCategoryType.Percent,
      OthersCategoryThreshold: 2,
      ShowAsDoughnut: false,

      SliceValuesMapping: 'Value',
      SliceLabelsMapping: 'Name',
      SliceLegendMapping: 'ValueAndName',
      SliceSortOption: SliceSortOption.ValueDescending,
      SliceLabelsPosition: PieChartLabelPosition.BestFit,
      SliceBrushes: PieChartUIHelper.getBrushesEven(),
    };

    IgrPieChartModule.register();
    IgrDoughnutChartModule.register();
    IgrRingSeriesModule.register();
    IgrItemLegendModule.register();

    this.onPieChartRef = this.onPieChartRef.bind(this);
    this.onDoughnutChartRef = this.onDoughnutChartRef.bind(this);
    this.onDoughnutLegendRef = this.onDoughnutLegendRef.bind(this);
    this.onPieChartLegendRef = this.onPieChartLegendRef.bind(this);
  }

  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.columnId) {
        const column = this.props.PopupParams.columnId;

        if (StringExtensions.IsNotNullOrEmpty(column)) {
          this.updateDataSource(null, column, this.props.PopupParams.primaryKeyValues);
        }
      }
    }
  }

  getOptionsForLabelsPosition(): { label: string; value: string }[] {
    let optionElements = EnumExtensions.getNames(PieChartLabelPosition).map(v => {
      return {
        value: v,
        label: v,
      };
    });
    return optionElements;
  }

  public SliceValueOptions: string[] = ['Value', 'Ratio'];
  public SliceLabelOptions: string[] = ['Value', 'ValueAndName', 'Ratio', 'RatioAndName', 'Name'];
  getOptionsForSliceLabelsMapping(): { value: string; label: string }[] {
    let optionElements = this.SliceLabelOptions.map(v => {
      return {
        value: v,
        label: v,
      };
    });
    return optionElements;
  }
  getOptionsForSliceValuesMapping(): { value: string; label: string }[] {
    let optionElements = this.SliceValueOptions.map(v => {
      return {
        value: v,
        label: v,
      };
    });
    return optionElements;
  }

  public SliceSorByOptions: string[] = [
    'Value Descending',
    'Value Ascending',
    'Name Descending',
    'Name Ascending',
  ];
  getOptionsForSliceSortOrders(): { value: string; label: string }[] {
    let optionElements = this.SliceSorByOptions.map(v => {
      return {
        value: v,
        label: v,
      };
    });
    return optionElements;
  }

  hasValidDataSelection(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.SecondaryColumnId) ||
      StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.PrimaryColumnId)
    );
  }

  render() {
    let infoBody: any[] = [
      'See the count for each distinct visible value in the column as pie chart.',
      <br />,
      "There are options to view as doughnut, set the 'Others' threshold (and type) and manage labels.",
    ];

    let radiusFactor: number = 0.8;

    let chartBlock = (
      <ChartContainer
        chart={
          this.state.ShowAsDoughnut ? (
            <IgrDoughnutChart
              allowSliceSelection="true"
              allowSliceExplosion="true"
              ref={this.onDoughnutChartRef}
            >
              <IgrRingSeries
                name="ring1"
                dataSource={this.state.DataSource}
                labelsPosition={this.state.SliceLabelsPosition}
                labelMemberPath={this.state.SliceLabelsMapping}
                valueMemberPath={this.state.SliceValuesMapping}
                legendLabelMemberPath={this.state.SliceLegendMapping}
                othersCategoryThreshold={this.state.OthersCategoryThreshold}
                othersCategoryType={this.state.OthersCategoryType}
                othersCategoryText="Others"
                brushes={this.state.SliceBrushes}
                outlines={this.state.SliceBrushes}
                radiusFactor={radiusFactor}
              />
            </IgrDoughnutChart>
          ) : (
            <IgrPieChart
              ref={this.onPieChartRef}
              dataSource={this.state.DataSource}
              labelsPosition={this.state.SliceLabelsPosition}
              labelMemberPath={this.state.SliceLabelsMapping}
              valueMemberPath={this.state.SliceValuesMapping}
              legendLabelMemberPath={this.state.SliceLegendMapping}
              othersCategoryThreshold={this.state.OthersCategoryThreshold}
              othersCategoryType={this.state.OthersCategoryType}
              othersCategoryText="Others"
              othersCategoryFill="#9A9A9A"
              othersCategoryStroke="#9A9A9A"
              brushes={this.state.SliceBrushes}
              outlines={this.state.SliceBrushes}
              radiusFactor={radiusFactor}
              selectionMode="single"
              //sliceClick={(s, e) => this.onSliceClick(e)}
            />
          )
        }
      />
    );

    let settingsBlock = (
      <Panel
        header={'Settings'}
        bodyScroll
        style={{
          borderTop: 0,
          borderRight: 0,
          borderBottom: 0,
          height: '100%',
          width: '100%',
        }}
        bodyProps={{
          padding: 0,
        }}
      >
        <Flex
          as={HelpBlock}
          flexDirection="column"
          justifyContent="center"
          padding={2}
          style={{ width: '100%' }}
        >
          <Checkbox
            marginLeft={2}
            onChange={(checked: boolean) => this.onShowDoughnutChanged(checked)}
            checked={this.state.ShowAsDoughnut}
          >
            Doughnut View
          </Checkbox>

          <Flex alignItems="center" flexDirection="row" marginTop={2}>
            Others Threshold{' '}
            <AdaptablePopover
              headerText={'Pie Chart: Others Threshold'}
              bodyText={[
                'Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value.',
              ]}
            />
          </Flex>

          <Input
            marginTop={2}
            type="number"
            min="0"
            step="1"
            placeholder={'Input'}
            onChange={this.onOthersCategoryThresholdChanged}
            value={this.state.OthersCategoryThreshold}
          />

          <Checkbox
            marginTop={3}
            marginLeft={2}
            onChange={checked => this.onThresholdAsPercentChanged(checked)}
            checked={this.state.OthersCategoryType == OthersCategoryType.Percent}
          >
            Others Threshold %
          </Checkbox>

          <Text marginTop={3} marginBottom={2}>
            Labels Position:{' '}
          </Text>
          <Dropdown
            placeholder="select"
            showEmptyItem={false}
            showClearButton={false}
            value={this.state.SliceLabelsPosition}
            onChange={(v: any) => this.onSliceLabelsPositionChanged(v)}
            options={this.getOptionsForLabelsPosition()}
          ></Dropdown>

          <Text marginTop={3} marginBottom={2}>
            Labels Content:{' '}
          </Text>
          <Dropdown
            placeholder="select"
            showEmptyItem={false}
            showClearButton={false}
            value={this.state.SliceLabelsMapping}
            onChange={(x: any) => this.onSliceLabelsMappingChanged(x)}
            options={this.getOptionsForSliceLabelsMapping()}
          ></Dropdown>

          <Text marginTop={3} marginBottom={2}>
            Slices Sort By:{' '}
          </Text>
          <Dropdown
            placeholder="select"
            showEmptyItem={false}
            showClearButton={false}
            value={this.state.SliceSortOption}
            onChange={(x: any) => this.onSliceSortByColumnChanged(x)}
            options={this.getOptionsForSliceSortOrders()}
            marginBottom={3}
          ></Dropdown>

          {/* this is not really needed unless we add calculation of
                 some new numeric columns in ChartService */}
          {/* <HelpBlock style={{ fontSize: 'small' }}>Slice Mapping:{' '}</HelpBlock>
                <FormControl
                  bsSize={"small"} componentClass="select" placeholder="select"
                  value={this.state.SliceValuesMapping}
                  onChange={(x) => this.onSliceValuesMappingChanged(x)} >
                  {this.getOptionsForSliceValuesMapping()}
                </FormControl> */}

          {this.state.ShowAsDoughnut ? (
            <Box className="doughnutLegend">
              <IgrItemLegend ref={this.onDoughnutLegendRef} />
            </Box>
          ) : (
            <Box className="pieChartLegend">
              <IgrItemLegend ref={this.onPieChartLegendRef} />
            </Box>
          )}
        </Flex>
      </Panel>
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithImage
          header={StrategyConstants.PieChartStrategyName}
          glyphicon={StrategyConstants.PieChartGlyph}
          infoBody={infoBody}
          variant="primary"
          style={{ height: '100%' }}
          bodyProps={{ style: { display: 'flex' } }}
        >
          <Flex flexDirection="row" alignItems="start" flex={1}>
            <Flex flex={8} flexDirection="column">
              <Flex alignItems="center" flexDirection="row" padding={2}>
                <Text marginRight={2}>Selected Column</Text>

                <ColumnSelector
                  style={{ flex: 1 }}
                  SelectedColumnIds={[this.state.PieChartDefinition.PrimaryColumnId]}
                  SelectionMode={SelectionMode.Single}
                  ColumnList={this.props.Columns}
                  onColumnChange={columns => this.onDataGroupColumnChanged(columns)}
                />
              </Flex>
              {this.hasValidDataSelection() ? (
                <>
                  {this.state.ErrorMessage == null ? (
                    <span>{chartBlock}</span>
                  ) : (
                    <ErrorBox>{this.state.ErrorMessage}</ErrorBox>
                  )}
                </>
              ) : null}
            </Flex>
            <Flex flex={4} style={{ overflow: 'auto', height: '100%' }}>
              {this.hasValidDataSelection() ? settingsBlock : null}
            </Flex>
          </Flex>
        </PanelWithImage>
      </Flex>
    );
  }

  private onDataValueColumnChanged(columns: AdaptableBlotterColumn[]) {
    let valueColumn: string = null;
    let labelColumn = this.state.PieChartDefinition.PrimaryColumnId;
    if (columns.length > 0) {
      valueColumn = columns[0].ColumnId;
    }
    this.updateDataSource(valueColumn, labelColumn);
  }

  private onDataGroupColumnChanged(columns: AdaptableBlotterColumn[]) {
    let valueColumn = this.state.PieChartDefinition.SecondaryColumnId;
    let labelColumn: string = null;
    if (columns.length > 0) {
      labelColumn = columns[0].ColumnId;
    }
    this.updateDataSource(valueColumn, labelColumn);
  }

  private updateDataSource(valueColumn: string, labelColumn: string, primaryKeyValues?: any[]) {
    let pieChartDefinition: PieChartDefinition = this.state.PieChartDefinition;
    pieChartDefinition.PrimaryColumnId = labelColumn;
    pieChartDefinition.SecondaryColumnId = valueColumn;
    if (ArrayExtensions.IsNotNullOrEmpty(primaryKeyValues)) {
      pieChartDefinition.PrimaryKeyValues = primaryKeyValues;
    }

    let chartData: ChartData = this.props.Blotter.ChartService.BuildPieChartData(
      pieChartDefinition
    );
    let dataSource: PieChartDataItem[] = chartData.Data;
    let errorMessage: string = chartData.ErrorMessage;
    dataSource = PieChartUIHelper.sortDataSource(this.state.SliceSortOption, dataSource);

    this.setState({
      PieChartDefinition: pieChartDefinition,
      DataSource: dataSource,
      ErrorMessage: errorMessage,
      // making sure the first and last slice do not have the same brush
      SliceBrushes:
        dataSource.length % 2 == 0
          ? PieChartUIHelper.getBrushesOdd()
          : PieChartUIHelper.getBrushesEven(),
    });
  }

  public onDoughnutChartRef(doughnutChart: IgrDoughnutChart) {
    this.doughnutChart = doughnutChart;
    if (this.doughnutLegend && this.doughnutChart) {
      this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
    }
  }

  public onPieChartRef(pieChart: IgrPieChart) {
    this.pieChart = pieChart;
    if (this.pieChartLegend && this.pieChart) {
      this.pieChart.legend = this.pieChartLegend;
    }
  }

  public onDoughnutLegendRef(legend: IgrItemLegend) {
    this.doughnutLegend = legend;
    if (this.doughnutChart) {
      this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
    }
  }

  public onPieChartLegendRef(legend: IgrItemLegend) {
    this.pieChartLegend = legend;
    if (this.pieChart) {
      this.pieChart.legend = this.pieChartLegend;
    }
  }

  private onOthersCategoryThresholdChanged = (e: any) => {
    this.setState({ OthersCategoryThreshold: e.target.value } as PieChartPopupState);
  };

  private onShowDoughnutChanged(checked: boolean) {
    this.setState({ ShowAsDoughnut: checked } as PieChartPopupState);
  }

  private onThresholdAsPercentChanged(checked: boolean) {
    let e = event.target as HTMLInputElement;
    let othersCategoryType: OthersCategoryType = checked
      ? OthersCategoryType.Percent
      : OthersCategoryType.Number;
    this.setState({ OthersCategoryType: othersCategoryType } as PieChartPopupState);
  }

  onSliceLabelsPositionChanged(value: string) {
    this.setState({ SliceLabelsPosition: value } as PieChartPopupState);
  }
  onSliceLabelsMappingChanged(value: string) {
    let labelMapping = value;
    let legendMapping = labelMapping.includes('Ratio') ? 'RatioAndName' : 'ValueAndName';
    this.setState({
      SliceLabelsMapping: labelMapping,
      SliceLegendMapping: legendMapping,
    } as PieChartPopupState);
  }

  onSliceValuesMappingChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ SliceValuesMapping: e.value } as PieChartPopupState);
  }

  onSliceSortByColumnChanged(value: string) {
    let sliceSortOption: SliceSortOption = value as SliceSortOption;
    let oldData = this.state.DataSource;
    let newData: PieChartDataItem[] = PieChartUIHelper.sortDataSource(sliceSortOption, oldData);

    this.setState({ DataSource: newData, SliceSortOption: sliceSortOption });
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export let PieChartPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(PieChartPopupComponent);
