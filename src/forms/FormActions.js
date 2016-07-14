'use strict';

export const SUBMISSIONS_REQUEST_STARTED = 'SUBMISSIONS_REQUEST_STARTED';
export const SUBMISSIONS_REQUEST_SUCCESS = 'SUBMISSIONS_REQUEST_SUCCESS';
export const SUBMISSIONS_REQUEST_FAILED = 'SUBMISSIONS_REQUEST_FAILED';

export const SET_ACTIVE_SUBMISSION = 'SET_ACTIVE_SUBMISSION';
export const UPDATE_ACTIVE_SUBMISSION = 'UPDATE_ACTIVE_SUBMISSION';

export const WIDGET_UPDATE = 'WIDGET_UPDATE';
export const WIDGET_MOVE = 'WIDGET_MOVE';

export const FORM_REQUEST_STARTED = 'FORM_REQUEST_STARTED';
export const FORM_REQUEST_SUCCESS = 'FORM_REQUEST_SUCCESS';
export const FORM_REQUEST_FAILURE = 'FORM_REQUEST_FAILURE';
export const FORM_APPEND_WIDGET = 'FORM_APPEND_WIDGET';
export const FORM_DELETE_WIDGET = 'FORM_DELETE_WIDGET';
export const FORM_DUPLICATE_WIDGET = 'FORM_DUPLICATE_WIDGET';

export const FORM_CREATE_INIT = 'FORM_CREATE_INIT';
export const FORM_CREATED = 'FORM_CREATED';
export const FORM_CREATION_FAILURE = 'FORM_CREATION_FAILURE';
export const FORM_UPDATE = 'FORM_UPDATE';

export const FORMS_REQUEST_STARTED = 'FORMS_REQUEST_STARTED';
export const FORMS_REQUEST_SUCCESS = 'FORMS_REQUEST_SUCCESS';
export const FORMS_REQUEST_FAILURE = 'FORMS_REQUEST_FAILURE';

export const FORM_REQUEST_EDIT_ACCESS = 'FORM_REQUEST_EDIT_ACCESS';
export const FORM_EDIT_ACCEPTED = 'FORM_EDIT_ACCEPTED';
export const FORM_EDIT_DENIED = 'FORM_EDIT_ACCEPTED';
export const FORM_EDIT_LEAVE = 'FORM_EDIT_LEAVE';

export const FORM_GALLERY_REQUEST = 'FORM_GALLERY_REQUEST';
export const FORM_GALLERY_SUCCESS = 'FORM_GALLERY_SUCCESS';
export const FORM_GALLERY_ERROR = 'FORM_GALLERY_ERROR';

export const FORM_STATUS_UPDATED = 'FORM_STATUS_UPDATED';
export const FORM_STATUS_UPDATE_ERROR = 'FORM_STATUS_UPDATE_ERROR';

export const FORM_ANSWER_SENT_TO_GALLERY = 'FORM_ANSWER_SENT_TO_GALLERY';
export const FORM_ANSWER_REMOVED_FROM_GALLERY = 'FORM_ANSWER_REMOVED_FROM_GALLERY';

export const FORM_DELETED = 'FORM_DELETED';

export const FORM_CREATE_EMPTY= 'FORM_CREATE_EMPTY';

export const FORM_REPLACE_WIDGETS = 'FORM_REPLACE_WIDGETS';

export const ANSWER_EDIT_BEGIN = 'ANSWER_EDIT_BEGIN';
export const ANSWER_EDIT_UPDATE = 'ANSWER_EDIT_UPDATE';
export const ANSWER_EDIT_CANCEL = 'ANSWER_EDIT_CANCEL';
export const ANSWER_EDIT_REQUEST = 'ANSWER_EDIT_REQUEST';
export const ANSWER_EDIT_SUCCESS = 'ANSWER_EDIT_SUCCESS';
export const ANSWER_EDIT_FAILED = 'ANSWER_EDIT_FAILED';

export const FORM_EDIT_INIT = 'FORM_EDIT_INIT';
export const FORM_EDIT_SUCCESS = 'FORM_EDIT_SUCCESS';
export const FORM_EDIT_FAILURE = 'FORM_EDIT_FAILURE';

export const UPDATE_FORM_INACTIVE_MESSAGE_INIT = 'UPDATE_FORM_INACTIVE_MESSAGE_INIT';
export const UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS = 'UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS';
export const UPDATE_FORM_INACTIVE_MESSAGE_FAILURE = 'UPDATE_FORM_INACTIVE_MESSAGE_FAILURE';

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

export const formRequestStarted = id => {
  return {
    type: FORM_REQUEST_STARTED,
    id
  };
};

export const formRequestSuccess = form => {
  return {
    type: FORM_REQUEST_SUCCESS,
    form
  };
};

