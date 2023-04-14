import React from "react";
import { DashboardNav } from "./container/dashboard-nav";
import { Feed } from "./container/feed";
import "./index.css";
import { ModalsContainer } from "./container/modals-container";

function App() {
  return (
    <>
      <div className="h-full mx-auto flex flex-row">
        <DashboardNav />
        <Feed />
        <ModalsContainer />
      </div>
    </>
  );
}

export default App;
