import Cookie from "universal-cookie";

const cookies = new Cookie();

const getAccessToken = () => {
  return cookies.get("accessToken");
};

const setAccessTokenToCookie = (accessToken) => {
  cookies.set("accessToken", accessToken, { path: "/" });
};

const removeAccessTokenFromCookie = () => {
  cookies.remove("accessToken", { path: "/" });
};

const getHomeAccountId = () => {
  return cookies.get("homeAccountId");
};

const removeHomeAccountIdFromCookie = () => {
  cookies.remove("homeAccountId", { path: "/" });
};

const setIdTokenToCookie = (idToken) => {
  cookies.set("idToken", idToken, { path: "/" });
};

const removeIdTokenFromCookie = () => {
  cookies.remove("idToken", { path: "/" });
};

const clearAllCookies = () => {
  removeAccessTokenFromCookie();
  removeIdTokenFromCookie();
  removeHomeAccountIdFromCookie();
};

export {
  getAccessToken,
  setAccessTokenToCookie,
  removeAccessTokenFromCookie,
  clearAllCookies,
  getHomeAccountId,
  removeHomeAccountIdFromCookie,
  setIdTokenToCookie,
};
