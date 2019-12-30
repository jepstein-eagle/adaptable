import { ConfigState } from './ConfigState';

/**
 * Interface for System related State elements
 * This is created by the system at run-time and NOT part of predefined or user config.
 * Therefore it is not saved nor included in State events
 */
export interface InternalState extends ConfigState {}
