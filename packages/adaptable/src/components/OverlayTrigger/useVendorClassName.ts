import { useMemo } from 'react';
import { useAdaptable } from '../../View/AdaptableContext';

const useVendorClassName = (deps: any[] = []) => {
  const adaptable = useAdaptable();

  return useMemo(() => {
    if (adaptable) {
      return adaptable.getVendorGridCurrentThemeName();
    }
    return '';
  }, deps);
};

export default useVendorClassName;
