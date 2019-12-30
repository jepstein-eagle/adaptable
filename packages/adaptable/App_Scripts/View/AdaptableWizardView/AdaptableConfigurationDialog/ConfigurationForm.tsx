import * as React from 'react';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import { AdaptableOptions } from '../../../types';
import CheckBox from '../../../components/CheckBox';
import { FilterOptions } from '../../../AdaptableOptions/FilterOptions';
import { LayoutOptions } from '../../../AdaptableOptions/LayoutOptions';
import { GridOptions } from 'ag-grid-community';
import HelpBlock from '../../../components/HelpBlock';
import { ConfigServerOptions } from '../../../AdaptableOptions/ConfigServerOptions';
import Input from '../../../components/Input';
import { GeneralOptions } from '../../../AdaptableOptions/GeneralOptions';
import { QueryOptions } from '../../../AdaptableOptions/QueryOptions';
import { ChartOptions } from '../../../AdaptableOptions/ChartOptions';
import { Flex, Text } from 'rebass';
import { DefaultAdaptableOptions } from '../../../Utilities/Defaults/DefaultAdaptableOptions';
import { UserInterfaceOptions } from '../../../AdaptableOptions/UserInterfaceOptions';

interface ConfigurationFormOptions {
  adaptableOptions: AdaptableOptions;
  onChangeadaptableOptions: (adaptableOptions: AdaptableOptions) => void;
}

