import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { ReducersMapObject, combineReducers, compose, Store, createStore, applyMiddleware } from 'redux';
import { IAppState } from './state';
import { IConfigurationState, ConfigurationActionTypes, configurationReducer } from '@business-logic/configuration';
import { IProjectScreenState } from '@screens/project/.';
import { mainSaga } from '@store/main-saga';
import { IGenericMessageModalState, GenericModalActionsTypes, genericMessageModalContainerReducer } from '@components/generic-message-modal';
import { ISelectProjectScreenState } from '@screens/select-project';
import { SelectProjectScreenActionsTypes, selectProjectScreenReducer } from '@screens/select-project/reducers';
import { projectScreenReducer, ProjectScreenActionsTypes } from '@screens/project/reducers';
import { createHashHistory } from 'history';

interface ICombinedReducers extends ReducersMapObject {
  genericMessageModalState: (state: IGenericMessageModalState, action: GenericModalActionsTypes) => IGenericMessageModalState;
  configuration: (state: IConfigurationState, action: ConfigurationActionTypes) => IConfigurationState;
  selectProjectScreenState: (state: ISelectProjectScreenState, action: SelectProjectScreenActionsTypes) => ISelectProjectScreenState;
  projectScreenState: (state: IProjectScreenState, action: ProjectScreenActionsTypes) => IProjectScreenState;
}

const reducerMapObject: ICombinedReducers = {
  genericMessageModalState: genericMessageModalContainerReducer,
  configuration: configurationReducer,
  selectProjectScreenState: selectProjectScreenReducer,
  projectScreenState: projectScreenReducer,
};

const combinedReducers = combineReducers<IAppState>(reducerMapObject);

const history = createHashHistory();

// this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
// tslint:disable-next-line:no-string-literal
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enchancers = composeEnhancers(applyMiddleware(routingMiddleware, sagaMiddleware));
const store: Store<IAppState> = createStore(combinedReducers, enchancers);

sagaMiddleware.run(mainSaga);

export {
  store,
  history,
};