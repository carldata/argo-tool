import createSagaMiddleware from 'redux-saga';
import { ReducersMapObject, combineReducers, compose, Store, createStore, applyMiddleware } from 'redux';
import { IAppState } from './state';
import { IConfigurationState, ConfigurationActionTypes, configurationReducer } from '@business-logic/configuration';
import { IMainScreenState, MainScreenActionsTypes, mainScreenReducer } from '@screens/project/.';
import { mainSaga } from '@store/main-saga';
import { IModalState, ModalActionsTypes, modalContainerReducer } from '@components/modal';

interface ICombinedReducers extends ReducersMapObject {
  modalState: (state: IModalState, action: ModalActionsTypes) => IModalState;
  configuration: (state: IConfigurationState, action: ConfigurationActionTypes) => IConfigurationState;
  mainScreenState: (state: IMainScreenState, action: MainScreenActionsTypes) => IMainScreenState;
}

const reducerMapObject: ICombinedReducers = {
  modalState: modalContainerReducer,
  configuration: configurationReducer,
  mainScreenState: mainScreenReducer,
};

const combinedReducers = combineReducers<IAppState>(reducerMapObject);

// this is the callback function required in order to have this Chrome extension https://github.com/zalmoxisus/redux-devtools-extension working
// tslint:disable-next-line:no-string-literal
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const sagaMiddleware = createSagaMiddleware();
export const store: Store<IAppState> = createStore(combinedReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(mainSaga);