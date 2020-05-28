import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-glue42" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

const defaultOptions = {};
interface Glue42PluginOptions {}
class Glue42Plugin extends AdaptablePlugin {
  public options: Glue42PluginOptions;
  public pluginId: string = 'glue42';

  constructor(options?: Glue42PluginOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };
  }

  onAdaptableReady(adaptable: IAdaptable) {}
}

export default (options?: any) => new Glue42Plugin(options);
