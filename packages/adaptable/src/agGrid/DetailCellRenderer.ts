import {
  Grid,
  GridOptions,
  ICellRendererComp,
  ICellRendererParams,
} from '@ag-grid-community/all-modules';
import {
  DetailCellRenderer as BaseDetailCellRenderer,
  IDetailCellRendererParams,
} from '@ag-grid-enterprise/master-detail/dist/es6/masterDetail/detailCellRenderer';
import { Adaptable } from './Adaptable';

export class DetailCellRenderer extends BaseDetailCellRenderer {
  adaptable?: Adaptable;
  adaptableDestroyed: boolean = false;
  init(params: IDetailCellRendererParams) {
    const oldOnGridReady = params.detailGridOptions.onGridReady;
    params.detailGridOptions.onGridReady = event => {
      if (this.adaptable || this.adaptableDestroyed) return;

      if (oldOnGridReady) {
        oldOnGridReady(event);
      }

      // @ts-ignore
      const masterAdaptable: Adaptable = params.api.__adaptable;

      const { detailOptions } = masterAdaptable.adaptableOptions;

      if (!detailOptions) {
        throw 'detailOptions is required in master/detail';
      }

      // @ts-ignore
      const detailGridOptions: GridOptions = this.detailGridOptions;

      // @ts-ignore
      const eDetailGrid: HTMLElement = this.eDetailGrid;

      const adaptableContainerId = `adaptable-detail-${params.rowIndex}`;
      const adaptableContainer = document.createElement('div');
      adaptableContainer.id = adaptableContainerId;

      eDetailGrid.parentNode?.prepend(adaptableContainer);

      this.adaptable = new Adaptable({
        adaptableId: `${masterAdaptable.adaptableOptions.adaptableId} Detail`,
        ...detailOptions,
        predefinedConfig: {
          ...detailOptions.predefinedConfig,
          Dashboard: {
            IsCollapsed: true,
            ...detailOptions.predefinedConfig.Dashboard,
          },
        },
        containerOptions: {
          ...detailOptions.containerOptions,
          adaptableContainer: adaptableContainerId,
          vendorContainer: eDetailGrid,
        },
        vendorGrid: detailGridOptions,
      });
    };
    super.init(params);
  }
  destroy() {
    this.adaptableDestroyed = true;
    if (this.adaptable) {
      this.adaptable.destroy();
      this.adaptable = undefined;
    }
    super.destroy();
  }
}
