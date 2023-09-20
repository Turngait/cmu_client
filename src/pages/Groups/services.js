import { ENDPOINTS } from "../../config/api";
import KEYS from "../../config/key";

export async function changeNameService(name, token, setMsg) {
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

  if (status === 200) setMsg("Данные изменены");
  else if (status === 403) setMsg("В доступе отказано");
  else setMsg("Проблема на сервере");

  setTimeout(() => setMsg(null), 3000);
}

export async function changePassService(oldPass, newPass, token, setMsg) {
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

  if (data.status === 200) setMsg("Данные изменены");
  else if (data.status === 403) setMsg("Неверный пароль");
  else setMsg("Проблема на сервере");

  setTimeout(() => setMsg(null), 3000);
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

export async function changeGroupNameService(
  costGroup,
  token,
  setMsg,
  editClose
) {
  return await fetch(ENDPOINTS.costs.editGroup, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    body: JSON.stringify({ costGroup }),
  }).then(async (res) => {
    const data = await res.json();
    if (data.status === 200) {
      editClose();
      return true;
    } else if (data.status === 403) setMsg("Доступ запрещен");
    else setMsg("Что то пошло не так. Попробуйте позже");
    setTimeout(() => setMsg(""), 4000);
    return false;
  });
}

//TODO Compare with function above
export async function changeSourceNameService(
  source,
  token,
  setMsg,
  editClose
) {
  return await fetch(ENDPOINTS.incomes.editSource, {
    mode: "cors",
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    body: JSON.stringify({ source }),
  }).then(async (res) => {
    const data = await res.json();
    if (data.status === 200) {
      editClose();
      return true;
    } else if (data.status === 403) setMsg("Доступ запрещен");
    else setMsg("Что то пошло не так. Попробуйте позже");
    setTimeout(() => setMsg(""), 4000);
    return false;
  });
}

export async function deleteGroup(costGroupId, token, setMsg) {
  const is_delete = await fetch(ENDPOINTS.costs.deleteGroup, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ costGroupId }),
  }).then((res) => {
    if (res.status === 200) {
      return true;
    } else if (res.status === 403) {
      setMsg("Нет доступа. Попробуйте перезайти в аккаунт");
      setTimeout(() => setMsg(""), 4000);
      return false;
    } else {
      setMsg("Что то пошло не так. Попробуйте позже");
      setTimeout(() => setMsg(""), 4000);
      return false;
    }
  });

  return is_delete;
}

export async function deleteSource(incomeSourceId, token, setMsg) {
  const is_delete = await fetch(ENDPOINTS.incomes.deleteSource, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ incomeSourceId }),
  }).then((res) => {
    if (res.status === 200) {
      return true;
    } else if (res.status === 403) {
      setMsg("Нет доступа. Попробуйте перезайти в аккаунт");
      setTimeout(() => setMsg(""), 4000);
      return false;
    } else {
      setMsg("Что то пошло не так. Попробуйте позже");
      setTimeout(() => setMsg(""), 4000);
      return false;
    }
  });

  return is_delete;
}
