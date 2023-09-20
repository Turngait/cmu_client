import { ENDPOINTS } from "../../config/api";
import KEY from "../../config/key";

export async function addCostToAPI(newCost, token, setErrors) {
  return await fetch(ENDPOINTS.costs.add, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEY.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ cost: newCost }),
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

export async function addTargetToAPI(target, token, setError) {
  return await fetch(ENDPOINTS.costs.target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEY.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ target }),
  }).then(async (res) => {
    if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setError(errors[0].msg);
      }
    }

    return res.status;
  });
}

export async function deleteTargetFromAPI(id, token, setError) {
  return await fetch(ENDPOINTS.costs.target, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEY.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ id }),
  }).then(async (res) => {
    if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setError(errors[0].msg);
      }
    }

    return res.status;
  });
}

export async function editTargetFromAPI(target, token, setError) {
  return await fetch(ENDPOINTS.costs.target, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEY.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ target }),
  }).then(async (res) => {
    if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setError(errors[0].msg);
      }
    }

    return res.status;
  });
}

export function showGroupName(groups, itemId) {
  if (groups) {
    for (let group of groups) {
      if (group._id === itemId) {
        return group.title;
      }
    }
  }
  return "None";
}

export async function deleteCostItemService(cost, token) {
  // TODO Change on API URL
  return await fetch(ENDPOINTS.costs.delete, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEY.API_KEY,
      TOKEN: token,
    },
    body: JSON.stringify({ cost }),
    mode: "cors",
  }).then(async (res) => {
    return res.status === 200 ? true : false;
  });
}

export async function addGroupService(costGroup, token, setError) {
  return await fetch(ENDPOINTS.costs.addGroup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "API-KEY": KEY.API_KEY,
      TOKEN: token,
    },
    mode: "cors",
    body: JSON.stringify({ costGroup, token }),
  }).then(async (res) => {
    if (res.status === 202) {
      const data = await res.json();
      console.log(data);
      return true;
    } else if (res.status === 422) {
      const data = await res.json();
      if (data.errors) {
        const { errors } = data.errors;
        setError(errors[0].msg);
        return false;
      }
    } else {
      return false;
    }
  });
}

export function filteredCostByGroupIdService(groupId, costs) {
  if (!groupId) return null;

  const filteredCosts = [];
  for (const cost of costs) {
    filteredCosts.push(
      ...cost.items.filter((item) => item.group_id === groupId)
    );
  }
  return filteredCosts;
}

export function filteredCostByBudgetIdService(budgetId, costs) {
  if (!budgetId) return null;

  const filteredCosts = [];
  for (const cost of costs) {
    filteredCosts.push(
      ...cost.items.filter((item) => item.budget_id === budgetId)
    );
  }
  return filteredCosts;
}
