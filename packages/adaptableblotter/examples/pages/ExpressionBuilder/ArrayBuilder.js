import Builder from './Builder';

function ArrayBuilder({ config, setConfig }) {
  return (
    <div className="box">
      {config.values.map((value, index) => (
        <div
          key={index}
          className="flex"
          style={{ background: index % 2 ? '#f0f0f0' : '#fff', padding: '10px' }}
        >
          <span style={{ marginRight: '5px' }}>{index + 1}</span>
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
            style={{ marginLeft: '5px' }}
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
        className="add"
        onClick={() => {
          setConfig({
            ...config,
            values: [...config.values, null],
          });
        }}
      >
        + Add
      </button>
    </div>
  );
}

export default ArrayBuilder;
