import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { styleStyle } from './style/';
import './vendor.css';

const app: HTMLDivElement = document.createElement('div');
document.body.appendChild(app);

export const App: React.StatelessComponent<{}> = () => {
  return (
    <div className="row center-xs">
      <h1 className={styleStyle.appTitle}>Welcome to react-ts!</h1>
    </div>
  );
};

ReactDOM.render(<App />, app);
