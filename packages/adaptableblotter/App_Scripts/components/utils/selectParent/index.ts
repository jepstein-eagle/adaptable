import matches from './matches';

export default (selector: string, node: any): HTMLElement | null => {
  if (!node) {
    return null;
  }

  while ((node = node.parentElement)) {
    if (matches.call(node, selector)) {
      return node;
    }
  }
  return null;
};
