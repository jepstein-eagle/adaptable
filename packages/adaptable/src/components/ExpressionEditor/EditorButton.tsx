import * as React from 'react';
import SimpleButton, { SimpleButtonProps } from '../SimpleButton';

const dragImage = new Image(0, 0);
dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

interface EditorButtonProps extends SimpleButtonProps {
  data: string;
  textAreaRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement>;
}

function EditorButton(props: EditorButtonProps) {
  return (
    <SimpleButton
      variant="text"
      draggable={true}
      onDragStart={event => {
        document.getSelection().empty();
        event.dataTransfer.setData('text', props.data);
        event.dataTransfer.setDragImage(dragImage, 0, 0);
      }}
      onClick={() => {
        props.textAreaRef.current.focus();
        document.execCommand('insertText', false, props.data);
      }}
      style={{
        cursor: 'grab',
      }}
      {...props}
    />
  );
}

export default EditorButton;
