export function getCurrentToken(tokens: Token[], offset: number) {
  return (
    tokens.find(({ range }) => range[0] <= offset && range[1] > offset) ||
    tokens.find(({ range }) => range[1] == offset)
  );
}

export function walker(node: any, callback: (node: any) => void): any {
  if (
    typeof node === 'boolean' ||
    typeof node === 'number' ||
    typeof node === 'string'
  ) {
    return;
  }

  if (Array.isArray(node)) {
    return node.map((n: any) => walker(n, callback));
  }

  // isObject
  node.args.map((n: any) => walker(n, callback));
  callback(node);
}

export function findPathTo(node: any, offset: number) {
  const path: any[] = [];

  walker(node, node => {
    if (node.range[0] <= offset && node.range[1] >= offset) {
      path.push(node);
    }
  });

  return path;
}
