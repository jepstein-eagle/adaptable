export interface Scope {
  DataTypes?: ScopeDataTypes[];
  ColumnIds?: string[];
}

export type ScopeDataTypes = 'String' | 'Number' | 'Boolean' | 'Date';
