import * as React from 'react';

import { Flex, FlexProps, Box } from 'rebass';
import { useReducer, Reducer, useRef } from 'react';

import join from '../../components/utils/join';
import contains from '../../components/utils/contains';
import SimpleButton from '../SimpleButton';
import { Icon } from '../icons';
import HelpBlock from '../HelpBlock';

interface FileDroppableProps extends FlexProps {
  buttonText?: React.ReactNode;
  message?: React.ReactNode;
  onDropSuccess?: (json: any, file: File) => void;
}

interface FileDroppableState {
  dragOver: boolean;
  message?: React.ReactNode;
}
const initialState: FileDroppableState = {
  dragOver: false,
  message: null,
};

const stop = (e: React.SyntheticEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const readJSONFile = async (file: File) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function(e) {
      try {
        resolve(JSON.parse((e as any).target.result));
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

enum ActionTypes {
  DRAG_OVER = 'DRAG_OVER',
  DRAG_OUT = 'DRAG_OUT',
  SET_INVALID_FILE = 'SET_INVALID_FILE',
  DROP_SUCCES = 'DROP_SUCCES',
}

interface Action {
  type: ActionTypes;
  payload?: any;
}
const reducer: Reducer<FileDroppableState, any> = (state: FileDroppableState, action: Action) => {
  if (action.type === ActionTypes.DRAG_OVER) {
    return {
      ...state,
      dragOver: true,
    };
  }

  if (action.type === ActionTypes.DRAG_OUT) {
    return {
      ...state,
      dragOver: false,
    };
  }

  if (action.type === ActionTypes.SET_INVALID_FILE) {
    return {
      ...state,
      message: action.payload.message,
    };
  }

  if (action.type === ActionTypes.DROP_SUCCES) {
    return {
      ...state,
      dragOver: false,
      message: action.payload.message,
    };
  }

  return state;
};

const FileDroppable = (props: FileDroppableProps) => {
  const { onDropSuccess, message, ...domProps } = props;
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
        json = await readJSONFile(file);

        dispatch({
          type: ActionTypes.DROP_SUCCES,
          payload: {
            message: <Box>{'Initializing blotter...'}</Box>,
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
        <div>
          {state.dragOver ? (
            <b>Drop file here to start Adaptable Blotter Wizard</b>
          ) : (
            <div>
              <b>Click here to select a JSON file to load </b> or drag it here
            </div>
          )}
        </div>
        <input
          type="file"
          onChange={onDrop}
          accept=".json"
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
      <Flex flexDirection="column">
        <Flex flexDirection="column" alignItems="center" margin={2}>
          <HelpBlock>The Adaptable Blotter No Code Version</HelpBlock>
        </Flex>
        <Flex flexDirection="column" alignItems="center" margin={2}>
          <Icon name="attach-file" size={48} />
        </Flex>
      </Flex>

      {msg}

      {form}
    </Flex>
  );
};

FileDroppable.defaultProps = {};

export default FileDroppable;
