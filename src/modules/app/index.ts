import { APP_KEY } from '~/modules/app/data/constants';
import { appReducer } from '~/modules/app/data/reducer';

export * from './hoc/login-redirect';
export { appActions } from './data/reducer';
export * from './data/selectors';
export * from './components/layout';
export * from './components/login-form';
export * from './components/header';
export * from './components/device-list';

export const appReducers = {
    [APP_KEY]: appReducer,
};
