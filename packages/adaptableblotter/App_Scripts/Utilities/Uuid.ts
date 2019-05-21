const uuidv4 = require('uuid/v4');

export type TypeUuid = string;

export const createUuid = (): TypeUuid => uuidv4();
