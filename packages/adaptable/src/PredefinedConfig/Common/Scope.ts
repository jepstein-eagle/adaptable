export type ScopeDataType = 'String' | 'Number' | 'Boolean' | 'Date';

export type ScopeAll = {
  All: true;
};

export type ScopeDataTypes = {
  DataTypes: ScopeDataType[];
};

export type ScopeColumnIds = {
  ColumnIds: string[];
};

export type Scope = ScopeAll | ScopeDataTypes | ScopeColumnIds;

export type FunctionScope = 'filter' | 'alert' | 'validation' | 'conditionalstyle';
