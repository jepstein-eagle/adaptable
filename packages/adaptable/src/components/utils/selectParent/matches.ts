'use strict';

var proto = typeof Element === 'undefined' ? {} : (Element.prototype as any);

var nativeMatches =
  proto.matches ||
  proto.mozMatchesSelector ||
  proto.msMatchesSelector ||
  proto.oMatchesSelector ||
  proto.webkitMatchesSelector;

export default nativeMatches;
