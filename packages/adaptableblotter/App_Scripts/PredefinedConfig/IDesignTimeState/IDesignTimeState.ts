import { IState } from '../IState';

/**
 * Interface for State elements which are provided ONLY at Design time and NEVER modified by Users in the Blotter
 */
export interface IDesignTimeState extends IState {}
