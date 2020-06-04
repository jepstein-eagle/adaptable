import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-openfin" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

const defaultOptions = {};
interface OpenfinPluginOptions {}
class OpenfinPlugin extends AdaptablePlugin {
  public options: OpenfinPluginOptions;
  public pluginId: string = 'openfin';

  constructor(options?: OpenfinPluginOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };
  }

  onAdaptableReady(adaptable: IAdaptable) {}
}

export default (options?: any) => new OpenfinPlugin(options);
