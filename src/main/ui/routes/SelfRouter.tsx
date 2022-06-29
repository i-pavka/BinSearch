import React from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import {Launch} from "../Launch/Launch";
import {Error404} from "../Error/Error404";
import {ProcessGame} from "../ProcessGame/ProcessGame";

const PATH = {
  LAUNCH: '/launch',
  GAME: '/game',
}

export const SelfRouter = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.LAUNCH}/>}/>
        <Route path={PATH.LAUNCH} element={<Launch/>}/>
        <Route path={PATH.GAME} element={<ProcessGame/>}/>
        <Route path={'*'} element={<Error404/>}/>
      </Routes>
    </div>
  );
};

