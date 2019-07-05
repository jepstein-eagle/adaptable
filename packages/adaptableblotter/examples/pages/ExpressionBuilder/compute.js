import formulas from './formulas';

export default function compute(config, data) {
  // try {
  const type = config ? config.type : 'none';
  const formula = formulas[type];
  return formula.computeResult(config, data, compute);
  // } catch (e) {
  //   console.log(e);
  //   return 'error';
  // }
}
