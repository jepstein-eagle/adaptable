import { DesignTimeState } from './DesignTimeState';

export interface SystemFilterState extends DesignTimeState {
  /*
  Which of the system's SystemFilters you wish to use. Provide an empty array if you want no system filters, or list the system filters you want. If this property is not provided then all the system filters are available.
  */
  SystemFilters?: string[];
}
