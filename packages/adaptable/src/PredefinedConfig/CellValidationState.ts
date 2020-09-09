import { ConfigState } from './ConfigState';
import { QueryObject } from './Common/QueryObject';
import { AdaptablePredicate } from './Common/AdaptablePredicate';
import { Scope } from '../types';
import { TypeHint } from './Common/Types';

/**
 * The Predefined Configuration for the Cell Validation function
 *
 * Cell Validation Rules will triggered when the user makes an edit that contravenes the logic in the Rule
 *
 * You can select whether edit will be disallowed or to display a warning (that can be ignored).
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Cell Validation Demo](https://demo.adaptabletools.com/edit/aggridcellvalidationdemo)
 *
 * - {@link CellValidationApi|Cell Validation Api}
 *
 * - [Cell Validation Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/cell-validation-function.md)
 *
 * --------------
 *
 */
export interface CellValidationState extends ConfigState {
  CellValidations?: CellValidationRule[];
}

/**
 * The Cell Validation Rule object used in the Cell Validation function.
 *
 * See {@link CellValidationState|Cell Validation State} for how to use this object.
 */
export interface CellValidationRule extends QueryObject {
  /**
   * Where the `CellValidationRule` can be triggered - can be one, some or all Columns in the row
   *
   * Or can be all Colunns of a  given DataType(s)
   */

  Scope: Scope;

  /**
   * The logic to use for triggering a `CellValidationRule`.
   *
   * The Predicate will include a type (e.g. 'GreaterThan' and potentially inputs (e.g. '20'))
   *
   * Note that there is also an optional Expression / Shared Query that can be set.  This is to be used **in addition to the predicate** for more advanced scenarios
   */

  Predicate: CellValidationRulePredicate;

  /**
   * What happens when the Rule is triggered.   There are 2 possibilities:
   *
   * - 'Warn User' - this allows the user to continue with the edit (after providing a reason)
   *
   * - 'Stop Edit' - this will prevent the edit from happening and the cell will revert to its pre-edited value
   **/
  ActionMode: 'Warn User' | 'Stop Edit';
}

export interface CellValidationRulePredicate extends AdaptablePredicate {
  PredicateId: TypeHint<string, SystemValidationPredicateId>;
}

type SystemValidationPredicateId = 'Blanks' | 'NonBlanks';
