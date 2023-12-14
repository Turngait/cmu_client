export * from './costsUtils';
import { ENDPOINTS } from "../config/api";
import KEYS from "../config/key";

export function numberFormat(number) {
  return new Intl.NumberFormat("ru-RU").format(number);
}

export function formateDate(date, month = "numeric") {
  var dateFormated = new Date(date);
  var options = {
    year: "numeric",
    month: month,
    day: "numeric",
  };
  return dateFormated.toLocaleString("ru", options);
}

export function formatMonth(date) {
  var dateFormated = new Date(date);
  var options = {
    year: "numeric",
    month: "long",
  };
  return dateFormated.toLocaleString("ru", options);
}

export function getActiveAccount(accounts) {
  if (!accounts || !Array.isArray(accounts)) return [];

  let activeAcc = accounts[0];
  const accountId = localStorage.getItem("accountId");
  if (accountId && accounts.length > 0) {
    for (const acc of accounts) {
      if (acc.id === accountId) activeAcc = acc;
    }
  }

  return activeAcc;
}

export async function getFinData(token, period, accountID) {
  const { costs, incomes, budgets, accounts, targets } = await fetch(
    ENDPOINTS.finData,
    {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({ period, accountID }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "API-KEY": KEYS.API_KEY,
        TOKEN: token,
      },
    }
  ).then((res) => res.json());

  return { costs, incomes, budgets, accounts, targets };
}

export function showBudgetName(id_budget, budgets) {
  if (budgets) {
    for (let item of budgets) {
      if (+item.id === +id_budget) {
        return item.title;
      }
    }
  }

  return "Budget was deleted";
}

export function getHistoryBudgetItems(budget_id, costs, incomes) {
  const historyCosts = [];
  const historyIncomes = [];

  if (Array.isArray(costs)) {
    for (const day of costs) {
      const forDay = day.items.filter((item) => +item.budget_id === +budget_id);
      if (forDay.length === 0) continue;
      const dayAmount = forDay.reduce((acc, item) => (acc += item.amount), 0);
      const dataItems = {
        date: forDay[0].date,
        amount: dayAmount,
        items: forDay,
      };
      historyCosts.push(dataItems);
    }
  }

  if (Array.isArray(incomes)) {
    for (const day of incomes) {
      const forDay = day.items.filter((item) => +item.budget_id === +budget_id);
      if (forDay.length === 0) continue;
      const dayAmount = forDay.reduce((acc, item) => (acc += item.amount), 0);
      const dataItems = {
        date: forDay[0].date,
        amount: dayAmount,
        items: forDay,
      };
      historyIncomes.push(dataItems);
    }
  }
  return { costs: historyCosts, incomes: historyIncomes };
}


export async function signOut(token) {
  return await fetch(ENDPOINTS.users.signOut, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEYS.API_KEY,
    },
    body: JSON.stringify({ token }),
  }).then((res) => res.json());
}