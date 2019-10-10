import * as React from 'react';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import { AdaptableBlotterOptions } from '../../../types';
import CheckBox from '../../../components/CheckBox';
import { DefaultAdaptableBlotterOptions } from '../../../Utilities/Defaults/DefaultAdaptableBlotterOptions';

interface ConfigurationFormOptions {
  adaptableBlotterOptions: AdaptableBlotterOptions;
  onChange: (adaptableBlotterOptions: AdaptableBlotterOptions) => void;
}
const ConfigurationForm = (props: ConfigurationFormOptions) => {
  let abOptions = props.adaptableBlotterOptions;

  const filterOptions = {
    ...DefaultAdaptableBlotterOptions.filterOptions,
    ...abOptions.filterOptions,
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

              props.onChange(abOptions);
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

              props.onChange(abOptions);
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

              props.onChange(abOptions);
            }}
          />
        </FormRow>
      </FormLayout>
    </>
  );
};

export default ConfigurationForm;
