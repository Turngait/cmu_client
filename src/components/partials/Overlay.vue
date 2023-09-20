<template>
  <div class="overlay">
    <slot :logOut="logOut" :setFinDate="setFinDate"></slot>
  </div>
</template>

<script>
export default {
  name: "overlay-std",
  methods: {
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("accountId");
      this.$store.commit("user/resetState");
      this.$store.commit("costs/resetState");
      this.$store.commit("incomes/resetState");
      this.$router.push("/");
    },
    setFinDate(data, activeAccount) {
      this.$store.commit("costs/setCosts", data.costs.costs);
      this.$store.commit("costs/setGroups", data.costs.groups);
      this.$store.commit("user/setBudget", data.budgets);
      this.$store.commit("user/setBalance", activeAccount.balance);
      this.$store.commit("incomes/setIncomes", data.incomes.incomes);
      this.$store.commit("incomes/setSources", data.incomes.sources);
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  height: 100%;
}
</style>
