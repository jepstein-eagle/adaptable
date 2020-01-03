import { unstable_batchedUpdates } from 'react-dom';

export interface BatchUpdateQueue {
  (fn: () => void): void;
  commit: (lastFn?: () => void) => void;
}

const BatchUpdate = (fn?: () => void) => {
  let fns: (() => void)[] | undefined = [];

  if (fn) {
    fns.push(fn);
  }

  const didCommit = false;

  const queue = (fn: () => void) => {
    fns.push(fn);
  };

  queue.commit = (lastFn?: () => void) => {
    if (didCommit) {
      return;
    }
    if (lastFn) {
      fns.push(lastFn);
    }

    unstable_batchedUpdates(() => {
      fns.forEach(fn => fn());
      fns = undefined;
    });
  };

  return queue;
};

export default BatchUpdate;
