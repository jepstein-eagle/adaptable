import { createContext, useState } from 'react';
import './index.css';
import Builder from './Builder';
import compute from './compute';

const columns = [
  { name: 'orderId', label: 'Order ID' },
  { name: 'price', label: 'Price' },
  { name: 'inStock', label: 'In Stock' },
  { name: 'companyName', label: 'Company Name' },
];
const sampleData = {
  orderId: 5,
  price: 12.9,
  inStock: true,
  companyName: 'AB',
};
export const ExpressionContext = createContext('expression');

function Root() {
  const [config, setConfig] = useState({
    type: 'if',
    operator: '=',
    operand1: {
      type: 'column',
      value: 'inStock',
    },
    operand2: {
      type: 'boolean',
      checked: true,
    },
    trueValue: {
      type: 'text',
      value: 'green',
    },
    falseValue: {
      type: 'text',
      value: 'red',
    },
  });
  // const [config, setConfig] = useState({
  //   type: 'min',
  //   values: [
  //     {
  //       type: 'multiply',
  //       values: [
  //         {
  //           type: 'column',
  //           value: 'price',
  //         },
  //         {
  //           type: 'number',
  //           value: 2,
  //         },
  //       ],
  //     },
  //     {
  //       type: 'number',
  //       value: 100,
  //     },
  //   ],
  // });
  return (
    <ExpressionContext.Provider value={{ columns }}>
      <Builder config={config} setConfig={setConfig} />
      <pre>result = {String(compute(config, sampleData))}</pre>
      <pre>expression = {JSON.stringify(config, 0, 2)}</pre>
      <pre>data = {JSON.stringify(sampleData, 0, 2)}</pre>
    </ExpressionContext.Provider>
  );
}

export default Root;
