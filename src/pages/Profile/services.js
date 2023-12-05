import { ENDPOINTS } from "../../config/api";
import KEYS from "../../config/key";

export async function changeNameService(name, token) {
  const status = await fetch(ENDPOINTS.users.changeName, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    body: JSON.stringify({ name }),
  }).then((res) => {
    return res.status;
  });
  return status;
}

export async function changePassService(oldPass, newPass, token) {
  const data = await fetch(ENDPOINTS.users.changePass, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    body: JSON.stringify({ oldPass, newPass }),
  }).then((res) => {
    return res.json();
  });

  return data.status;

  // if (data.status === 200) setMsg("Данные изменены");
  // else if (data.status === 403) setMsg("Неверный пароль");
  // else setMsg("Проблема на сервере");

  // setTimeout(() => setMsg(null), 3000);
}

export async function getInitialDataService(token, accountId, setInfo) {
  return await fetch(ENDPOINTS.users.getInitData, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({ token, accountId }),
  })
    .then((res) => res.json())
    .then((data) => {
      setInfo(data);
    });
}

export async function deleteAllInformationService(token) {
  return await fetch(ENDPOINTS.users.deleteAll, {
    mode: "cors",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
    },
    body: JSON.stringify({ token }),
  }).then((res) => res.json());
}