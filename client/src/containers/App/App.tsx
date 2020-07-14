import React from "react";
import { Switch, Route } from "react-router";
import { ToastProvider } from "react-toast-notifications";

import "./App.css";
import HomePage from "../Home/Home";
import FinalRoomPage from "../FinalRoom/FinalRoom";

const App: React.FC<any> = () => {
  return (
    <ToastProvider>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/:room[:userId]" exact component={FinalRoomPage} />
        </Switch>
      </div>
    </ToastProvider>
  );
};

export default App;
