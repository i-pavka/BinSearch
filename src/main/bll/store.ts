import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import {gameReducer} from "./redusers/game-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const reducers = combineReducers({
  game: gameReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>
export const useGameSelector: TypedUseSelectorHook<AppStoreType> = useSelector

