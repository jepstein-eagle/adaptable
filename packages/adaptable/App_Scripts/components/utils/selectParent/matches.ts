'use strict';

var proto = Element.prototype as any;

var nativeMatches =
  proto.matches ||
  proto.mozMatchesSelector ||
  proto.msMatchesSelector ||
  proto.oMatchesSelector ||
  proto.webkitMatchesSelector;

export default nativeMatches;
