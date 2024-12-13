import React, { useEffect } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = React.useState<EditorState>(() => {
    if (value) {
      try {
        const rawContent = JSON.parse(value);
        const contentState = convertFromRaw(rawContent);
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error("Failed to parse editor content:", error);
        return EditorState.createEmpty();
      }
    } else {
      return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    if (value) {
      try {
        const rawContent = JSON.parse(value);
        const contentState = convertFromRaw(rawContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Failed to parse editor content:", error);
        setEditorState(EditorState.createEmpty());
      }
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [value]);

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    const rawContent = convertToRaw(newState.getCurrentContent());
    const content = JSON.stringify(rawContent);
    onChange(content);
  };

  return (
    <div className="p-2 bg-gray-100 rounded-lg shadow-md">
      <div className="bg-white border text-black border-gray-300 rounded-md p-2">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          wrapperClassName="editor-wrapper"
          editorClassName="editor-content"
          toolbarClassName="editor-toolbar"
        />
      </div>
    </div>
  );
};

export default WysiwygEditor;
