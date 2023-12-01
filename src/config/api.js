export const API_URL = "http://127.0.0.1:5000";
// export const API_URL = "http://194.67.104.32:5000";
export const EMAIL = "ilya_ry@yahoo.com";

function getEndpoints() {
  return {
    users: {
      signIn: API_URL + "/user/signin",
      signUp: API_URL + "/user/signup",
      signOut: API_URL + "/user/signout",
      changeName: API_URL + "/user/setname",
      changePass: API_URL + "/user/changepassword",
      getInitData: API_URL + "/user/getdata",
      recoveryPass: API_URL + "/user/restorepass",
    },
    costs: {
      add: API_URL + "/costs",
      delete: API_URL + "/costs",
      addGroup: API_URL + "/cost-group",
      deleteGroup: API_URL + "/cost-group",
      editGroup: API_URL + "/cost-group",
      target: API_URL + "/targets",
    },
    incomes: {
      add: API_URL + "/incomes",
      delete: API_URL + "/incomes",
      addSource: API_URL + "/income-source",
      deleteSource: API_URL + "/income-source",
      editSource: API_URL + "/income-source",
    },
    budgets: {
      add: API_URL + "/budgets",
      delete: API_URL + "/budgets",
      edit: API_URL + "/budgets",
    },
    accounts: {
      add: API_URL + "/accounts",
    },
    editGroup: API_URL + "/fin/group/edit",
    finData: API_URL + "/getfindata",
    test: API_URL + "/test",
  };
}

export const ENDPOINTS = getEndpoints();
