import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {createMemoryHistory, createBrowserHistory} from 'history';

const mount = (el, {
  defaultHistory,
  onNavigate,
  initialPath,
  onSignIn
}) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  // Listen to changes from the container router history
  onNavigate && history.listen(onNavigate);
  ReactDOM.render(<App history={history} onSignIn={onSignIn}/>, el);

  return {
    onParentNavigate({pathname: nextPathname}) {
      const {pathname} = history.location;
      pathname !== nextPathname && history.push(nextPathname);
    }
  }
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');
  if (devRoot) {
    mount(devRoot, {defaultHistory: createBrowserHistory()})
  }
}

export {mount};
