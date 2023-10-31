import {ref, onMounted} from 'vue';

import { ENDPOINTS } from "../../../config/api";
import KEYS from "../../../config/key";

export async function useData(token, period, accountID) {
  const costsRef = ref();
  const incomesRef = ref({});
  const budgetsRef = ref({});
  const accountsRef = ref({});

  const getData = async () => {
    const { costs, incomes, budgets, accounts, status } = await fetch(
      ENDPOINTS.finData,
      {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ period: period.value, accountID }),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "API-KEY": KEYS.API_KEY,
          TOKEN: token,
        },
      }
    ).then((res) => res.json());
    if (status === 403) {
      return null;
    } else {
      costsRef.value = costs;
      incomesRef.value = incomes;
      budgetsRef.value = budgets;
      accountsRef.value = accounts;
      return;
    }
  }

  onMounted(await getData());

  return { costs: costsRef.value, incomes: incomesRef.value, budgets: budgetsRef.value, accounts: accountsRef.value };
}