import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { DesignTimeState } from '../DesignTimeState/DesignTimeState';
import { Scope } from '../Scope';

export interface NamedFilterState extends DesignTimeState {
  NamedFilters?: NamedFilter[];
}

//export interface NamedFilterPredicate {
//  (record: any, columnId: string, cellValue: any): boolean;
//}

export interface NamedFilter extends AdaptableBlotterObject {
  Name: string;
  Scope: Scope;
  PredicateName: string;
}
/*
TODO: update this doc

Adaptable Blotter has 3 different types of configuration filters - ColumnFilters, UserFilters and SystemFilters.

The User Config section allows you add your own User Filters.

These will be used in other Expressions and made available in the Column Filter dropdown. For more details see User Filter.

A Filter Expression is a normal expression with the restrictions that it can only have one column condition, For instructions on how to write Expressions in config see Expression Object Config.

Table 25. UserFilter Configuration Properties

Property

Type

Comments

UserFilters

IUserFilter array

A collection of UserFilter objects.
*/
