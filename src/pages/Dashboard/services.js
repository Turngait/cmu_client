import { ENDPOINTS } from "../../config/api";
import KEYS from "../../config/key";

export async function getFinData(token, period, accountID) {
  const { costs, incomes, budgets, accounts, status } = await fetch(
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
  if (status === 403) return null;

  return { costs, incomes, budgets, accounts };
}
