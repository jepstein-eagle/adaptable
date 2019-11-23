import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { AB_HEADER } from '../../Utilities/Constants/StyleConstants';
import { AdaptableBlotterObject } from '../../PredefinedConfig/Common/AdaptableBlotterObject';

export function CreateStyleName(strategyId: string, blotter: IAdaptableBlotter): string {
  return (
    AB_HEADER +
    strategyId +
    '-' +
    blotter.blotterOptions.blotterId
      .trim()
      .replace(/\s/g, '')
      .replace('.', '')
  );
}

export function CreateUniqueStyleName(
  strategyId: string,
  blotter: IAdaptableBlotter,
  adaqptableBlotterObject: AdaptableBlotterObject
): string {
  return (
    AB_HEADER +
    strategyId +
    '-' +
    blotter.blotterOptions.blotterId
      .trim()
      .replace(/\s/g, '')
      .replace('.', '') +
    '-' +
    adaqptableBlotterObject.Uuid
  );
}
export const StyleHelper = {
  CreateStyleName,
  CreateUniqueStyleName,
};
export default StyleHelper;
