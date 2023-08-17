import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  PayloadAction,
} from "@reduxjs/toolkit";

export type socketMiddlewareProps = {
  wsSendMessage?: ActionCreatorWithPayload<unknown>;
  onMessage: ActionCreatorWithPayload<unknown>;
  onError: ActionCreatorWithPayload<string>;
  wsConnect: ActionCreatorWithPayload<string>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsDisconnect: ActionCreatorWithoutPayload;
};

export const socketMiddleware = (wsActions: socketMiddlewareProps) => {
  return (store: any) => {
    let socket: any = null;

    return (next: any) => (action: PayloadAction<any>) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        onOpen,
        onMessage,
        onClose,
        onError,
        wsSendMessage,
      } = wsActions;

      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event: any) => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {
            console.log("нужно было обновить токен");
          }
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event: any) => {
          dispatch(onClose());
        };

        if (wsSendMessage && type === wsSendMessage.type) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
