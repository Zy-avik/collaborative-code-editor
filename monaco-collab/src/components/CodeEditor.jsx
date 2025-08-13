// src/components/CodeEditor.jsx
import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState("// Start coding...");

  function handleEditorChange(value) {
    setCode(value);
  }

  return (
    <Editor
      height="75vh"
      defaultLanguage="javascript"
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        tabSize: 2,
        automaticLayout: true,
      }}
    />
  );
}
