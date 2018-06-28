import './scss/styles.scss';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/store-creator';
import { MainScreenContainer } from '@screens/project/.';
import { GenericModalContainer } from '@components/generic-modal';

ReactDOM.render(
  <Provider store={store}>
    <span>
      <MainScreenContainer />
      <GenericModalContainer />
    </span>
  </Provider>,
  document.body.appendChild(document.createElement('div')),
);