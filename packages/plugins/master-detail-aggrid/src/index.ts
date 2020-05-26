import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { CellSummaryOperationDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/CellSummaryState';
import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';
import {
  DetailAdaptableOptions,
  AdaptableOptions,
} from '@adaptabletools/adaptable/src/AdaptableOptions/AdaptableOptions';
import { DetailCellRenderer } from './DetailCellRenderer';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-finance" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

interface MasterDetailAgGridPluginOptions extends DetailAdaptableOptions {}

class MasterDetailAgGridPlugin extends AdaptablePlugin {
  public options: MasterDetailAgGridPluginOptions;
  public pluginId: string = 'master-detail-aggrid';

  constructor(options?: MasterDetailAgGridPluginOptions) {
    super(options);
    this.options = options;
  }

  beforeInit(adaptableOptions: AdaptableOptions) {
    adaptableOptions.detailOptions = this.options;
    adaptableOptions.vendorGrid.detailCellRenderer = 'adaptableDetailCellRenderer';
    adaptableOptions.vendorGrid.components = adaptableOptions.vendorGrid.components || {};
    adaptableOptions.vendorGrid.components.adaptableDetailCellRenderer = DetailCellRenderer;
  }
}

export default (options?: MasterDetailAgGridPluginOptions) => new MasterDetailAgGridPlugin(options);
