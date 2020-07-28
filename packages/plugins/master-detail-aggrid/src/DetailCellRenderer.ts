import { GridOptions } from '@ag-grid-community/all-modules';
import {
  DetailCellRenderer as BaseDetailCellRenderer,
  IDetailCellRendererParams,
} from '@ag-grid-enterprise/master-detail/dist/es6/masterDetail/detailCellRenderer';
import { Adaptable } from '@adaptabletools/adaptable/src/agGrid/Adaptable';
import { AdaptableApi } from '@adaptabletools/adaptable/types';

export class DetailCellRenderer extends BaseDetailCellRenderer {
  adaptableApi?: AdaptableApi;
  adaptableDestroyed: boolean = false;
  init(params: IDetailCellRendererParams) {
    const oldOnGridReady = params.detailGridOptions.onGridReady;
    params.detailGridOptions.onGridReady = async (event: any) => {
      if (this.adaptableApi || this.adaptableDestroyed) {
        return;
      }

      if (oldOnGridReady) {
        oldOnGridReady(event);
      }

      // @ts-ignore
      const masterAdaptable: Adaptable = params.api.__adaptable;

      const { onDetailInit, detailAdaptableOptions } = masterAdaptable.getPlugin(
        'master-detail-aggrid'
      ).options;

      // @ts-ignore
      const detailGridOptions: GridOptions = this.detailGridOptions;

      // @ts-ignore
      const eDetailGrid: HTMLElement = this.eDetailGrid;

      const adaptableContainerId = `adaptable-detail-${params.rowIndex}`;
      const adaptableContainer = document.createElement('div');
      adaptableContainer.id = adaptableContainerId;

      eDetailGrid.parentNode?.prepend(adaptableContainer);

      const predefinedConfig =
        typeof detailAdaptableOptions.predefinedConfig === 'string'
          ? {}
          : detailAdaptableOptions.predefinedConfig;

      this.adaptableApi = await Adaptable.init({
        adaptableId: `${masterAdaptable.adaptableOptions.adaptableId} Detail`,
        ...detailAdaptableOptions,
        predefinedConfig: {
          ...predefinedConfig,
          Dashboard: {
            IsCollapsed: true,
            ...predefinedConfig.Dashboard,
          },
        },
        containerOptions: {
          ...detailAdaptableOptions.containerOptions,
          adaptableContainer: adaptableContainerId,
          vendorContainer: eDetailGrid,
        },
        vendorGrid: detailGridOptions,
      });

      if (onDetailInit) {
        onDetailInit(this.adaptableApi);
      }
    };
    super.init(params);
  }
  destroy() {
    this.adaptableDestroyed = true;
    if (this.adaptableApi) {
      this.adaptableApi.destroy();
      this.adaptableApi = undefined;
    }
    super.destroy();
  }
}
