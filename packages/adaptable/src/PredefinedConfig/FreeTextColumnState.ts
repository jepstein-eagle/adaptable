import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the `FreeTextColumn` function.
 *
 * Each [[FreeTextColumn]] contains a ColumnId, a default value and FreeTextStoredValues (which will typically be added by users at run time).
 */

export interface FreeTextColumnState extends ConfigState {
  FreeTextColumns?: FreeTextColumn[];
}

export interface FreeTextColumn extends AdaptableObject {
  ColumnId: string;
  DefaultValue: any;
  FreeTextStoredValues: FreeTextStoredValue[];
  TextEditor?: 'Inline' | 'Large';
}

export interface FreeTextStoredValue {
  PrimaryKey: any;
  FreeText: any;
}
