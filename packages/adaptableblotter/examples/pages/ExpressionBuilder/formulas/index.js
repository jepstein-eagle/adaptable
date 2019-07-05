import NoneFormula from './none';
import ColumnFormula from './column';
import NumberFormula from './number';
import AddFormula from './add';
import SubtractFormula from './subtract';
import MultiplyFormula from './multiply';
import DivideFormula from './divide';
import MinFormula from './min';
import MaxFormula from './max';
import AverageFormula from './average';
// import RoundFormula from './round';

export default {
  none: NoneFormula,
  column: ColumnFormula,
  add: AddFormula,
  subtract: SubtractFormula,
  multiply: MultiplyFormula,
  divide: DivideFormula,
  number: NumberFormula,
  min: MinFormula,
  max: MaxFormula,
  average: AverageFormula,
};
