export type ScopeDataType = 'String' | 'Number' | 'Boolean' | 'Date';

export type ScopeDataTypes = {
  DataTypes: ScopeDataType[];
};

export type ScopeColumnIds = {
  ColumnIds?: string[];
};

export type Scope = ScopeDataTypes | ScopeColumnIds;
