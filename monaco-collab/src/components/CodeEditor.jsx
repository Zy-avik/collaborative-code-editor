// CodeEditor.jsx
import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import socket from "../socket";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    editorInstanceRef.current = monaco.editor.create(editorRef.current, {
      value: "// Start coding here...",
      language: "javascript",
      theme: "vs-dark",
    });

    // Local change handler
    editorInstanceRef.current.onDidChangeModelContent(() => {
      if (isRemoteUpdate.current) {
        isRemoteUpdate.current = false;
        return;
      }
      const code = editorInstanceRef.current.getValue();
      socket.emit("codeChange", code);
    });

    // Remote change listener
    socket.on("codeChange", (newCode) => {
      const currentCode = editorInstanceRef.current.getValue();
      if (currentCode !== newCode) {
        isRemoteUpdate.current = true;
        editorInstanceRef.current.setValue(newCode);
      }
    });

    return () => {
      socket.off("codeChange");
    };
  }, []);

  return (
    <div
      ref={editorRef}
      style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
    ></div>
  );
}
