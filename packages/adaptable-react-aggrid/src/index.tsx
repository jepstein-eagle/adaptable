import * as React from 'react';
import { useMemo, useLayoutEffect } from 'react';

import Adaptable from '@adaptabletools/adaptable/src/agGrid';
import { AdaptableApi } from '@adaptabletools/adaptable/types';

import { AdaptableOptions } from '@adaptabletools/adaptable/types';

import * as AgGrid from '@ag-grid-community/all-modules';

export * from '@adaptabletools/adaptable/types';

import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-react-aggrid" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

const join = (...args: any[]): string => args.filter(x => !!x).join(' ');

const getRandomInt = (max: number): number => Math.floor(Math.random() * Math.floor(max));

const AdaptableReact = ({
  adaptableOptions,
  gridOptions,
  onAdaptableReady,
  ...props
}: {
  adaptableOptions: AdaptableOptions;
  gridOptions: AgGrid.GridOptions;
  onAdaptableReady?: (adaptableReadyInfo: {
    adaptableApi: AdaptableApi;
    vendorGrid: AgGrid.GridOptions;
  }) => void;
} & React.HTMLProps<HTMLDivElement>) => {
  const seedId = useMemo(() => `${getRandomInt(1000)}-${Date.now()}`, []);
  const adaptableContainerId = `adaptable-${seedId}`;

  useLayoutEffect(() => {
    const startTime = Date.now();

    const poolForAggrid = (callback: () => void) => {
      const api = gridOptions.api;

      if (Date.now() - startTime > 1000) {
        console.warn(
          `Could not find any agGrid instance rendered.
Please make sure you pass "gridOptions" to AdapTable, so it can connect to the correct agGrid instance.`
        );
        return;
      }

      if (!api) {
        requestAnimationFrame(() => {
          poolForAggrid(callback);
        });
      } else {
        callback();
      }
    };

    let adaptableApi: AdaptableApi;

    poolForAggrid(() => {
      // IF YOU UPDATE THIS, make sure you also update the Angular wrapper impl
      const layoutElements = (gridOptions.api as any).gridOptionsWrapper
        ? (gridOptions.api as any).gridOptionsWrapper.layoutElements || []
        : [];

      let vendorContainer;

      for (let i = 0, len = layoutElements.length; i < len; i++) {
        const element = layoutElements[i];

        if (element && element.matches('.ag-root-wrapper')) {
          const gridContainer = element.closest('[class*="ag-theme"]');

          if (gridContainer) {
            vendorContainer = gridContainer;
            break;
          }
        }
      }

      if (!vendorContainer) {
        console.error(
          `Could not find the agGrid vendor container. This will probably break some AdapTable functionality.`
        );
      }
      adaptableApi = Adaptable.init({
        ...adaptableOptions,
        containerOptions: {
          ...adaptableOptions.containerOptions,
          adaptableContainer: adaptableContainerId,
          vendorContainer,
        },
        vendorGrid: gridOptions,
      });

      if (onAdaptableReady) {
        adaptableApi.eventApi.on('AdaptableReady', onAdaptableReady);
      }
    });

    return () => {
      if (adaptableApi) {
        adaptableApi.destroy({
          unmount: true,
          destroyApi: false,
        });
      }
      adaptableApi = null;
    };
  }, []);

  return (
    <div
      {...props}
      id={adaptableContainerId}
      className={join(props.className, 'ab__react-wrapper')}
    ></div>
  );
};

export default AdaptableReact;
