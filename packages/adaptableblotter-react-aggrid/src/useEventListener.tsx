import { useEffect } from 'react';
import { IAdaptableBlotter } from '../../adaptableblotter/App_Scripts/Utilities/Interface/IAdaptableBlotter';
import { IEvent } from '../../adaptableblotter/App_Scripts/Utilities/Interface/IEvent';
import { IEventApi } from '../../adaptableblotter/App_Scripts/Api/Interface/IEventApi';

const useEventListener = (
  fn: undefined | ((...args: any[]) => void),
  blotter: IAdaptableBlotter | null,
  getSpecificEvent?: (eventApi: IEventApi) => IEvent<any, any>
) => {
  useEffect(() => {
    if (!blotter || !fn || !getSpecificEvent) {
      return;
    }

    getSpecificEvent(blotter.api.eventApi).Subscribe(fn);
    return () => {
      getSpecificEvent(blotter.api.eventApi).Unsubscribe(fn);
    };
  }, [blotter, fn]);
};

export default useEventListener;
