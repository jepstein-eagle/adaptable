import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { useReducer, Reducer, useState, useEffect, ReactNode } from 'react';
import { GridOptions } from 'ag-grid-community';
import theme from '../../theme';

import join from '../../components/utils/join';

import FileDroppable from '../../components/FileDroppable';

import { prepareDataSource, WizardDataSourceInfo, prepareGridOptions } from './helper';
import ConfigurationDialog from './AdaptableBlotterConfigurationDialog';
import { Flex } from 'rebass';
import { AdaptableOptions } from '../../AdaptableOptions/AdaptableOptions';

interface AdaptableWizardViewProps {
  adaptableOptions: AdaptableOptions;
  onInit: (adaptableOptions: AdaptableOptions) => any;
  fileContentsToJSON?: (str: string) => Promise<any> | any;
  readFile?: (file: File) => Promise<any>;
  fileAccept?: string;
  loadingMessage?: ReactNode;
  defaultActionMessage?: ReactNode;
  dragOverActionMessage?: ReactNode;
  fetchData?: () => Promise<any>;
  prepareData?: (
    data: any,
    file?: File
  ) => {
    columns: string[];
    data: any[];
    primaryKey?: string;
  };
}

const AdaptableWizardView = (props: AdaptableWizardViewProps) => (
  <ThemeProvider theme={theme}>
    <Wizard {...props} />
  </ThemeProvider>
);

interface WizardState {
  dropped: boolean;
  error: any;
  adaptableOptions: AdaptableOptions;
}
const initialState: Partial<WizardState> = {
  dropped: false,
};

const reducer: Reducer<WizardState, any> = (state: WizardState, action: any) => {
  if (action.type === 'DROPPED') {
    return {
      ...state,
      adaptableOptions: action.payload,
      dropped: true,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      ...state,
      dropped: false,
      error: action.payload,
    };
  }

  if (action.type === 'CANCEL') {
    return {
      ...state,
      error: null,
      dropped: false,
    };
  }

  return state;
};

const validDataSource = (dataSourceInfo: any) => {
  if (!dataSourceInfo || !Array.isArray(dataSourceInfo.columns)) {
    throw `We can't find any columns in your configuration`;
  }

  if (!dataSourceInfo.columns.length) {
    throw 'You should have at least one column';
  }

  const allStringColumns = dataSourceInfo.columns.reduce((acc: boolean, col: any) => {
    if (!col || typeof col !== 'string') {
      return false;
    }
    return acc;
  }, true);

  if (!allStringColumns) {
    throw `Some of your columns are not strings`;
  }

  if (!Array.isArray(dataSourceInfo.data)) {
    throw `We can't find the data array in your configuration`;
  }

  return true;
};

const Wizard = (props: AdaptableWizardViewProps) => {
  const [state, dispatch] = useReducer<Reducer<WizardState, any>>(reducer, {
    ...initialState,
    adaptableOptions: props.adaptableOptions,
  } as WizardState);

  const [droppableKey, setDroppableKey] = useState(Date.now());

  const onDropSuccess = (array: any, file?: File) => {
    const dataSourceInfo: WizardDataSourceInfo = (props.prepareData || prepareDataSource)(
      array,
      file
    );

    try {
      validDataSource(dataSourceInfo);
    } catch (err) {
      return dispatch({
        type: 'ERROR',
        payload: `Invalid adaptable configuration - ${err}`,
      });
    }
    const gridOptions: GridOptions = prepareGridOptions(dataSourceInfo);

    const adaptableOptions = { ...props.adaptableOptions };

    adaptableOptions.adaptableId = adaptableOptions.adaptableId || (file ? file.name : '');

    adaptableOptions.vendorGrid = gridOptions;
    if (dataSourceInfo.primaryKey) {
      adaptableOptions.primaryKey = dataSourceInfo.primaryKey;
    }

    if (props.fetchData) {
      props.onInit(adaptableOptions);
    } else {
      dispatch({
        type: 'DROPPED',
        payload: adaptableOptions,
      });
    }
  };

  let wizard;

  if (state.dropped) {
    wizard = (
      <ConfigurationDialog
        adaptableOptions={state.adaptableOptions}
        onCancel={() => {
          // change the file droppable component key
          // so it's remounted and it's in the initial state
          setDroppableKey(Date.now());
          dispatch({
            type: 'CANCEL',
          });
        }}
        onFinish={adaptableOptions => {
          props.onInit(adaptableOptions);
        }}
      />
    );
  }

  const ddEnabled = !props.fetchData;

  useEffect(() => {
    if (props.fetchData) {
      props.fetchData().then((data: any) => {
        onDropSuccess(data);
      });
    }
  }, []);

  return (
    <>
      {ddEnabled ? (
        <FileDroppable
          key={droppableKey}
          className={'ab-nocode-wizard'}
          toJSON={props.fileContentsToJSON}
          readFile={props.readFile}
          fileAccept={props.fileAccept}
          message={state.error}
          defaultText={props.defaultActionMessage}
          dragOverText={props.dragOverActionMessage}
          onDropSuccess={onDropSuccess}
        ></FileDroppable>
      ) : (
        <Flex
          className={'ab-nocode-wizard'}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {props.loadingMessage || 'Loading ...'}
        </Flex>
      )}
      {wizard}
    </>
  );
};

export default AdaptableWizardView;
