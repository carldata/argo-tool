import createSagaMiddleware from 'redux-saga';
import { ReducersMapObject, combineReducers, compose, Store, createStore, applyMiddleware } from 'redux';
import { IAppState } from './state';
import { IConfigurationState, ConfigurationActionTypes, configurationReducer } from '@business-logic/configuration';
import { IProjectScreenState } from '@screens/project/.';
import { mainSaga } from '@store/main-saga';
import { IGenericModalState, GenericModalActionsTypes, genericModalContainerReducer } from '@components/generic-modal';
import { ISelectProjectScreenState } from '@screens/select-project';
import { SelectProjectScreenActionsTypes, selectProjectScreenReducer } from '@screens/select-project/reducers';
import { projectScreenReducer, ProjectScreenActionsTypes } from '@screens/project/reducers';

interface ICombinedReducers extends ReducersMapObject {
  modalState: (state: IGenericModalState, action: GenericModalActionsTypes) => IGenericModalState;
  configuration: (state: IConfigurationState, action: ConfigurationActionTypes) => IConfigurationState;
  selectProjectScreenState: (state: ISelectProjectScreenState, action: SelectProjectScreenActionsTypes) => ISelectProjectScreenState;
  projectScreenState: (state: IProjectScreenState, action: ProjectScreenActionsTypes) => IProjectScreenState;
}

const reducerMapObject: ICombinedReducers = {
  modalState: genericModalContainerReducer,
  configuration: configurationReducer,
  selectProjectScreenState: selectProjectScreenReducer,
  projectScreenState: projectScreenReducer,
};

const combinedReducers = combineReducers<IAppState>(reducerMapObject);

// this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
// tslint:disable-next-line:no-string-literal
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const sagaMiddleware = createSagaMiddleware();
export const store: Store<IAppState> = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(mainSaga);