import io from "socket.io-client";
import { Dispatch } from "redux";

export enum SOCKET_ACTIONS {
  EMIT = "EMIT",
}

export const socketMiddleware = () => {
  const socket = io("http://localhost:8080");
  return ({ dispatch, getState }: any) => (next: any) => (action: any) => {
    if (!action.event) {
      return next(action);
    }
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    const { type, event, emit, leave, handle, ...rest } = action;

    if (emit === true) {
      return socket.emit(event, rest);
    }

    if (leave) {
      socket.removeListener(event);
    }
    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = (result: Dispatch) =>
        dispatch({
          type: handle,
          result,
          ...rest
        });
    }
    return socket.on(event, handleEvent);
  };
};
