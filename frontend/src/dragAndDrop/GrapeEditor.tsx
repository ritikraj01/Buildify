import React, { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import ReactDOMServer from "react-dom/server";

interface GrapesEditorProps {
  component: JSX.Element;
  onSave: (html: string) => void;
}

const GrapesEditor: React.FC<GrapesEditorProps> = ({ component, onSave }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<Editor | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      height: "500px",
      width: "auto",
      fromElement: false,
      storageManager: { autoload: false },
    });

    editorInstance.current = editor;

    // Convert JSX to static HTML and set it inside GrapesJS
    const html = ReactDOMServer.renderToStaticMarkup(component);
    editor.setComponents(html);

    return () => editor.destroy();
  }, [component]);

  const saveChanges = () => {
    if (!editorInstance.current) return;

    const updatedHtml = editorInstance.current.getHtml();
    setEditorContent(updatedHtml); // Save edited content in state
    onSave(updatedHtml); // Send back to parent component
  };

  return (
    <div>
      <button
        onClick={saveChanges}
        style={{
          marginBottom: "10px",
          padding: "8px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
        }}
      >
        Save Changes
      </button>
      <div ref={editorRef} style={{ border: "1px solid #ddd" }}></div>
    </div>
  );
};

export default GrapesEditor;
