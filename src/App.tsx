import React from "react";
import { DashboardNav } from "./container/dashboard-nav";
import { Feed } from "./container/feed";
import "./index.css";

function App() {
  return (
    <>
      <div className="h-full mx-auto flex flex-row divide-x">
        <DashboardNav />
        <Feed />
      </div>
    </>
  );
}

export default App;
