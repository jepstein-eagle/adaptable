import ArrayBuilder from '../ArrayBuilder';

export default {
  label: 'Add',
  component: ArrayBuilder,
  getDefaultConfig() {
    return { type: 'add', values: [null, null] };
  },
  computeResult(config, data, compute) {
    return config.values.reduce((result, value) => result + compute(value, data), 0);
  },
};
