import { ENDPOINTS } from "../../config/api";
import API_KEY from "../../config/key";

export const signInService = async (loginUser, setMsg, auth) => {
  const data = await fetch(ENDPOINTS.users.signIn, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY.API_KEY,
    },
    body: JSON.stringify({ email: loginUser.email, pass: loginUser.password }),
  }).then((res) => res.json());
  if (data.user.statusCode) {
    setMsg(data.user.message[0]);
    return;
  }
  if (data.user.status === 200) {
    const oldAccountId = localStorage.getItem("accountId");
    const authData = {
      accountId: oldAccountId || data.account.id,
      token: data.user.token,
    };

    auth(authData);
  } else if (data.user.status === 403) {
    setMsg("Wrong password or email");
  } else {
    setMsg("Server error. Try again later");
  }
};

export const signUpService = async (user, setMsg, auth) => {
  const data = await fetch(ENDPOINTS.users.signUp, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY.API_KEY,
    },
    body: JSON.stringify({
      email: user.email,
      pass: user.password,
      name: user.name,
      initialBalance: user.initialBalance,
      currency: user.currency,
      accountTitle: user.accountTitle,
    }),
  }).then((res) => res.json());

  if (data.errors) setMsg(data.errors.errors[0].msg);

  if (data.status === 202) auth(data.data);
  else if (data.status === 409) setMsg("Such email is exist already");
};

export const recoveryEmailService = async (email) => {
  const data = await fetch(ENDPOINTS.users.recoveryPass, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": API_KEY.API_KEY,
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => res.json());

  if (data.errors) return data.errors.errors[0].msg;

  if (data.status === 200) return "Новый пароль выслан на e-mail";

  return "Проблемы на сервере. Попробуйте позже";
};
