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
    let adaptableApi: AdaptableApi;

    const init = async () => {
      adaptableApi = await Adaptable.initInternal(
        {
          ...adaptableOptions,
          containerOptions: {
            ...adaptableOptions.containerOptions,
            adaptableContainer: adaptableContainerId,
          },
          vendorGrid: gridOptions,
        },
        { waitForAgGrid: true }
      );

      if (onAdaptableReady) {
        adaptableApi.eventApi.on('AdaptableReady', onAdaptableReady);
      }
    };

    init();

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
