export function getCostByID(id, costs) {
  let cost = [];
  for (const days of costs) {
    cost = days.items.filter((item) => +item.id === +id);
    if (cost.length) return cost[0];
  }
  return cost;
}

export function showGroupName(id_group, groups) {
  if (groups) {
    for (let group of groups) {
      if (+group.id === id_group) {
        return group.title;
      }
    }
  }

  return "None";
}

export function addSumOfGroupsOnTargets(targets, items) {
  const { groups } = calculateGroupSum(items);
  for (const group of groups) {
    if(targets.month && targets.month.length) {
      for (const target of targets.month) {
        if (+target.group_id === +group.id) target.groupSum = group.sum;
      }
    }
  }

  return targets;
}

export function calculateGroupSum(items, type = "costs") {
  if (items) {
    if (type === "costs") {
      const { costs, groups } = items;
      for (const group of groups) {
        let groupSum = 0;
        for (const cost of costs) {
          for (const item of cost.items) {
            if (item.group_id === group.id) {
              groupSum += item.amount;
            }
          }
        }
        group.sum = groupSum;
      }
    } else if (type === "incomes") {
      const { incomes, sources } = items;
      for (const group of sources) {
        let groupSum = 0;
        for (const income of incomes) {
          for (const item of income.items) {
            if (item.source_id === group.id) {
              groupSum += item.amount;
            }
          }
        }
        group.sum = groupSum;
      }
    }
  }

  return items;
}