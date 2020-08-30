import * as React from 'react';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';
import { AdaptableApi } from '../../../Api/AdaptableApi';

export interface BaseProps<View> extends React.ClassAttributes<View> {
  accessLevel: AccessLevel;
  modalContainer: HTMLElement;
  api: AdaptableApi;
}
