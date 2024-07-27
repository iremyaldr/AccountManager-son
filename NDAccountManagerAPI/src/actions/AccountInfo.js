import api from "../api";

export const ACTION_TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  FETCH_ALL: 'FETCH_ALL',
  FETCH_SHARED: 'FETCH_SHARED',
  SHARE: 'SHARE' // Add this line
};

export const fetchAll = () => dispatch => {
  api.AccountInfo().fetchAll()
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};

export const fetchShared = () => dispatch => {
  api.AccountInfo().fetchShared()
    .then(response => {
      dispatch({
        type: ACTION_TYPES.FETCH_SHARED,
        payload: response.data
      });
    })
    .catch(err => console.log(err));
};

export const create = (data, onSuccess) => dispatch => {
  api.AccountInfo().create(data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: response.data
      });
      onSuccess();
    })
    .catch(err => console.log(err));
};

export const update = (id, data, onSuccess) => dispatch => {
  api.AccountInfo().update(id, data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data }
      });
      onSuccess();
    })
    .catch(err => console.log(err));
};

export const Delete = (id, onSuccess) => dispatch => {
  api.AccountInfo().delete(id)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id
      });
      onSuccess();
    })
    .catch(err => console.log(err));
};

export const shareAccount = (data, onSuccess) => dispatch => {
  api.AccountInfo().share(data)
    .then(response => {
      dispatch({
        type: ACTION_TYPES.SHARE,
        payload: response.data
      });
      onSuccess();
    })
    .catch(err => console.log(err));
};