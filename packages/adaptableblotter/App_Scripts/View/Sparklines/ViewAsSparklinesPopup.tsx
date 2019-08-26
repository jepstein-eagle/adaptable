import * as React from 'react';
import { connect } from 'react-redux';

import { SelectionMode } from '../../PredefinedConfig/Common/Enums';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../Components/Selectors/ColumnSelector';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';

import {
  ChartData,
  SparklinesChartDefinition,
} from '../../PredefinedConfig/RunTimeState/ChartState';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { Flex, Text } from 'rebass';
import ErrorBox from '../../components/ErrorBox';
import Panel from '../../components/Panel';
import ChartContainer from '../../components/ChartContainer';
import SparklineChart from '../../components/SparklineChart';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';

interface ViewAsSparklinesPopupProps
  extends StrategyViewPopupProps<ViewAsSparklinesPopupComponent> {}

interface ViewAsSparklinesPopupState {
  SparklinesChartDefinition: SparklinesChartDefinition;

  ErrorMessage: string;
  DataSource: number[];
}

class ViewAsSparklinesPopupComponent extends React.Component<
  ViewAsSparklinesPopupProps,
  ViewAsSparklinesPopupState
> {
  constructor(props: ViewAsSparklinesPopupProps) {
    super(props);
    this.state = {
      SparklinesChartDefinition: ObjectFactory.CreateEmptySparklinesChartDefinition(),
      ErrorMessage: null,
      DataSource: null,
    };
  }

  componentDidMount() {
    const column = this.props.PopupParams;
    if (StringExtensions.IsNotNullOrEmpty(column)) {
      this.updateDataSource(column);
    }
  }

  hasValidDataSelection(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.SparklinesChartDefinition.ColumnId);
  }

  render() {
    let infoBody: any[] = ['See all the values in the selected column as a sparkline chart'];

    let settingsBlock = (
      <Panel
        header={'Settings'}
        bodyScroll
        style={{
          borderTop: 0,
          borderRight: 0,
          borderBottom: 0,
          height: '100%',
        }}
        bodyProps={{
          padding: 0,
        }}
      ></Panel>
    );

    let chartBlock = (
      <ChartContainer
        sizeAsString={false}
        flexDirection={'column'}
        settingsPanel={settingsBlock}
        style={{
          padding: 'var(--ab-space-2)',
        }}
        chart={<SparklineChart values={this.state.DataSource || []} />}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithImage
          header={StrategyConstants.SparklinesStrategyName}
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
              SelectedColumnIds={[this.state.SparklinesChartDefinition.ColumnId]}
              SelectionMode={SelectionMode.Single}
              ColumnList={ColumnHelper.getNumericColumns(this.props.Columns)}
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

  private onDataColumnChanged(columns: IColumn[]) {
    let columnId = this.state.SparklinesChartDefinition.ColumnId;
    if (columns.length > 0) {
      columnId = columns[0].ColumnId;
    }
    this.updateDataSource(columnId);
  }

  private updateDataSource(columnId: string) {
    let sparklinesChartDefinition: SparklinesChartDefinition = this.state.SparklinesChartDefinition;

    sparklinesChartDefinition = { ...sparklinesChartDefinition, ColumnId: columnId };

    let chartData: ChartData = this.props.Blotter.ChartService.BuildSparklinesChartData(
      sparklinesChartDefinition
    );
    let dataSource: number[] = chartData.Data;
    let errorMessage: string = chartData.ErrorMessage;

    this.setState({
      SparklinesChartDefinition: sparklinesChartDefinition,
      DataSource: dataSource,
      ErrorMessage: errorMessage,
    });
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export let ViewAsSparklinesPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewAsSparklinesPopupComponent);
