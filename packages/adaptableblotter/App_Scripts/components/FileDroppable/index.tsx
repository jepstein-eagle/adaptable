import * as React from 'react';

import { Flex, FlexProps, Box } from 'rebass';
import { useReducer, Reducer, useRef } from 'react';

import join from '../../components/utils/join';
import contains from '../../components/utils/contains';
import SimpleButton from '../SimpleButton';
import { Icon } from '../icons';
import HelpBlock from '../HelpBlock';

import { FileDroppableState } from './FileDroppableState';

import reducer, { ActionTypes, Action } from './reducer';

interface FileDroppableProps extends FlexProps {
  buttonText?: React.ReactNode;
  fileAccept?: string;
  icon?: React.ReactNode;
  helpText?: React.ReactNode;
  defaultText?: React.ReactNode;
  dragOverText?: React.ReactNode;
  message?: React.ReactNode;
  toJSON?: (str: string) => Promise<any> | any;
  readFile?: (file: File, toJSON?: (str: string) => Promise<any> | any) => Promise<any>;
  onDropSuccess?: (json: any, file: File) => void;
}

const initialState: FileDroppableState = {
  dragOver: false,
  message: null,
};

const stop = (e: React.SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const readJSONFile = async (file: File, toJSON?: (str: string) => Promise<any> | any) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function(e) {
      try {
        const fn = toJSON || JSON.parse;
        const json = fn((e as any).target.result);

        Promise.resolve(json).then(resolve);
      } catch (ex) {
        reject('Invalid JSON');
      }
    };
    reader.onerror = function(e) {
      reject(e);
    };
    reader.readAsText(file);
  });
};

const FileDroppable = (props: FileDroppableProps) => {
  const {
    onDropSuccess,
    message,
    fileAccept = '.json',
    helpText = 'The Adaptable No Code Version',
    defaultText = 'Click here to select a JSON file to load or drag it here',
    dragOverText = 'Drop file here to start Adaptable Wizard',
    icon = <Icon name="attach-file" size={48} />,
    ...domProps
  } = props;

  const [state, dispatch] = useReducer<Reducer<FileDroppableState, Action>>(reducer, initialState);

  const onDragEnter = (e: React.SyntheticEvent) => {
    dispatch({
      type: ActionTypes.DRAG_OVER,
    });
  };

  const onDragLeave = (event: React.SyntheticEvent) => {
    stop(event);

    if (
      domRef.current != event.target &&
      contains(domRef.current as Element, event.target as Element)
    ) {
      return;
    }
    dispatch({
      type: ActionTypes.DRAG_OUT,
    });
  };

  const onDrop = async (e: React.SyntheticEvent) => {
    let files;
    stop(e);

    let nativeEvent = (e as any).nativeEvent;

    if (nativeEvent && nativeEvent.dataTransfer) {
      files = nativeEvent.dataTransfer.files;
    } else {
      files = (e.target as any).files;
    }

    onDragLeave(e);

    const file = files[0];

    if (file) {
      let json: any;
      try {
        json = await (props.readFile || readJSONFile)(file, props.toJSON);

        dispatch({
          type: ActionTypes.DROP_SUCCES,
          payload: {
            message: <Box>{'Initializing adaptable...'}</Box>,
          },
        });
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (onDropSuccess) {
              onDropSuccess(json, file);
            }
          });
        });
      } catch (err) {
        dispatch({
          type: ActionTypes.SET_INVALID_FILE,
          payload: {
            message: <Box>{'The file is not a valid JSON file! Please try again!'}</Box>,
          },
        });
      }
    }
  };

  const domRef = useRef<HTMLElement>();

  let form = (
    <form onSubmit={stop}>
      <SimpleButton style={{ cursor: 'pointer' }} variant="text">
        <div>{state.dragOver ? dragOverText : defaultText}</div>
        <input
          type="file"
          onChange={onDrop}
          accept={fileAccept}
          style={{
            opacity: 0,
            position: 'absolute',
            fontSize: 0,
            lineHeight: 0,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
      </SimpleButton>
    </form>
  );

  const msg = message || state.message;

  return (
    <Flex
      {...domProps}
      flexDirection="column"
      className={join(
        props.className,
        'ab-FileDroppable',
        state.dragOver ? 'ab-FileDroppable--drag-over' : ''
      )}
      alignItems="center"
      justifyContent="center"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={stop}
      ref={domRef}
    >
      {props.children}

      {helpText || icon ? (
        <Flex flexDirection="column">
          {helpText ? (
            <Flex flexDirection="column" alignItems="center" margin={2}>
              <HelpBlock>{helpText}</HelpBlock>
            </Flex>
          ) : null}
          {icon ? (
            <Flex flexDirection="column" alignItems="center" margin={2}>
              {icon}
            </Flex>
          ) : null}
        </Flex>
      ) : null}

      {msg}

      {form}
    </Flex>
  );
};

FileDroppable.defaultProps = {};

export default FileDroppable;
