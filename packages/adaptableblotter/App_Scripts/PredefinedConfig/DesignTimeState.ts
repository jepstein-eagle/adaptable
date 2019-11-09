import { ConfigState } from './ConfigState';

/**
 * Interface for State elements which are **created only at Design time** through Predefined Config.
 *
 * Objects that implement this Interface are never created nor modified by Users at Run Time in the Adaptable Blotter.
 */
export interface DesignTimeState extends ConfigState {}
