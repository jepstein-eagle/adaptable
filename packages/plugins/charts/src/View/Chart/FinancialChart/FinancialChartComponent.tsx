import * as React from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts/ES2015/igr-financial-chart';
import { IgrFinancialChartModule } from 'igniteui-react-charts/ES2015/igr-financial-chart-module';

import {
  ChartProperties,
  FinancialChartDefinition,
  ChartData,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import HelpBlock from '@adaptabletools/adaptable/src/components/HelpBlock';
import { ChartContainer } from '@adaptabletools/adaptable/src/components/ChartContainer';

interface FinancialChartComponentProps {
  CurrentChartDefinition: FinancialChartDefinition;
  ChartData: ChartData;
}

export const FinancialChartComponent = React.memo((props: FinancialChartComponentProps) => {
  React.useMemo(() => {
    IgrFinancialChartModule.register();
  }, []);

  let chartTitle: string = props.CurrentChartDefinition.Name;
  if (StringExtensions.IsNotNullOrEmpty(props.CurrentChartDefinition.Description)) {
    chartTitle += ': ' + props.CurrentChartDefinition.Description;
  }

  const chartErrorMessage: string =
    props.ChartData != null && StringExtensions.IsNotNullOrEmpty(props.ChartData.ErrorMessage)
      ? props.ChartData.ErrorMessage
      : null;

  const chart = (
    <IgrFinancialChart dataSource={props.ChartData.Data} width={'400px'} height={'400px'} />
  );

  const chartElement =
    props.ChartData != null && chartErrorMessage == null ? (
      chart
    ) : (
      <HelpBlock>{chartErrorMessage}</HelpBlock>
    );

  return props.ChartData != null ? (
    <ChartContainer button={null} chart={chartElement} title={chartTitle} settingsPanel={null} />
  ) : null;
});
