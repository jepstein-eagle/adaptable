import { AdaptablePlugin, IAdaptable, AdaptableOptions } from '@adaptabletools/adaptable/types';

class FinancePlugin extends AdaptablePlugin {
  afterInitOptions(adaptable: IAdaptable, adaptableOptions: AdaptableOptions) {}
}

export default () => new FinancePlugin();