const ConfigurationForm = (props: ConfigurationFormOptions) => {
  let abOptions = props.adaptableOptions;

  const filterOptions: FilterOptions = {
    ...DefaultAdaptableOptions.filterOptions,
    ...abOptions.filterOptions,
  };

  const layoutOptions: LayoutOptions = {
    ...DefaultAdaptableOptions.layoutOptions,
    ...abOptions.layoutOptions,
  };

  const generalOptions: GeneralOptions = {
    ...DefaultAdaptableOptions.generalOptions,
    ...abOptions.generalOptions,
  };

  const userInterfaceOptions: UserInterfaceOptions = {
    ...DefaultAdaptableOptions.userInterfaceOptions,
    ...abOptions.userInterfaceOptions,
  };

  const queryOptions: QueryOptions = {
    ...DefaultAdaptableOptions.queryOptions,
    ...abOptions.queryOptions,
  };

  const configServerOptions: ConfigServerOptions = {
    ...DefaultAdaptableOptions.configServerOptions,
    ...abOptions.configServerOptions,
  };

  const chartOptions: ChartOptions = {
    ...DefaultAdaptableOptions.chartOptions,
    ...abOptions.chartOptions,
  };

  // we are 'hard-coding' this to use ag-Grid but so does helper so ok for now and we can refactor when Adaptable Grid is ready
  const vendorGrid: GridOptions = {
    ...DefaultAdaptableOptions.vendorGrid,
    ...abOptions.vendorGrid,
  };

  return (
    <>
      <HelpBlock>General Options</HelpBlock>
      <FormLayout
        margin={2}
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Use Default Vendor Grid Themes">
          <CheckBox
            checked={userInterfaceOptions.useDefaultVendorGridThemes}
            onChange={(useDefaultVendorGridThemes: boolean) => {
              abOptions = { ...abOptions };
              abOptions.userInterfaceOptions = { ...abOptions.userInterfaceOptions };
              abOptions.userInterfaceOptions.useDefaultVendorGridThemes = useDefaultVendorGridThemes;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Show Missing Primary Key Warning">
          <CheckBox
            checked={generalOptions.showMissingPrimaryKeyWarning}
            onChange={(showMissingPrimaryKeyWarning: boolean) => {
              abOptions = { ...abOptions };
              abOptions.generalOptions = { ...abOptions.generalOptions };
              abOptions.generalOptions.showMissingPrimaryKeyWarning = showMissingPrimaryKeyWarning;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Prevent Duplicate Primary Key Values">
          <CheckBox
            checked={generalOptions.preventDuplicatePrimaryKeyValues}
            onChange={(preventDuplicatePrimaryKeyValues: boolean) => {
              abOptions = { ...abOptions };
              abOptions.generalOptions = { ...abOptions.generalOptions };
              abOptions.generalOptions.preventDuplicatePrimaryKeyValues = preventDuplicatePrimaryKeyValues;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        {/* 
        <FormRow label="Show Adaptable Tool Panel">
          <CheckBox
            checked={userInterfaceOptions.showAdaptableToolPanel}
            onChange={(showAdaptableToolPanel: boolean) => {
              abOptions = { ...abOptions };
              abOptions.userInterfaceOptions = { ...abOptions.userInterfaceOptions };
              abOptions.userInterfaceOptions.showAdaptableToolPanel = showAdaptableToolPanel;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
          */}
      </FormLayout>

      <HelpBlock>Grid Options</HelpBlock>
      <FormLayout
        margin={2}
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Enable Range Selection">
          <CheckBox
            checked={vendorGrid.enableRangeSelection}
            onChange={(enableRangeSelection: boolean) => {
              abOptions = { ...abOptions };
              abOptions.vendorGrid = { ...abOptions.vendorGrid };
              abOptions.vendorGrid.enableRangeSelection = enableRangeSelection;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Show Quick Filter">
          <CheckBox
            checked={vendorGrid.floatingFilter}
            onChange={(floatingFilter: boolean) => {
              abOptions = { ...abOptions };
              abOptions.vendorGrid = { ...abOptions.vendorGrid };
              abOptions.vendorGrid.floatingFilter = floatingFilter;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Suppress Column Virtualisation">
          <CheckBox
            checked={vendorGrid.suppressColumnVirtualisation}
            onChange={(suppressColumnVirtualisation: boolean) => {
              abOptions = { ...abOptions };
              abOptions.vendorGrid = { ...abOptions.vendorGrid };
              abOptions.vendorGrid.suppressColumnVirtualisation = suppressColumnVirtualisation;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Show Column Menu Button">
          <CheckBox
            checked={vendorGrid.suppressMenuHide}
            onChange={(suppressMenuHide: boolean) => {
              abOptions = { ...abOptions };
              abOptions.vendorGrid = { ...abOptions.vendorGrid };
              abOptions.vendorGrid.suppressMenuHide = suppressMenuHide;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>

      <HelpBlock>Filter Options</HelpBlock>
      <FormLayout
        margin={2}
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Use Vendor Filter Form Style">
          <CheckBox
            checked={filterOptions.useVendorFilterFormStyle}
            onChange={(useVendorFilterFormStyle: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.useVendorFilterFormStyle = useVendorFilterFormStyle;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>

        <FormRow label="Use Adaptable Quick Filter">
          <CheckBox
            checked={filterOptions.useAdaptableQuickFilter}
            onChange={(useAdaptableQuickFilter: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.useAdaptableQuickFilter = useAdaptableQuickFilter;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>

        <FormRow label="Use Adaptable Filter Form">
          <CheckBox
            checked={filterOptions.useAdaptableFilterForm}
            onChange={(useAdaptableFilterForm: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.useAdaptableFilterForm = useAdaptableFilterForm;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>

        <FormRow label="Indicate Filtered Columns">
          <CheckBox
            checked={filterOptions.indicateFilteredColumns}
            onChange={(indicateFilteredColumns: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.indicateFilteredColumns = indicateFilteredColumns;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>

        <FormRow label="Auto Apply Filter">
          <CheckBox
            checked={filterOptions.autoApplyFilter}
            onChange={(autoApplyFilter: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.autoApplyFilter = autoApplyFilter;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>

      <HelpBlock>Layout Options</HelpBlock>
      <FormLayout
        margin={2}
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Include Vendor State In Layouts">
          <CheckBox
            checked={layoutOptions.includeVendorStateInLayouts}
            onChange={(includeVendorStateInLayouts: boolean) => {
              abOptions = { ...abOptions };
              abOptions.layoutOptions = { ...abOptions.layoutOptions };
              abOptions.layoutOptions.includeVendorStateInLayouts = includeVendorStateInLayouts;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Auto Save Layouts">
          <CheckBox
            checked={layoutOptions.autoSaveLayouts}
            onChange={(autoSaveLayouts: boolean) => {
              abOptions = { ...abOptions };
              abOptions.layoutOptions = { ...abOptions.layoutOptions };
              abOptions.layoutOptions.autoSaveLayouts = autoSaveLayouts;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Auto Size Columns In Default Layout">
          <CheckBox
            checked={layoutOptions.autoSizeColumnsInLayout}
            onChange={(autoSizeColumnsInLayout: boolean) => {
              abOptions = { ...abOptions };
              abOptions.layoutOptions = { ...abOptions.layoutOptions };
              abOptions.layoutOptions.autoSizeColumnsInLayout = autoSizeColumnsInLayout;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>

      <HelpBlock>Query Options</HelpBlock>
      <FormLayout
        margin={2}
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Use Only Column Values In Queries">
          <CheckBox
            checked={queryOptions.columnValuesOnlyInQueries}
            onChange={(columnValuesOnlyInQueries: boolean) => {
              abOptions = { ...abOptions };
              abOptions.queryOptions = { ...abOptions.queryOptions };
              abOptions.queryOptions.columnValuesOnlyInQueries = columnValuesOnlyInQueries;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Ignore Case In Queries">
          <CheckBox
            checked={queryOptions.ignoreCaseInQueries}
            onChange={(ignoreCaseInQueries: boolean) => {
              abOptions = { ...abOptions };
              abOptions.queryOptions = { ...abOptions.queryOptions };
              abOptions.queryOptions.ignoreCaseInQueries = ignoreCaseInQueries;

              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>

      <Flex flexDirection="row" alignItems="center" margin={2}>
        <Text style={{ flex: 3 }} marginRight={2}>
          Max Column Value Items To Display
        </Text>

        <Flex flex={7} flexDirection="row" alignItems="center">
          <Input
            style={{ flex: 1 }}
            type="number"
            placeholder="Enter Number"
            onChange={(event: React.FormEvent<any>) => {
              let e = event.target as HTMLInputElement;
              let maxColumnValueItemsDisplayed: number = parseInt(e.value);
              abOptions = { ...abOptions };
              abOptions.queryOptions = { ...abOptions.queryOptions };
              abOptions.queryOptions.maxColumnValueItemsDisplayed = maxColumnValueItemsDisplayed;
              props.onChangeadaptableOptions(abOptions);
            }}
            value={queryOptions.maxColumnValueItemsDisplayed}
            marginRight={3}
          />
        </Flex>
      </Flex>

      <HelpBlock>Chart Options</HelpBlock>
      <FormLayout
        margin={2}
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Display Charts On StartUp">
          <CheckBox
            checked={chartOptions.displayOnStartUp}
            onChange={(displayOnStartUp: boolean) => {
              abOptions = { ...abOptions };
              abOptions.chartOptions = { ...abOptions.chartOptions };
              abOptions.chartOptions.displayOnStartUp = displayOnStartUp;
              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
        <FormRow label="Show Charts in Popup">
          <CheckBox
            checked={chartOptions.showModal}
            onChange={(showModal: boolean) => {
              abOptions = { ...abOptions };
              abOptions.chartOptions = { ...abOptions.chartOptions };
              abOptions.chartOptions.showModal = showModal;
              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>
      <Flex flexDirection="row" alignItems="center" margin={2}>
        <Text style={{ flex: 3 }} marginRight={2}>
          Pie Chart Maximum Items
        </Text>

        <Flex flex={7} flexDirection="row" alignItems="center">
          <Input
            style={{ flex: 1 }}
            type="number"
            placeholder="Enter Number"
            onChange={(event: React.FormEvent<any>) => {
              let e = event.target as HTMLInputElement;
              let pieChartMaxItems: number = parseInt(e.value);
              abOptions = { ...abOptions };
              abOptions.chartOptions = { ...abOptions.chartOptions };
              abOptions.chartOptions.pieChartMaxItems = pieChartMaxItems;
              props.onChangeadaptableOptions(abOptions);
            }}
            value={chartOptions.pieChartMaxItems}
            marginRight={3}
          />
        </Flex>
      </Flex>

      <HelpBlock>Config Server Options</HelpBlock>
      <FormLayout
        margin={2}
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Enable Config Server">
          <CheckBox
            checked={configServerOptions.enableConfigServer}
            onChange={(enableConfigServer: boolean) => {
              abOptions = { ...abOptions };
              abOptions.configServerOptions = { ...abOptions.configServerOptions };
              abOptions.configServerOptions.enableConfigServer = enableConfigServer;
              props.onChangeadaptableOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>
      <Flex flexDirection="row" alignItems="center" margin={2}>
        <Text style={{ flex: 3 }} marginRight={2}>
          Config Server Url
        </Text>

        <Flex flex={7} flexDirection="row" alignItems="center">
          <Input
            style={{ flex: 1 }}
            type="text"
            placeholder="Enter Text"
            onChange={(event: React.FormEvent<any>) => {
              let e = event.target as HTMLInputElement;
              let configServerUrl: string = e.value;
              abOptions = { ...abOptions };
              abOptions.configServerOptions = { ...abOptions.configServerOptions };
              abOptions.configServerOptions.configServerUrl = configServerUrl;
              props.onChangeadaptableOptions(abOptions);
            }}
            value={configServerOptions.configServerUrl}
            marginRight={3}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default ConfigurationForm;
