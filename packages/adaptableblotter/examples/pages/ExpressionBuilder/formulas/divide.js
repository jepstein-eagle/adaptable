import ArrayBuilder from '../ArrayBuilder';

export default {
  label: 'Divide',
  component: ArrayBuilder,
  getDefaultConfig() {
    return { type: 'divide', values: [null, null] };
  },
  computeResult(config, data, compute) {
    const [first, ...values] = config.values;
    return values.reduce((result, value) => result / compute(value, data), compute(first, data));
  },
};
