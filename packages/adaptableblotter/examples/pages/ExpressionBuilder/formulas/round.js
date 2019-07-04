import Builder from '../Builder';

function RoundBuilder({ config, setConfig }) {
  return (
    <>
      <div class="flex mb-1">
        <div style={{ width: '70px' }}>amount</div>
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
        <div style={{ width: '70px' }}>precision</div>
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
    </>
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
