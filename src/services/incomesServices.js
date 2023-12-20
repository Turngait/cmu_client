import { ENDPOINTS } from "../config/api";
import KEYS from "../config/key";


export async function addIncomeService(income, setMsg) {
  const token = localStorage.getItem("token");
  return await addIncomeToAPI(
    income,
    token,
    setMsg
  );
}

export async function addIncomeToAPI(income, token, setError) {
  return await fetch(ENDPOINTS.incomes.add, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ income }),
  }).then(async (res) => {
    if (res.status === 202) {
      const data = await res.json();

      return data.data.income ? true : false;
    } else if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setError(errors[0].msg);
        return false;
      }
    } else {
      setError(res.status);
      return false;
    }
  });
}

export async function deleteIncomeService(income) {
  const token = localStorage.getItem("token");
  return await deleteIncomeFromAPI(income, token);
}

export async function deleteIncomeFromAPI(income, token) {
  return await fetch(ENDPOINTS.incomes.delete, {
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      Token: token,
    },
    mode: "cors",
    body: JSON.stringify({ income }),
  }).then(async (res) => {
    if (res.status === 200) {
      const data = await res.json();
      return data.data.income ? true : false;
    } else {
      return false;
    }
  });
}

export async function addSourceService(incomeSource, setError) {
  const token = localStorage.getItem("token");
  return await addSourceToAPI(incomeSource, token, setError);
}

export async function addSourceToAPI(IncomeSource, token, setError) {
  return await fetch(ENDPOINTS.incomes.addSource, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ IncomeSource, token }),
  }).then(async (res) => {
    if (res.status === 202) {
      const data = await res.json();
      console.log(data);
      return true;
    } else if (res.status === 403) {
      setError("Заголовок должен быть более 3х символов.");
      return false;
    }
    setError("Проблема на сервере");
    return false;
  });
}

export function filteredIncomesByGroupIdService(groupId, incomes) {
  if (!groupId) return null;

  const filteredIncomes = [];
  for (const income of incomes) {
    filteredIncomes.push(
      ...income.items.filter((item) => item.source_id === groupId)
    );
  }
  return filteredIncomes;
}

export function filteredIncomesByBudgetIdService(budgetId, incomes) {
  if (!budgetId) return null;

  const filteredIncomes = [];
  for (const income of incomes) {
    filteredIncomes.push(
      ...income.items.filter((item) => item.budget_id === budgetId)
    );
  }
  return filteredIncomes;
}
