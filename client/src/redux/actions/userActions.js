import * as API from ".../api/userApi";

export function login() {
  return API.login()
    .then((result) => {
      return dispatch(login(result));
    })
    .catch((error) => {
      return dispatch({
        type: "GET_TODOS_FAILED",
        data: `Fetching todos failed due to ${error}`,
      });
    });
}
