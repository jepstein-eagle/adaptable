import Builder from '../Builder';

function SumBuilder({ config, setConfig }) {
  return (
    <div>
      {config.values.map((value, index) => (
        <div key={index} className="flex mb-1">
          <Builder
            config={value}
            setConfig={newValue => {
              setConfig({
                ...config,
                values: config.values.map((oldValue, i) => (i === index ? newValue : oldValue)),
              });
            }}
          />
          <button
            style={{ alignSelf: 'stretch' }}
            onClick={() => {
              setConfig({
                ...config,
                values: [...config.values].filter((_, i) => i !== index),
              });
            }}
          >
            -
          </button>
        </div>
      ))}
      <button
        class="full-width"
        onClick={() => {
          setConfig({
            ...config,
            values: [...config.values, null],
          });
        }}
      >
        Add
      </button>
    </div>
  );
}

export default {
  label: 'Sum',
  component: SumBuilder,
  getDefaultConfig() {
    return { type: 'sum', values: [null, null] };
  },
  computeResult(config, data, compute) {
    return config.values.reduce((sum, value) => sum + compute(value, data), 0);
  },
};
