function TextFormula({ config, setConfig }) {
  return (
    <input
      type="text"
      value={config.value}
      onChange={(e) => {
        setConfig({
          ...config,
          value: e.target.value,
        });
      }}
    />
  );
}

export default {
  label: 'Text',
  component: TextFormula,
  getDefaultConfig() {
    return { type: 'text', value: '' };
  },
  computeResult(config) {
    return config.value;
  },
};
