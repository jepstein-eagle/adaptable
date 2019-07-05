import NoneFormula from './none';
import ColumnFormula from './column';
import NumberFormula from './number';
import TextFormula from './text';
import BooleanFormula from './boolean';
import AddFormula from './add';
import SubtractFormula from './subtract';
import MultiplyFormula from './multiply';
import DivideFormula from './divide';
import MinFormula from './min';
import MaxFormula from './max';
import AverageFormula from './average';
import IfFormula from './if';
// import RoundFormula from './round';

export default {
  none: NoneFormula,
  column: ColumnFormula,
  add: AddFormula,
  subtract: SubtractFormula,
  multiply: MultiplyFormula,
  divide: DivideFormula,
  number: NumberFormula,
  text: TextFormula,
  boolean: BooleanFormula,
  min: MinFormula,
  max: MaxFormula,
  average: AverageFormula,
  if: IfFormula,
};
