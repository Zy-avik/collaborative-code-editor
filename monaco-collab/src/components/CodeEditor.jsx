import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import socket from "../socket";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);

  useEffect(() => {
    editorInstanceRef.current = monaco.editor.create(editorRef.current, {
      value: "// Start coding here...",
      language: "javascript",
      theme: "vs-dark",
    });

    // Send code
    editorInstanceRef.current.onDidChangeModelContent(() => {
      const code = editorInstanceRef.current.getValue();
      console.log("📤 Sending codeChange:", code);
      socket.emit("codeChange", code);
    });

    // Receive code
    socket.on("codeChange", (newCode) => {
      console.log("📥 Received codeChange:", newCode);
      const currentCode = editorInstanceRef.current.getValue();
      if (currentCode !== newCode) {
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
