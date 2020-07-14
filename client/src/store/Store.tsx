/*  Imports from Redux:
 applyMiddleware: Applies middleware to the dispatch method of the Redux store
 combineReducers: Merges reducers into one
 createStore: Creates a Redux store that holds the state tree
 Store: The TS Type used for the store, or state tree
 */
import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action.
The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
The inner function receives the store methods dispatch and getState as parameters.
*/

import { socketMiddleware } from "../middlewares/socketMiddleware";
import { IUserState, userReducer } from "../reducers/userReducers";
import { roomReducer, IRoomState } from "../reducers/roomReducer";

export interface IAppState {
  userState: IUserState;
  roomState: IRoomState;
}

const rootReducer = combineReducers<IAppState>({
  userState: userReducer,
  roomState: roomReducer
});

export default function configureStore(): Store<IAppState, any> {
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk, socketMiddleware())));
  return store;
}
