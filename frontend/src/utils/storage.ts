// LocalStorage helpers

export const setAuthToken = (token: string) => {
  localStorage.setItem("authtoken", token);
};

export const getAuthToken = () => {
  localStorage.getItem("authtoken");
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};
