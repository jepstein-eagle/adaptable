import * as React from 'react';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import { AdaptableBlotterOptions } from '../../../types';
import CheckBox from '../../../components/CheckBox';
import { DefaultAdaptableBlotterOptions } from '../../../Utilities/Defaults/DefaultAdaptableBlotterOptions';
import { FilterOptions } from '../../../BlotterOptions/FilterOptions';
import { LayoutOptions } from '../../../BlotterOptions/LayoutOptions';
import { GridOptions } from 'ag-grid-community';

interface ConfigurationFormOptions {
  adaptableBlotterOptions: AdaptableBlotterOptions;
  onChangeBlotterOptions: (adaptableBlotterOptions: AdaptableBlotterOptions) => void;
}

const ConfigurationForm = (props: ConfigurationFormOptions) => {
  let abOptions = props.adaptableBlotterOptions;

  const filterOptions: FilterOptions = {
    ...DefaultAdaptableBlotterOptions.filterOptions,
    ...abOptions.filterOptions,
  };

  const layoutOptions: LayoutOptions = {
    ...DefaultAdaptableBlotterOptions.layoutOptions,
    ...abOptions.layoutOptions,
  };

  // we are 'hard-coding' this to use ag-Grid but so does helper so ok for now and we can refactor when Adaptable Grid is ready
  const vendorGrid: GridOptions = {
    ...DefaultAdaptableBlotterOptions.vendorGrid,
    ...abOptions.vendorGrid,
  };

  return (
    <>
      <div>
        <b>Filter Options:</b>
      </div>
      <FormLayout
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Use vendor filter form style">
          <CheckBox
            checked={filterOptions.useVendorFilterFormStyle}
            onChange={(useVendorFilterFormStyle: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.useVendorFilterFormStyle = useVendorFilterFormStyle;

              props.onChangeBlotterOptions(abOptions);
            }}
          />
        </FormRow>

        <FormRow label="Use adaptable blotter quick filter">
          <CheckBox
            checked={filterOptions.useAdaptableBlotterQuickFilter}
            onChange={(useAdaptableBlotterQuickFilter: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.useAdaptableBlotterQuickFilter = useAdaptableBlotterQuickFilter;

              props.onChangeBlotterOptions(abOptions);
            }}
          />
        </FormRow>

        <FormRow label="Indicate filtered columns">
          <CheckBox
            checked={filterOptions.indicateFilteredColumns}
            onChange={(indicateFilteredColumns: boolean) => {
              abOptions = { ...abOptions };
              abOptions.filterOptions = { ...abOptions.filterOptions };
              abOptions.filterOptions.indicateFilteredColumns = indicateFilteredColumns;

              props.onChangeBlotterOptions(abOptions);
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

              props.onChangeBlotterOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>

      <div>
        <b>Layout Options:</b>
      </div>
      <FormLayout
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Include Vendor State In Layouts">
          <CheckBox
            checked={layoutOptions.includeVendorStateInLayouts}
            onChange={(includeVendorStateInLayouts: boolean) => {
              abOptions = { ...abOptions };
              abOptions.layoutOptions = { ...abOptions.layoutOptions };
              abOptions.layoutOptions.includeVendorStateInLayouts = includeVendorStateInLayouts;

              props.onChangeBlotterOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>

      <div>
        <b>Grid Options:</b>
      </div>
      <FormLayout
        columns={[{ name: 'children' }, { name: 'label', style: { textAlign: 'start' } }]}
      >
        <FormRow label="Enable Range Selection">
          <CheckBox
            checked={vendorGrid.enableRangeSelection}
            onChange={(enableRangeSelection: boolean) => {
              abOptions = { ...abOptions };
              abOptions.vendorGrid = { ...abOptions.vendorGrid };
              abOptions.vendorGrid.enableRangeSelection = enableRangeSelection;

              props.onChangeBlotterOptions(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>
    </>
  );
};

export default ConfigurationForm;