export const formRequestFailure = (err) => {
  return {
    type: FORM_REQUEST_FAILURE,
    err
  };
};

export const formsRequestStarted = () => {
  return {
    type: FORMS_REQUEST_STARTED
  };
};

export const formsRequestSuccess = forms => {
  return {
    type: FORMS_REQUEST_SUCCESS,
    forms
  };
};

export const formsRequestFailure = err => {
  return {
    type: FORMS_REQUEST_FAILURE,
    err
  };
};


export const deleteSuccessful = (id) => {
  return {
    type: FORM_DELETED,
    id
  };
};

export const formRequestEditAccess = formId => {
  return {
    type: FORM_REQUEST_EDIT_ACCESS,
    formId,
    publish: true
  };
};

export const formLeaveEdit = formId => {
  return {
    type: FORM_EDIT_LEAVE,
    formId,
    publish: true
  };
};

export const fetchForms = () => {
  return (dispatch, getState) => {
    dispatch(formsRequestStarted());

    fetch(`${getState().app.pillarHost}/api/forms`)
      .then(res => res.json())
      .then(forms => dispatch(formsRequestSuccess(forms)))
      .catch(error => dispatch(formsRequestFailure(error)));
  };
};

export const fetchForm = id => {
  return (dispatch, getState) => {
    dispatch(formRequestStarted(id));

    fetch(`${getState().app.pillarHost}/api/form/${id}`)
      .then(res => res.json())
      .then(form => dispatch(formRequestSuccess(form)))
      .catch(error => dispatch(formRequestFailure(error)));
  };
};

export const deleteForm = (name, description, id) => {
  return (dispatch, getState) => {
    dispatch(formRequestStarted(id));
    fetch(`${getState().app.pillarHost}/api/form/${id}`, getInit({ name, description }, 'DELETE'))
      .then(res => res.json())
      .then(deletedForm => {
        dispatch(deleteSuccessful(id));
        // FIXME: Pillar returns 'null' for deleted forms.
        //dispatch(formRequestSuccess(deletedForm, 'delete'));
      })
      .catch(error => dispatch(formRequestFailure(error)));
  };
};

export const requestEditAccess = formId => {
  return dispatch => {
    dispatch(formRequestEditAccess(formId));
  };
};

export const leavingEdit = formId => {
  return dispatch => {
    dispatch(formLeaveEdit(formId));
  };
};

export const createEmpty = () => {
  return {
    type: FORM_CREATE_EMPTY
  };
};

export const replaceWidgets = fields => {
  return {
    type: FORM_REPLACE_WIDGETS,
    widgets: fields
  };
};

export const appendWidget = (type, targetPosition) => {
  return {
    type: FORM_APPEND_WIDGET,
    widget: type,
    targetPosition: targetPosition
  };
};

export const duplicateWidget = (position) => {
  return {
    type: FORM_DUPLICATE_WIDGET,
    position
  };
};

export const deleteWidget = (widgetPosition) => {
  return {
    type: FORM_DELETE_WIDGET,
    widgetPosition
  };
};

export const updateWidget = (id, data) => {
  return {
    type: WIDGET_UPDATE,
    data,
    id
  };
};

export const moveWidget = (from, to) => {
  return {
    type: WIDGET_MOVE,
    from,
    to
  };
};

export const updateForm = (data) => {
  return {
    type: FORM_UPDATE,
    data
  };
};

export const submissionsFetched = submissions => ({
  type: SUBMISSIONS_REQUEST_SUCCESS,
  submissions
});

export const submissionsFetchError = error => {
  return {
    type: SUBMISSIONS_REQUEST_FAILED,
    error
  };
};

export const setActiveSubmission = submissionId => ({
  type: SET_ACTIVE_SUBMISSION,
  submissionId
});

export const updateActiveSubmission = props => ({
  type: UPDATE_ACTIVE_SUBMISSION,
  props
});

const formCreated = form => {
  return {type: FORM_CREATED, form};
};

const formCreationFailure = error => {
  return {type: FORM_CREATION_FAILURE, error};
};

export const saveForm = (form, widgets) => {
  const data = Object.assign({}, form);
  data.steps[0].widgets = widgets;

  // FIXME: remove this hotfix
  data.status = form.settings.isActive ? 'open' : 'closed';

  return (dispatch, getState) => {

    const {app} = getState();

    dispatch({type: FORM_CREATE_INIT, data});
    return fetch(`${app.elkhornHost}/create`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      dispatch(formCreated(json));
      return json;
    })
    .catch(error => {
      dispatch(formCreationFailure(error));
    });
  };

};

