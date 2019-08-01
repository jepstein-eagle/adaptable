const selector = ['input', 'textarea', 'select', '[tabindex]', 'a[href]', 'button', 'object'].join(
  ', '
);

export default (node: Element): Element[] => {
  const children = [...(node.querySelectorAll(selector) as any)];

  // ensure they are all in the dom
  return children.filter(child => child.offsetParent);
};
