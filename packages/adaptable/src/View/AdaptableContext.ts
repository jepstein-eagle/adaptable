import * as React from 'react';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
const AdaptableContext = React.createContext<IAdaptable | null>(null);

export default AdaptableContext;

export const useAdaptable = () => {
  return React.useContext(AdaptableContext);
};