export const editForm = (form) => {
  const data = {...form};

  return (dispatch, getState) => {
    const {app} = getState();

    dispatch({type: FORM_EDIT_INIT, data});
    return fetch(`${app.elkhornHost}/create`, getInit(data, 'POST'))
    .then(res => res.json())
    .then(json => {
      dispatch({type: FORM_EDIT_SUCCESS, data: json});
      return json;
    })
    .catch(error => {
      dispatch({type: FORM_EDIT_FAILURE, error});
    });
  };
};

export const updateInactiveMessage = (message, form) => {
  const formData = {...form};
  formData.settings.inactiveMessage = message;

  return (dispatch, getState) => {
    const {app} = getState();

    dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_INIT});
    return fetch(`${app.elkhornHost}/create`, getInit(formData, 'POST'))
    .then(res => res.json())
    .then(json => {
      dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_SUCCESS, data: json});
      return json;
    })
    .catch(error => {
      dispatch({type: UPDATE_FORM_INACTIVE_MESSAGE_FAILURE, error});
    });
  };
};

export const fetchSubmissions = (formId, page = 0) => {
  return (dispatch, getState) => {
    const {app} = getState();
    const skip = page * 10;
    fetch(`${app.pillarHost}/api/form_submissions/${formId}?skip=${skip}&limit=10`)
      .then(res => res.json())
      .then(submissions => dispatch(submissionsFetched(submissions)))
      .catch(error => dispatch(submissionsFetchError(error)));
  };
};

export const updateSubmission = props => dispatch => {
  dispatch(updateActiveSubmission(props));
  // TODO: go to server when API is done
};

const requestGallery = () => {
  console.log(FORM_GALLERY_REQUEST);
  return {type: FORM_GALLERY_REQUEST};
};

const receivedGallery = gallery => {
  return {type: FORM_GALLERY_SUCCESS, gallery};
};

const galleryRequestError = error => {
  return {type: FORM_GALLERY_ERROR, error};
};

export const fetchGallery = formId => {
  return (dispatch, getState) => {
    dispatch(requestGallery(formId));

    const {app} = getState();

    fetch(`${app.pillarHost}/api/form_galleries/${formId}`)
      .then(res => res.json())
      .then(galleries => dispatch(receivedGallery(galleries[0])))
      .catch(error => dispatch(galleryRequestError(error)));
  };
};

export const sendToGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const {app} = getState();

    fetch(`${app.pillarHost}/api/form_gallery/${galleryId}/add/${subId}/${answerId}`, {
      method: 'PUT',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(gallery => {
        dispatch({type: FORM_ANSWER_SENT_TO_GALLERY, gallery});
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const answerRemovedFromGallery = gallery => {
  return {
    type: FORM_ANSWER_REMOVED_FROM_GALLERY,
    gallery
  };
};

export const removeFromGallery = (galleryId, subId, answerId) => {
  return (dispatch, getState) => {
    const {app} = getState();
    const options = {method: 'DELETE', mode: 'cors'};

    fetch(`${app.pillarHost}/api/form_gallery/${galleryId}/remove/${subId}/${answerId}`, options)
      .then(res => res.json())
      .then(gallery => dispatch(answerRemovedFromGallery(gallery)))
      .catch(error => {
        console.log('failed to remove from gallery', error);
      });
  };
};

export const updateFormStatus = (formId, status) => {
  return (dispatch, getState) => {
    const {app} = getState();
    const options = {method: 'PUT', mode: 'cors'};

    fetch(`${app.pillarHost}/api/form/${formId}/status/${status}`, options)
      .then(res => res.json())
      .then(form => dispatch({type: FORM_STATUS_UPDATED, form}))
      .catch(error => dispatch({type: FORM_STATUS_UPDATE_ERROR, error}));
  };
};

// user opens the Edit Answer modal
export const beginEdit = (galleryId, submissionId, answerId) => {
  return {type: ANSWER_EDIT_BEGIN, answerId, submissionId};
};

// user starts typing and changing the Answer
export const updateEditableAnswer = text => {
  return {type: ANSWER_EDIT_UPDATE, text};
};

export const cancelEdit = () => {
  return {type: ANSWER_EDIT_CANCEL};
};

// post updates to the server
export const editAnswer = (edited, answer, formId) => {
  return (dispatch, getState) => {
    dispatch({type: ANSWER_EDIT_REQUEST});

    const {app} = getState();

    fetch(`${app.pillarHost}/api/form_submission/${answer.submission_id}/${answer.answer_id}`, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({edited})
    })
      .then(res => res.json())
      .then(submission => {
        dispatch({type: ANSWER_EDIT_SUCCESS, submission});
        // just re-fetch the gallery instead of trying to munge the state
        dispatch(fetchGallery(formId));
      })
      .catch(error => dispatch({type: ANSWER_EDIT_FAILED, error}));
  };
};
