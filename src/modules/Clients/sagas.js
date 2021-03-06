import { takeLatest, call, put, select } from 'redux-saga/effects';
import { reset } from 'redux-form';

import request from '../../utils/request';
import { getClientsSuccess } from './actions';
import { baseUrl } from '../../config';
import { tokenSelector } from '../User';

export function* getClientsListCall(token) {
  const requestURL = `${baseUrl()}/api/Clients/byAuth`;
  return yield call(request, `${requestURL}?access_token=${token}`, {
    method: 'GET',
  });
}

export function* getClientsListSaga() {
  // yield put(clientsListLoading());
  try {
    const token = yield select(tokenSelector);
    const clients = yield call(getClientsListCall, token);
    yield put(getClientsSuccess(clients));
  } catch (err) {
    console.warn('Failure in getClientsListSaga');
  }
}

export function* deleteClientSaga(action) {
  const requestBaseUrl = `${baseUrl()}/api/Clients`;
  const token = yield select(tokenSelector);
  const requestURL = `${requestBaseUrl}/${action.payload.clientId}?access_token=${token}`;
  yield call(request, requestURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function* addClientSaga(action) {
  const token = yield select(tokenSelector);
  const requestURL = `${baseUrl()}/api/Clients?access_token=${token}`;
  const { firstname, lastname, number, morning, lunch, afternoon, evening } = action.payload.client;
  const body = JSON.stringify({
    firstname,
    lastname,
    number,
    morning: !!morning,
    lunch: !!lunch,
    afternoon: !!afternoon,
    evening: !!evening,
    id: new Date().getTime(),
  });
  try {
    yield call(request, requestURL, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield call(getClientsListSaga);
    yield put(reset('clientAddition'));
    // yield put(handleToastr('Client enregistré !'));
  } catch (err) {
    // yield put(handleToastr("Un problème est survenu lors de l'enregistrement"));
  }
}

export function* ClientsSaga() {
  yield takeLatest('DELETE_CLIENT', deleteClientSaga);
  yield takeLatest('GET_CLIENTS', getClientsListSaga);
  yield takeLatest('ADD_CLIENT', addClientSaga);
}

export default [ClientsSaga];
