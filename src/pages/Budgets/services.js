import { ENDPOINTS } from "../../config/api";
import KEYS from "../../config/key";

export async function saveBudgetService(budget, token, setBudget, setErrors) {
  const status = await fetch(ENDPOINTS.budgets.add, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ budget }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
  }).then(async (res) => {
    if (res.status === 202) {
      const data = await res.json();
      const { budget } = data;
      setBudget(budget);
      return true;
    } else if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setErrors(errors[0].msg);
        return false;
      }
    } else {
      setErrors(res.status);
      return false;
    }
    return true;
  });

  return status;
}

export async function deleteBudgetService(budgetId, token, setErrors) {
  return await fetch(ENDPOINTS.budgets.delete, {
    mode: "cors",
    method: "DELETE",
    body: JSON.stringify({ budgetId }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();

      return data.data.isDeleted;
    } else if (res.status === 422) {
      const data = await res.json();
      if (data.error) {
        setErrors(data.error);
        return false;
      } else {
        setErrors("Что то пошло не так. Попробуйте позже.");
      }
      setTimeout(() => setErrors(""), 4000);
      return false;
    } else {
      const data = await res.json();
      setErrors(data.data.msg);
      return false;
    }
  });
}

export async function editBudgetService(budget, token, setErrors) {
  return await fetch(ENDPOINTS.budgets.edit, {
    mode: "cors",
    method: "Put",
    body: JSON.stringify({ budget }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();

      return data.data.isUpdated;
    } else if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setErrors(errors[0].msg);
        return false;
      }
    } else {
      setErrors(res.status);
      return false;
    }
    return false;
  });
}
