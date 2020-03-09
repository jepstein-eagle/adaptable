import { v4 as uuidv4 } from 'uuid';

export type TypeUuid = string;

export const createUuid = (): TypeUuid => uuidv4();
