let scrollbarWidth: number;

export default (): number => {
  const globalObject = typeof globalThis !== 'undefined' ? globalThis : window;
  const document = globalObject ? globalObject.document : null;

  if (scrollbarWidth != null) {
    return scrollbarWidth;
  }

  let result: number;

  if (document) {
    const div = document.createElement('div');
    const elStyle = div.style;

    elStyle.position = 'absolute';
    elStyle.boxSizing = 'content-box';
    elStyle.width = '200px';
    elStyle.height = '200px';
    elStyle.top = '-99999px';
    elStyle.overflow = 'scroll';
    //@ts-ignore
    elStyle.MsOverflowStyle = 'scrollbar';

    document.body.appendChild(div);
    result = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  } else {
    result = 0;
  }

  return (scrollbarWidth = result);
};
