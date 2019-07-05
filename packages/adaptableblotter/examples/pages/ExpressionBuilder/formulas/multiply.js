import ArrayBuilder from '../ArrayBuilder';

export default {
  label: 'Multiply',
  component: ArrayBuilder,
  getDefaultConfig() {
    return { type: 'multiply', values: [null, null] };
  },
  computeResult(config, data, compute) {
    return config.values.reduce((result, value) => result * compute(value, data), 1);
  },
};
