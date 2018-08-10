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
import { ifTokenNotEmptyGoToSelectProject, ifTokenIsEmptyGoToLogin } from './redux-auth-wrappers';
import { setCookie } from './common/cookie-auxiliary';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path='/' render={() => (<Redirect to={`${routes.SELECT_PROJECT}`} />)} />
        <Route path={`${routes.LOGIN}`} component={ifTokenNotEmptyGoToSelectProject(() => {
          // TODO - load url from some config
          window.location.href = `http://beta.flowworks.com/login.aspx?externalUrl=http://${window.location.host}`;
          return <div>Loading</div>;
        })} />
        <Route path={`${routes.ACCESS_TOKEN}`} component={(props) => {
          setCookie('fw_jwt', props.match.params.token, 120);
          history.push(`${routes.SELECT_PROJECT}`);
          return <div>Loading</div>;
        }} />
        <Route path={`${routes.SELECT_PROJECT}`} component={ifTokenIsEmptyGoToLogin(SelectProjectScreenContainer as React.ComponentClass<any>)} />
        <Route path={`${routes.PROJECT}`} component={ifTokenIsEmptyGoToLogin(ProjectScreenContainer as React.ComponentClass<any>)} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);