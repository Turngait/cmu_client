import { ENDPOINTS } from "../config/api";
import KEYS from "../config/key";
import { getFinData } from "../utils";

export async function getDataForBudgets(period, setDataToComponent) {
  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("accountId");
  const { budgets, accounts, costs, incomes } = await getFinData(
    token,
    period,
    accountId
  );
  
  setDataToComponent(accounts, budgets, costs, incomes);
}

export async function addBudgetService(budget, setBudget, setErrors) {
  const token = localStorage.getItem("token");
  // TODO Add balance
  return await addBudgetToAPI(
    budget,
    token,
    setBudget,
    setErrors
  );
}
export async function addBudgetToAPI(budget, token, setBudget, setErrors) {
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
export async function deleteBudgetService(budgetId, setErrors) {
  const token = localStorage.getItem("token");
  return await deleteBudgetOnAPI(
    budgetId,
    token,
    setErrors
  );
}
export async function deleteBudgetOnAPI(budgetId, token, setErrors) {
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
export async function editBudgetService(budget, setErrors) {
  const token = localStorage.getItem("token");
  return await editBudgetOnAPI(
    budget,
    token,
    setErrors
  );
}
export async function editBudgetOnAPI(budget, token, setErrors) {
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

export async function transferMoneyBetweenBudgetsService(from_budget_id, to_budget_id, amount, token, setErrors) {
  return await fetch(ENDPOINTS.budgets.transfer, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ 
      from_budget_id,
      to_budget_id,
      amount
     }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
  }).then(async (res) => {
    if (res.status === 200) {
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
    return false;
  });
}