import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../SimpleButton';

let dragImage: any;

const DRAG_IMAGE_SRC = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

interface EditorButtonProps extends SimpleButtonProps {
  data: string;
  textAreaRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>;
}

function EditorButton(props: EditorButtonProps) {
  const { textAreaRef, data, ...buttonProps } = props;
  return (
    <SimpleButton
      data-name={'operator-or-fn'}
      variant="text"
      draggable={true}
      onDragStart={event => {
        if (!dragImage) {
          // we want to lazy init the image since otherwise it fails in SSR environments if it is declared outside the cmp - ReferenceError: Image is not defined
          dragImage = new Image(0, 0);
          dragImage.src = DRAG_IMAGE_SRC;
        }

        document.getSelection().empty();
        event.dataTransfer.setData('text', data + ' ');
        event.dataTransfer.setDragImage(dragImage, 0, 0);
      }}
      onDragEnd={() => {
        try {
          document.getSelection()?.collapseToEnd();
        } catch (err) {
          console.error(err);
        }
      }}
      onClick={() => {
        textAreaRef.current.focus();
        try {
          document.execCommand('insertText', false, data + ' ');

          document.getSelection()?.collapseToEnd();
        } catch (err) {
          console.error(err);
        }
      }}
      style={{
        cursor: 'grab',
      }}
      {...buttonProps}
    />
  );
}

export default EditorButton;
