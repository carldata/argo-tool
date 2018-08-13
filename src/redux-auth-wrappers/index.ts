import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { getCookie } from '../common/cookie-auxiliary';
import { routes } from '../routes';

export const ifTokenIsEmptyGoToLogin = connectedRouterRedirect({
  redirectPath:  routes.LOGIN,
  allowRedirectBack: false,
  authenticatedSelector: () => getCookie('fw_jwt') !== '',
});

export const ifTokenNotEmptyGoToSelectProject = connectedRouterRedirect({
  redirectPath: routes.SELECT_PROJECT,
  allowRedirectBack: false,
  authenticatedSelector: () => getCookie('fw_jwt') === '',
});