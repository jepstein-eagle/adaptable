import Builder from '../Builder';

function RoundBuilder({ config, setConfig }) {
  return (
    <div class="box">
      <div class="flex" style={{ marginBottom: '6px' }}>
        <div style={{ width: '60px' }}>amount</div>
        <Builder
          config={config.amount}
          setConfig={amount => {
            setConfig({
              ...config,
              amount,
            });
          }}
        />
      </div>
      <div class="flex">
        <div style={{ width: '60px' }}>precision</div>
        <Builder
          config={config.precision}
          setConfig={precision => {
            setConfig({
              ...config,
              precision,
            });
          }}
        />
      </div>
    </div>
  );
}

export default {
  label: 'Round',
  component: RoundBuilder,
  getDefaultConfig() {
    return {
      type: 'round',
      amount: null,
      precision: null,
    };
  },
  computeResult(config, data, compute) {
    const amount = compute(config.amount, data);
    const precision = compute(config.precision, data);
    return amount.toFixed(precision);
  },
};
