import { AdaptablePlugin, IAdaptable, AdaptableApi } from '@adaptabletools/adaptable/types';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { CellSummaryOperationDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/CellSummaryState';
import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';
import { AdaptableOptions } from '@adaptabletools/adaptable/src/AdaptableOptions/AdaptableOptions';
import { DetailCellRenderer } from './DetailCellRenderer';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-master-detail-aggrid" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

interface DetailAdaptableOptions extends AdaptableOptions {}

interface MasterDetailAgGridPluginOptions {
  adaptableOptions: DetailAdaptableOptions;
  onDetailInit?: (api: AdaptableApi) => void;
}

class MasterDetailAgGridPlugin extends AdaptablePlugin {
  public options: MasterDetailAgGridPluginOptions;
  public pluginId: string = 'master-detail-aggrid';

  constructor(options?: MasterDetailAgGridPluginOptions) {
    super(options);
    this.options = options;
  }

  beforeInit(adaptableOptions: AdaptableOptions) {
    adaptableOptions.vendorGrid.detailCellRenderer = 'adaptableDetailCellRenderer';
    adaptableOptions.vendorGrid.components = adaptableOptions.vendorGrid.components || {};
    adaptableOptions.vendorGrid.components.adaptableDetailCellRenderer = DetailCellRenderer;
  }
}

export default (options?: MasterDetailAgGridPluginOptions) => new MasterDetailAgGridPlugin(options);
