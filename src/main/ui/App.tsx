import React from 'react';
import {HashRouter} from "react-router-dom";
import {SelfRouter} from "./routes/SelfRouter";

export const App = () => {

  return (
    <HashRouter>
      <SelfRouter/>
    </HashRouter>
  );
};
