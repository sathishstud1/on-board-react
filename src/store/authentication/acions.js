export const AUTHENTICATED = 'AUTHENTICATED';
export const VERIFY_GOOGLE_LOGIN = 'VERIFY_GOOGLE_LOGIN';

export const authenticated = (isAuthenticated, profileObj) => {
  return {
    type: AUTHENTICATED,
    isAuthenticated,
    profileObj
  }
}

export const verifyGoogleLogin = (googleLoginResponse, history, path) => {
  return {
    type: VERIFY_GOOGLE_LOGIN,
    googleLoginResponse,
    history,
    path
  }
}
