import ArrayBuilder from '../ArrayBuilder';

export default {
  label: 'Subtract',
  component: ArrayBuilder,
  getDefaultConfig() {
    return { type: 'subtract', values: [null, null] };
  },
  computeResult(config, data, compute) {
    const [first, ...values] = config.values;
    return values.reduce((result, value) => result - compute(value, data), compute(first, data));
  },
};
