import Modal from '../../../../src/components/Modal';

import '../../../../src/components/Modal/base.scss';
import '../../../../src/components/Modal/style.scss';

import React, { useState } from 'react';

export default () => {
  if (!global.document) {
    return null;
  }

  const [arr, setArr] = useState<number[]>([]);
  const add = () => {
    const len = arr.length;
    setArr([...arr, len]);
  };
  const remove = () => {
    const newArr = [...arr];
    newArr.pop();
    setArr(newArr);
  };
  return (
    <div>
      <button onClick={add}>add modal</button> - {arr.length}
      {arr.map(k => {
        console.log(k);
        return (
          <Modal key={k} isOpen={true} style={{ border: '1px solid red' }} baseZIndex={1000 * k}>
            modal content here {k}
            <button>xxx</button>
            <button onClick={add}>add modal</button> - {arr.length}
            <button onClick={remove}>remove modal</button> - {arr.length}
          </Modal>
        );
      })}
    </div>
  );
};
