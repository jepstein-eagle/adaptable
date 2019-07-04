function NumberFormula({ config, setConfig }) {
  return (
    <input
      type="number"
      value={config.value}
      onChange={e => {
        setConfig({
          ...config,
          value: Number(e.target.value),
        });
      }}
    />
  );
}

export default {
  label: 'Number',
  component: NumberFormula,
  getDefaultConfig() {
    return { type: 'number', value: 0 };
  },
  computeResult(config) {
    return config.value;
  },
};
