import { ConfigState } from './ConfigState';

/**
 * Interface for State (i.e. Predefined Config) elements which the **User is able to modify at run-time** through using the Adaptable.
 *
 * Objects that implement this interface will either be created naturally during Application use (e.g. when the User runs a Quick Search) or can be provided at Design Time through Predefined Config
 */
export interface RunTimeState extends ConfigState {}
