
const API_PREFIX = '/api/';

export const ASK_REQUEST_STARTED = 'ASK_REQUEST_STARTED';
export const ASK_REQUEST_SUCCESS = 'ASK_REQUEST_SUCCESS';
export const ASK_REQUEST_FAILURE = 'ASK_REQUEST_FAILURE';

export const ASK_REQUEST_EDIT_ACCESS = 'ASK_REQUEST_EDIT_ACCESS';
export const ASK_EDIT_ACCEPTED = 'ASK_EDIT_ACCEPTED';
export const ASK_EDIT_DENIED = 'ASK_EDIT_ACCEPTED';
export const ASK_EDIT_LEAVE = 'ASK_EDIT_LEAVE';

export const ASK_DELETED = 'ASK_DELETED';

export const ASK_CREATE_EMPTY= 'ASK_CREATE_EMPTY';

const getInit = (body, method) => {

  var headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  var init = {
    method: method || 'POST',
    headers: headers,
    mode: 'cors'
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  return init;
};

export const askRequestStarted = () => {
  return {
    type: ASK_REQUEST_STARTED
  };
};

export const askRequestSuccess = (payload, index, requestType) => {
  return {
    type: ASK_REQUEST_SUCCESS,
    payload,
    index,
    requestType
  };
};

export const askRequestFailure = (err) => {
  return {
    type: ASK_REQUEST_FAILURE,
    err
  };
};

export const deleteSuccessful = (ask) => {
  return {
    type: ASK_DELETED,
    ask
  };
};

export const askRequestEditAccess = askId => {
  return {
    type: ASK_REQUEST_EDIT_ACCESS,
    askId,
    publish: true
  };
};

export const askLeaveEdit = askId => {
  return {
    type: ASK_EDIT_LEAVE,
    askId,
    publish: true
  };
};

export const deleteAsk = (name, description, index) => {
  return (dispatch, getState) => {
    dispatch(askRequestStarted());
    fetch(`${getState().app.pillarHost}${API_PREFIX}tag`, getInit({ name, description }, 'DELETE'))
      .then(res => res.json())
      .then(deletedAsk => {
        dispatch(deleteSuccessful(deletedAsk));
        dispatch(askRequestSuccess(deletedAsk, index, 'delete'));
      })
      .catch(error => dispatch(askRequestFailure(error)));
  };
};

export const requestEditAccess = askId => {
  return dispatch => {
    dispatch(askRequestEditAccess(askId));
  };
};

export const leavingEdit = askId => {
  return dispatch => {
    dispatch(askLeaveEdit(askId));
  };
};

export const createEmpty = () => {
  return {
    type: ASK_CREATE_EMPTY
  };
}
