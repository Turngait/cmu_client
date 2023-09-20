import { ENDPOINTS } from "../../config/api";
import KEYS from "../../config/key";

export async function getFinData(token, period, accountId) {
  const { costs, incomes, budgets, accounts } = await fetch(ENDPOINTS.finData, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ period, accountId }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
  }).then((res) => res.json());

  return { costs, incomes, budgets, accounts };
}

export async function addAccountToAPI(newAccount, token, setErrors) {
  return await fetch(ENDPOINTS.accounts.add, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ account: newAccount }),
  }).then(async (res) => {
    if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setErrors(errors[0].msg);
      }
    }

    return res.status;
  });
}

export async function editAccountAtAPI(account, token, setErrors) {
  return await fetch(ENDPOINTS.accounts.add, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ account }),
  }).then(async (res) => {
    if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setErrors(errors[0].msg);
      }
    }

    return res.status;
  });
}

export async function deleteAccountFromAPI(accountId, token, setErrors) {
  return await fetch(ENDPOINTS.accounts.add, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ accountId }),
  }).then(async (res) => {
    if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setErrors(errors[0].msg);
      }
    }

    return res.status;
  });
}
