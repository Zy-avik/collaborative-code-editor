import React from "react";
import CodeEditor from "./components/CodeEditor";

export default function App() {
  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ color: "#fff" }}>Monaco Editor — Day 1 Demo</h2>
      <CodeEditor />
    </div>
  );
}
