import React from "react";
import CodeEditor from "./components/CodeEditor";
import "./styles.css";
import UserList from "./components/UserList"; 

export default function App() {
  return (
    <div style={{ display: "flex" }}>
        <UserList />
        <CodeEditor />
    </div>
  );
}
