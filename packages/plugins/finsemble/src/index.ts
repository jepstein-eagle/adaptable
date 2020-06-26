import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-finsemble" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

const defaultOptions = {};
interface FinsemblePluginOptions {}
class FinsemblePlugin extends AdaptablePlugin {
  public options: FinsemblePluginOptions;
  public pluginId: string = 'finsemble';

  constructor(options?: FinsemblePluginOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };
  }

  onAdaptableReady(adaptable: IAdaptable) {}
}

export default (options?: FinsemblePluginOptions) => new FinsemblePlugin(options);
