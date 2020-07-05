import axios from "axios";
import {
  authenticated,
  VERIFY_GOOGLE_LOGIN,
} from "../store/authentication/acions";
import { takeLatest, call, put } from "redux-saga/effects";

function verifyGoogleLogin(id_token) {
  return axios.post(
    "http://ec2-35-166-58-245.us-west-2.compute.amazonaws.com:8080/verifyGoogleLogin",
    { id_token }
  );
}

function* verifyGoogleLoginEffect(action) {
  try {
    const id_token = action.googleLoginResponse.tokenId;
    const history = action.history;
    
    /*yield put(authenticated(true, action.googleLoginResponse.profileObj));
    history.push('/dashboard');*/
    const response = yield call(verifyGoogleLogin, id_token);
    if (response.data.status) {
<<<<<<< HEAD
      localStorage.setItem("login_session_token", id_token);
      yield put(authenticated(true));
      history.push("/dashboard");
=======
      yield put(authenticated(true, action.googleLoginResponse));
      history.push(action.path);
>>>>>>> master
    } else {
      yield put(authenticated(false,null));
    }
  } catch (e) {
    yield put(authenticated(false, null));
  }
}

export function* verifyGoogleEffect() {
  yield takeLatest(VERIFY_GOOGLE_LOGIN, verifyGoogleLoginEffect);
}
