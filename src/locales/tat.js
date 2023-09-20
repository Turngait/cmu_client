import onboarding from "./onboarding/ru";

export default {
  common: {
    save: "Саклагыз",
    add: "Кушу",
    ok: "Ok",
    dashboard: "Статистика",
    costs: "Чыгымнар",
    costsByGroups: "Төркемнәр буенча чыгымнар",
    incomesBySources: "Доходы по источникам",
    incomes: "Керем",
    budgets: "Хисаплар",
    profile: "Профиль",
    groupManagement: "Төркемнәр",
    logout: "Чыгарга",
    inThisMonth: "Бу айда",
    today: "Көнгә",
    moreInfo: "Тасвирлау",
    closeDescr: "Ябу",
    description: "Тасвирлау",
    curr: "руб.",
    notEnoughData: "Мәгълүмат җитми",
    contacts: "Контактлар",
    noGroup: "Монда әле төркемнәр яки чыганаклар юк",
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
    signIn: "Керегез",
    signUp: "Теркәлергә",
    aboutBtn: "Турында",
    policy: "Политика обработки конфеденциальных данных",
    retrivePass: "Серсүзне торгызу",
    yourEmail: "Сезнең e-mail...",
    yourPass: "Сезнең серсүз...",
    yourName: "Сезнең исем...",
    accountTitle: "Хисап исеме...",
    initBalance: "Башлангыч баланс...",
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
    settings: "Көйләүләр",
    changeName: "Исемне үзгәртү",
    changePass: "Серсүзне алмаштырыгыз",
    oldPass: "Стаый пароль",
    newPass: "Новый пароль",
    groupsAndSourceManagement: "Управление группами и источниками",
    costsGroups: "Группы расходов",
    incomesSources: "Источники доходов",
    name: "Исем",
  },
  costs: {
    add: "Чыгым өстәгез",
    addGroup: "Төркем өстәү",
    title: "Исем",
    amount: "Сан",
    description: "Тасвирлау (кирәк түгел)",
    group: "Төркем",
    noCosts: "Пока еще нет ни одного расхода в этот период",
    budget: "Тикшерегез",
    filteredCostTitle: "Отфильтрованные расходы",
    total: "Барлыгы",
    targetsManagement: "Управление целями",
    addTarget: "Кушу",
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
    title: "Исем",
    amount: "Сан",
    description: "Тасвирлау (кирәк түгел)",
    source: "Источник",
    noIncomes: "Пока еще нет ни одного дохода в этот период",
    budget: "Тикшерегез",
    filteredIncomesTitle: "Отфильтрованные доходы",
    total: "Барлыгы",
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
    settings: "Көйләүләр",
    changeName: "Исемне үзгәртү",
    changePass: "Серсүзне алмаштырыгыз",
    name: "Исем",
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
