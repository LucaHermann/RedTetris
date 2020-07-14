import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Store } from "redux";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";

import "./index.css";
import * as serviceWorker from "./utils/serviceWorker";
import configureStore, { IAppState } from "./store/Store";
import App from "./containers/App/App";

interface IProps {
  store: Store<IAppState>;
}

const Root: React.FC<IProps> = props => {
  return (
    <BrowserRouter>
      <Provider store={props.store}>
        <div className="Index">
          <App />
        </div>
      </Provider>
    </BrowserRouter>
  );
};

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root") as HTMLElement);

serviceWorker.unregister();
