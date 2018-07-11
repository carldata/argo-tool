import './scss/styles.scss';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, history } from './store/store-creator';
import { ConnectedRouter } from 'react-router-redux';
import { Redirect, Route } from 'react-router';
import { ProjectScreenContainer } from '@screens/project';
import { SelectProjectScreenContainer } from '@screens/select-project';
import { routes } from '@routes';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path='/' render={() => (<Redirect to={`${routes.SELECT_PROJECT}`} />)} />
        <Route path={`${routes.SELECT_PROJECT}`} component={SelectProjectScreenContainer} />
        <Route path={`${routes.PROJECT}`} component={ProjectScreenContainer} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);