/**
 * Any filters in the expression, grouped by column.
 *
 * There are 3 types of Filter that can be included here:
 *
 * User Filters - created by the User at RunTime and saved for re-use
 *
 * System Filters - provided by the Adaptable Blotter (e.g. 'Today', 'Positive', 'Blanks' etc.)
 *
 * Named Filters - created by developers at Design Time (who provide in Adavnced Options the function that will be applied).
 */
export interface FilterExpression {
  /**
   * The Column which has the Filters applied
   */
  ColumnId: string;

  /**
   * The **names** of the Filters which will be applied
   */
  Filters: string[];
}
