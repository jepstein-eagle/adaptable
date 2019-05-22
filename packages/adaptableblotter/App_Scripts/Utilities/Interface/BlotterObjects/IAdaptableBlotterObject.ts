import { TypeUuid } from '../../Uuid';

/**
 * The base empty Adaptable Blotter Object interface
 * Contains a single 'Uuid' property which uniquely identifies the object
 * Note: this property is assigned by the adaptable blotter when the object is created
 * (If using Predefined Config) it is assigned before the Confg is read
 */
export interface IAdaptableBlotterObject {
  Uuid?: TypeUuid;
}
