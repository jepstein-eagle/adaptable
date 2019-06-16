import { TypeUuid } from './Uuid';

/**
 * The base empty Adaptable Blotter Object interface.
 * Contains a single 'Uuid' property which uniquely identifies the object.
 * Note: this property is assigned by the adaptable blotter when the object is created.
 * If the user has provided Predefined Config, the Uuid is assigned BEFORE the Config is read.
 */
export interface IAdaptableBlotterObject {
  Uuid?: TypeUuid;
}
