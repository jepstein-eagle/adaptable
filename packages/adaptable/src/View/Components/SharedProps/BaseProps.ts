import * as React from 'react';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';
import { AdaptableApi } from '../../../Api/AdaptableApi';

export interface BaseProps<View> extends React.ClassAttributes<View> {
  AccessLevel: AccessLevel;
  ModalContainer: HTMLElement;
  Api: AdaptableApi;
}
