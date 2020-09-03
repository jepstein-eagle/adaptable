import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';
import { AdaptableOptions } from '@adaptabletools/adaptable/src/AdaptableOptions/AdaptableOptions';
import { DetailCellRenderer } from './DetailCellRenderer';
import { MasterDetailAgGridPluginOptions } from '@adaptabletools/adaptable/src/AdaptableOptions/MasterDetailAgGridPluginOptions';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-master-detail-aggrid" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

class MasterDetailAgGridPlugin extends AdaptablePlugin {
  public pluginOptions: MasterDetailAgGridPluginOptions;
  public pluginId: string = 'master-detail-aggrid';

  constructor(pluginOptions?: MasterDetailAgGridPluginOptions) {
    super(pluginOptions);
    this.pluginOptions = pluginOptions;
  }

  beforeInit(adaptableOptions: AdaptableOptions) {
    adaptableOptions.vendorGrid.detailCellRenderer = 'adaptableDetailCellRenderer';
    adaptableOptions.vendorGrid.components = adaptableOptions.vendorGrid.components || {};
    adaptableOptions.vendorGrid.components.adaptableDetailCellRenderer = DetailCellRenderer;
  }
}

export default (pluginOptions?: MasterDetailAgGridPluginOptions) =>
  new MasterDetailAgGridPlugin(pluginOptions);
