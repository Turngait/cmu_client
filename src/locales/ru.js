import onboarding from "./onboarding/ru";

export default {
  common: {
    save: "Сохранить",
    add: "Добавить",
    ok: "Ok",
    dashboard: "Статистика",
    costs: "Расходы",
    costsByGroups: "Расходы по группам",
    incomesBySources: "Доходы по источникам",
    incomes: "Доходы",
    budgets: "Счета",
    profile: "Профиль",
    groupManagement: "Группы",
    logout: "Выйти",
    inThisMonth: "В этом месяце",
    today: "За день",
    moreInfo: "Описание",
    closeDescr: "Закрыть",
    description: "Описание",
    curr: "руб.",
    notEnoughData: "Недостаточно данных",
    contacts: "Контакты",
    noGroup: "Здесь пока еще нет ни одной группы",
  },
  msg: {
    titleReg: "Заполните поле наименование",
    amountReg: "Заполните поле сумма",
  },
  dashboard: {
    notEnoughData:
      "Графики появятся после добавления доходов или расходов за три дня и более. Что бы добавить расход или доход перейдите из меню в соответствующий раздел",
  },
  index: {
    signIn: "Войти",
    signUp: "Регистрация",
    aboutBtn: "О программе",
    policy: "Политика обработки конфеденциальных данных",
    retrivePass: "Восстановить пароль",
    yourEmail: "Введите Ваш e-mail...",
    yourPass: "Введите Ваш пароль...",
    yourName: "Введите Ваше имя...",
    accountTitle: "Название учетной записи...",
    initBalance: "Изначальный баланс...",
    descAtSignUp: "Нажимая кнопку Регистрация Вы соглашаетесь с ",
    emailContact:
      "Если у Вас есть вопросы или предложения, Вы можете написать нам на ",
    about:
      "Это удобное приложение для ведения учета своих личных финансов. Здесь Вы сможете легко вести статистику своих финансов, работать с доходами, расходами и счетами. А еще оно абсолютно бесплатное.",
    about2:
      "Это приложение с открытым исходным кодом. Вы можете свободно использовать код в своих приложениях. Сам код вы можете найти в репозиториях:",
    secondAbout1:
      "С этим приложением Вы сможете легко отслеживать все Ваши доходы и расходы.",
    secondAbout2:
      "Графики статистики покажут Вам сколько Вы потратили или получили денежных средств каждый день.",
    secondAbout3:
      "В приложении Вы можете создавать несколько учетных записей что бы вести учет в разных валютах.",
    secondAbout4:
      "Оно абсолютно бесплатно. Что бы начать им пользоваться нужно только зарегестрироваться.",
    secondAbout5:
      "Данное приложение не является коммерческим продуктом и мы не продаем Ваши данные сторонним компаниям.",
    secondAbout6:
      "Наше приложение постоянно развивается и вносятся новые функциональные возможности.",
    secondAbout7:
      "Оно корректно отображается на различных устройствах и платформах.",
  },
  user: {
    balance: "Баланс",
    settings: "Настройки",
    changeName: "Изменить имя",
    changePass: "Изменить пароль",
    oldPass: "Стаый пароль",
    newPass: "Новый пароль",
    groupsAndSourceManagement: "Управление группами и источниками",
    costsGroups: "Группы расходов",
    incomesSources: "Источники доходов",
    name: "Имя",
  },
  costs: {
    add: "Добавить расход",
    addGroup: "Добавить группу",
    title: "Наименование",
    amount: "Колличество",
    description: "Описание (не обязательно)",
    group: "Группа",
    noCosts: "Пока еще нет ни одного расхода в этот период",
    budget: "Счет",
    filteredCostTitle: "Отфильтрованные расходы",
    total: "Всего",
    targetsManagement: "Управление целями",
    addTarget: "Добавить",
    targetTypeDay: "На каждый день",
    targetTypeMonth: "На каждый месяц",
    editTarget: "Редактировать цель",
    dailyTarget: "Цель на день",
    showMonthlyTarget: "Показать цели на месяц",
    hideMonthlyTarget: "Скрыть цели на месяц",
    targetExceeded: "Цель превышена",
  },
  incomes: {
    add: "Добавить доход",
    addSource: "Добавить источник",
    title: "Наименование",
    amount: "Колличество",
    description: "Описание (не обязательно)",
    source: "Источник",
    noIncomes: "Пока еще нет ни одного дохода в этот период",
    budget: "Счет",
    filteredIncomesTitle: "Отфильтрованные доходы",
    total: "Всего",
  },
  budgets: {
    createdAt: "Создано",
    add: "Добавить счет",
    edit: "Редактировать счет",
    title: "Наименование",
    initialBalance: "Изначальный баланс",
    isCalc: "Учитывать при подсчете баланса",
    history: "История по счету",
    gain: "Получено",
    spent: "Потрачено",
    noHistoryCosts: "Нет расходов за этот месяц",
    noHistoryIncomes: "Нет доходов за этот месяц",
  },
  accounts: {
    accounts: "Учетные записи",
    balance: "Баланс",
    add: "Добавить учетную запись",
    edit: "Редактировать учетную запись",
    title: "Наименование",
    initialBalance: "Изначальная сумма",
    description: "Описание (не обязательно)",
  },
  profile: {
    settings: "Настройки",
    changeName: "Сменить имя",
    changePass: "Поменять пароль",
    name: "Имя",
    oldPass: "Старый пароль",
    newPass: "Новый пароль",
  },
  notifications: {
    somethingWentWrong: "Что то пошло не так",
    targetAdded: "Цель добалвена",
    targetOnEdit: "Цель обновлена",
    targetOnDelete: "Цель удалена",
    costOnAdd: "Расход добавлен",
    costOnDelete: "Расход удален",
    accountOnAdd: "Учетная запись добавлена",
    accountOnDelete: "Учетная запись удалена",
    accountOnEdit: "Учетная запись обнавлена",
    budgetOnAdd: "Счет добавлен",
    budgetOnEdit: "Счет удален",
    budgetOnDelete: "Счет обнавлен",
    groupOnEdit: "Группа сохранена",
    groupOnDelete: "Группа удалена",
    sourceOnDelete: "Источник удален",
    incomeOnAdd: "Доход добавлен",
    incomeOnDelete: "Доход удален",
    nameOnChange: "Имя сохранено",
    passwordOnChange: "Новый пароль сохрнен",
  },
  onboarding,
};
