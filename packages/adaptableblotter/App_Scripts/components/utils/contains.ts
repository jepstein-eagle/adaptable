const DOCUMENT_POSITION_CONTAINED_BY = 16;

export default function contains(container: Element, elem: Element) {
  if (container === elem) {
    return true;
  }
  if (container.contains) {
    return container.contains(elem);
  }

  var comparison = container.compareDocumentPosition(elem);

  return comparison === 0 || comparison & DOCUMENT_POSITION_CONTAINED_BY;
}
