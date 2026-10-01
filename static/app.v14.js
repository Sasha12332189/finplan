const tg = window.Telegram?.WebApp;
tg?.ready(); tg?.expand();

const CURRENCIES = [
  ["EUR","Euro"],["GBP","British pound"],["CHF","Swiss franc"],["CZK","Czech koruna"],["DKK","Danish krone"],
  ["HUF","Hungarian forint"],["PLN","Polish zloty"],["RON","Romanian leu"],["SEK","Swedish krona"],["NOK","Norwegian krone"],
  ["ISK","Icelandic krona"],["UAH","Ukrainian hryvnia"],["RSD","Serbian dinar"],["ALL","Albanian lek"],["BAM","Bosnia and Herzegovina convertible mark"],
  ["MDL","Moldovan leu"],["MKD","North Macedonian denar"],["BYN","Belarusian ruble"],["RUB","Russian ruble"],["TRY","Turkish lira"],
  ["GEL","Georgian lari"],["AMD","Armenian dram"],["AZN","Azerbaijani manat"],["USD","US dollar"],["CAD","Canadian dollar"],["AUD","Australian dollar"],["JPY","Japanese yen"]
];

const I18N = {
  uk:{personalFinance:"ОСОБИСТІ ФІНАНСИ",subtitle:"Чіткий погляд на твої гроші без зайвого шуму.",currentBalance:"Поточний баланс",noBudget:"Місячний ліміт не задано",income:"Доходи",spent:"Витрати",thisMonth:"цього місяця",goals:"Цілі",addGoal:"Додати ціль",recentActivity:"Останні операції",seeAll:"Усі",addTransaction:"Додати операцію",moneyFlow:"РУХ ГРОШЕЙ",activity:"Операції",all:"Усі",markets:"РИНКИ",invest:"Інвестиції",investSubtitle:"Веди облік того, чим володієш. Ордери тут не надсилаються.",portfolioCost:"Вартість портфеля",realisedPnl:"Реалізований P/L",positions:"Позиції",addTrade:"Додати угоду",watchlist:"Список спостереження",findSecurity:"Знайти актив",searchPlaceholder:"AAPL, Microsoft, ETF…",marketDisclaimer:"Котирування можуть бути затримані. Лише облік, не інвестиційна порада.",plan:"План",cashFlow:"РУХ КОШТІВ",expense:"Витрата",amount:"Сума",quickCategories:"Швидкі категорії",category:"Категорія",note:"Нотатка",notePlaceholder:"Кава, зарплата, оренда…",saveTransaction:"Зберегти операцію",direction:"НАПРЯМ",newGoal:"Нова ціль",goalName:"Назва цілі",goalPlaceholder:"Резерв, авто…",targetAmount:"Цільова сума",alreadySaved:"Вже відкладено",createGoal:"Створити ціль",goalProgress:"ПРОГРЕС ЦІЛІ",savedAmount:"Відкладено",delete:"Видалити",save:"Зберегти",ledger:"ЖУРНАЛ",recordTrade:"Записати угоду",tradeNote:"Це лише запис у твоєму особистому журналі. Ордер брокеру не надсилається.",buy:"Купівля",sell:"Продаж",symbol:"Тікер",instrument:"Актив",quantity:"Кількість",price:"Ціна",fee:"Комісія",currency:"Валюта",assetType:"Тип",saveTrade:"Зберегти угоду",settings:"НАЛАШТУВАННЯ",account:"Акаунт",appearance:"Вигляд",system:"Системна",light:"Світла",dark:"Темна",language:"Мова",startingBalance:"Початковий баланс",balanceHint:"Баланс до всіх операцій, які записані у finplan.",monthlyLimit:"Місячний ліміт витрат",saveSettings:"Зберегти налаштування",saved:"Збережено",deleted:"Видалено",error:"Щось пішло не так",noTransactions:"Операцій ще немає.",noGoals:"Створи ціль і дай грошам напрям.",noPositions:"Відкритих позицій немає.",noWatchlist:"Список порожній.",remove:"Прибрати",addWatch:"Стежити",goalDone:"Ціль виконана",morning:"Доброго ранку",afternoon:"Добрий день",evening:"Добрий вечір",night:"Доброї ночі",exchange:"ОБМІН ВАЛЮТ",currencyConverter:"Конвертер валют",from:"З",to:"У",convert:"Конвертувати",assetDetails:"АКТИВ",addToPortfolio:"Додати в портфель",portfolioValue:"Вартість портфеля",unrealisedPnl:"Нереалізований P/L",portfolioLive:"Вартість оновлюється за доступними ринковими котируваннями.",loading:"Завантаження…",currentPrice:"Поточна ціна",exchangeName:"Біржа",assetCurrency:"Валюта активу",source:"Джерело",noChart:"Графік недоступний",added:"Додано",rate:"Курс",swap:"Поміняти місцями"},
  ru:{personalFinance:"ЛИЧНЫЕ ФИНАНСЫ",subtitle:"Чёткий взгляд на твои деньги без лишнего шума.",currentBalance:"Текущий баланс",noBudget:"Месячный лимит не задан",income:"Доходы",spent:"Расходы",thisMonth:"в этом месяце",goals:"Цели",addGoal:"Добавить цель",recentActivity:"Последние операции",seeAll:"Все",addTransaction:"Добавить операцию",moneyFlow:"ДВИЖЕНИЕ ДЕНЕГ",activity:"Операции",all:"Все",markets:"РЫНКИ",invest:"Инвестиции",investSubtitle:"Учитывай то, чем владеешь. Ордера здесь не отправляются.",portfolioCost:"Стоимость портфеля",realisedPnl:"Реализованный P/L",positions:"Позиции",addTrade:"Добавить сделку",watchlist:"Избранное",findSecurity:"Найти актив",searchPlaceholder:"AAPL, Microsoft, ETF…",marketDisclaimer:"Котировки могут быть задержаны. Только учёт, не инвестиционная рекомендация.",plan:"План",cashFlow:"ДВИЖЕНИЕ ДЕНЕГ",expense:"Расход",amount:"Сумма",quickCategories:"Быстрые категории",category:"Категория",note:"Заметка",notePlaceholder:"Кофе, зарплата, аренда…",saveTransaction:"Сохранить операцию",direction:"НАПРАВЛЕНИЕ",newGoal:"Новая цель",goalName:"Название цели",goalPlaceholder:"Резерв, авто…",targetAmount:"Целевая сумма",alreadySaved:"Уже отложено",createGoal:"Создать цель",goalProgress:"ПРОГРЕСС ЦЕЛИ",savedAmount:"Отложено",delete:"Удалить",save:"Сохранить",ledger:"ЖУРНАЛ",recordTrade:"Записать сделку",tradeNote:"Это только запись в личном журнале. Ордер брокеру не отправляется.",buy:"Покупка",sell:"Продажа",symbol:"Тикер",instrument:"Актив",quantity:"Количество",price:"Цена",fee:"Комиссия",currency:"Валюта",assetType:"Тип",saveTrade:"Сохранить сделку",settings:"НАСТРОЙКИ",account:"Аккаунт",appearance:"Вид",system:"Системная",light:"Светлая",dark:"Тёмная",language:"Язык",startingBalance:"Начальный баланс",balanceHint:"Баланс до всех операций, записанных в finplan.",monthlyLimit:"Месячный лимит расходов",saveSettings:"Сохранить настройки",saved:"Сохранено",deleted:"Удалено",error:"Что-то пошло не так",noTransactions:"Операций пока нет.",noGoals:"Создай цель и дай деньгам направление.",noPositions:"Открытых позиций нет.",noWatchlist:"Список пуст.",remove:"Убрать",addWatch:"Следить",goalDone:"Цель выполнена",morning:"Доброе утро",afternoon:"Добрый день",evening:"Добрый вечер",night:"Доброй ночи",exchange:"ОБМЕН ВАЛЮТ",currencyConverter:"Конвертер валют",from:"Из",to:"В",convert:"Конвертировать",assetDetails:"АКТИВ",addToPortfolio:"Добавить в портфель",portfolioValue:"Стоимость портфеля",unrealisedPnl:"Нереализованный P/L",portfolioLive:"Стоимость обновляется по доступным рыночным котировкам.",loading:"Загрузка…",currentPrice:"Текущая цена",exchangeName:"Биржа",assetCurrency:"Валюта актива",source:"Источник",noChart:"График недоступен",added:"Добавлено",rate:"Курс",swap:"Поменять местами"},
  en:{personalFinance:"PERSONAL FINANCE",subtitle:"A clear view of your money, without the noise.",currentBalance:"Current balance",noBudget:"No monthly limit set",income:"Income",spent:"Spent",thisMonth:"this month",goals:"Goals",addGoal:"Add goal",recentActivity:"Recent activity",seeAll:"See all",addTransaction:"Add transaction",moneyFlow:"MONEY FLOW",activity:"Activity",all:"All",markets:"MARKETS",invest:"Invest",investSubtitle:"Track what you own. No trades are placed here.",portfolioCost:"Portfolio cost",realisedPnl:"Realised P/L",positions:"Positions",addTrade:"Add trade",watchlist:"Watchlist",findSecurity:"Find a security",searchPlaceholder:"AAPL, Microsoft, ETF…",marketDisclaimer:"Market data may be delayed. Tracking only, not investment advice.",plan:"Plan",cashFlow:"CASH FLOW",expense:"Expense",amount:"Amount",quickCategories:"Quick categories",category:"Category",note:"Note",notePlaceholder:"Coffee, salary, rent…",saveTransaction:"Save transaction",direction:"DIRECTION",newGoal:"New goal",goalName:"Goal name",goalPlaceholder:"Emergency fund, car…",targetAmount:"Target amount",alreadySaved:"Already saved",createGoal:"Create goal",goalProgress:"GOAL PROGRESS",savedAmount:"Saved amount",delete:"Delete",save:"Save",ledger:"LEDGER",recordTrade:"Record a trade",tradeNote:"This records a trade in your personal ledger. It does not send an order to a broker.",buy:"Buy",sell:"Sell",symbol:"Symbol",instrument:"Instrument",quantity:"Quantity",price:"Price",fee:"Fee",currency:"Currency",assetType:"Type",saveTrade:"Save trade",settings:"SETTINGS",account:"Account",appearance:"Appearance",system:"System",light:"Light",dark:"Dark",language:"Language",startingBalance:"Starting balance",balanceHint:"This is your balance before transactions recorded in finplan.",monthlyLimit:"Monthly spending limit",saveSettings:"Save settings",saved:"Saved",deleted:"Deleted",error:"Something went wrong",noTransactions:"No transactions yet.",noGoals:"Create a goal and give your money a direction.",noPositions:"No open positions.",noWatchlist:"Your watchlist is empty.",remove:"Remove",addWatch:"Watch",goalDone:"Goal complete",morning:"Good morning",afternoon:"Good afternoon",evening:"Good evening",night:"Good night",exchange:"EXCHANGE",currencyConverter:"Currency converter",from:"From",to:"To",convert:"Convert",assetDetails:"ASSET",addToPortfolio:"Add to portfolio",portfolioValue:"Portfolio value",unrealisedPnl:"Unrealised P/L",portfolioLive:"Value updates from available market quotes.",loading:"Loading…",currentPrice:"Current price",exchangeName:"Exchange",assetCurrency:"Asset currency",source:"Source",noChart:"Chart unavailable",added:"Added",rate:"Rate",swap:"Swap"}
};

const EXTRA_I18N={
  uk:{settingsTitle:"Налаштування",settingsSubtitle:"Налаштуй FinPlan під свій спосіб роботи.",financeSettings:"Фінанси",telegramStatus:"Telegram Mini App",dataStorage:"Дані",dataStoredLocally:"Збережено у твоєму акаунті FinPlan",shareCalculator:"Купити на суму",shareCalculatorHint:"Вкажи суму покупки та ціну однієї акції. Кількість розрахується автоматично.",investmentAmount:"Сума покупки",tradeAmount:"Сума угоди",calculatedQuantity:"Кількість акцій",sharesYouGet:"Можна купити",shares:"акцій",positionsHint:"Середня ціна, кількість, ринкова вартість і P/L.",tradeHistory:"Історія угод",tradeHistoryHint:"Усі записані купівлі та продажі.",tradeTotal:"Сума угоди",findSecurityHint:"Знайди актив, щоб переглянути ціну та графік.",deleteTrade:"Видалити угоду",confirmDeleteTrade:"Видалити цю угоду? Після видалення історія портфеля буде перерахована.",buyShort:"Купівля",sellShort:"Продаж",avgCost:"Середня ціна",marketValue:"Ринкова вартість",costBasis:"Собівартість",quantityShort:"Кількість",currentPriceShort:"Поточна ціна",noTrades:"Угод ще немає.",investmentCapital:"Інвестиційний капітал",investmentCapitalHint:"Сума, яку ти окремо виділив із основного балансу для інвестицій.",availableToInvest:"Доступно для покупок",committedCapital:"Уже вкладено",transferFromBudget:"Розподілити з бюджету",returnToBudget:"Повернути в бюджет",capitalDialogTitle:"Капітал для інвестицій",capitalAmount:"Сума",capitalAllocate:"У інвестиції",capitalReturn:"У бюджет",capitalTransferHint:"Розподіл змінює доступний баланс плану, але не створює витрату.",hideKeyboard:"Сховати клавіатуру",capitalSaved:"Капітал оновлено",notEnoughCapital:"Недостатньо вільного інвестиційного капіталу."},
  ru:{settingsTitle:"Настройки",settingsSubtitle:"Настрой FinPlan под свой способ работы.",financeSettings:"Финансы",telegramStatus:"Telegram Mini App",dataStorage:"Данные",dataStoredLocally:"Сохранено в твоём аккаунте FinPlan",shareCalculator:"Купить на сумму",shareCalculatorHint:"Укажи сумму покупки и цену одной акции. Количество рассчитается автоматически.",investmentAmount:"Сумма покупки",tradeAmount:"Сумма сделки",calculatedQuantity:"Количество акций",sharesYouGet:"Можно купить",shares:"акций",positionsHint:"Средняя цена, количество, рыночная стоимость и P/L.",tradeHistory:"История сделок",tradeHistoryHint:"Все записанные покупки и продажи.",tradeTotal:"Сумма сделки",findSecurityHint:"Найди актив, чтобы посмотреть цену и график.",deleteTrade:"Удалить сделку",confirmDeleteTrade:"Удалить эту сделку? После удаления история портфеля будет пересчитана.",buyShort:"Покупка",sellShort:"Продажа",avgCost:"Средняя цена",marketValue:"Рыночная стоимость",costBasis:"Себестоимость",quantityShort:"Количество",currentPriceShort:"Текущая цена",noTrades:"Сделок пока нет.",investmentCapital:"Инвестиционный капитал",investmentCapitalHint:"Сумма, которую ты отдельно выделил из основного баланса для инвестиций.",availableToInvest:"Доступно для покупок",committedCapital:"Уже вложено",transferFromBudget:"Распределить из бюджета",returnToBudget:"Вернуть в бюджет",capitalDialogTitle:"Капитал для инвестиций",capitalAmount:"Сумма",capitalAllocate:"В инвестиции",capitalReturn:"В бюджет",capitalTransferHint:"Распределение меняет доступный баланс плана, но не создаёт расход.",hideKeyboard:"Скрыть клавиатуру",capitalSaved:"Капитал обновлён",notEnoughCapital:"Недостаточно свободного инвестиционного капитала."},
  en:{settingsTitle:"Settings",settingsSubtitle:"Make FinPlan fit the way you use it.",financeSettings:"Finance",telegramStatus:"Telegram Mini App",dataStorage:"Data",dataStoredLocally:"Saved to your FinPlan account",shareCalculator:"Buy for an amount",shareCalculatorHint:"Enter the purchase amount and price per share. Quantity is calculated automatically.",investmentAmount:"Purchase amount",tradeAmount:"Trade amount",calculatedQuantity:"Share quantity",sharesYouGet:"You can buy",shares:"shares",positionsHint:"Average cost, quantity, market value and P/L.",tradeHistory:"Trade history",tradeHistoryHint:"Every recorded buy and sell.",tradeTotal:"Trade total",findSecurityHint:"Search an asset to inspect its price and chart.",deleteTrade:"Delete trade",confirmDeleteTrade:"Delete this trade? Your portfolio history will be recalculated.",buyShort:"Buy",sellShort:"Sell",avgCost:"Average cost",marketValue:"Market value",costBasis:"Cost basis",quantityShort:"Quantity",currentPriceShort:"Current price",noTrades:"No trades yet.",investmentCapital:"Investment capital",investmentCapitalHint:"Money you explicitly set aside from your main balance for investing.",availableToInvest:"Available to invest",committedCapital:"Already invested",transferFromBudget:"Move from budget",returnToBudget:"Return to budget",capitalDialogTitle:"Investment capital",capitalAmount:"Amount",capitalAllocate:"To investments",capitalReturn:"To budget",capitalTransferHint:"This changes the plan balance without creating a spending transaction.",hideKeyboard:"Hide keyboard",capitalSaved:"Capital updated",notEnoughCapital:"Not enough free investment capital."}
};
Object.keys(EXTRA_I18N).forEach(lang=>Object.assign(I18N[lang],EXTRA_I18N[lang]));

const QUICK = {
  expense:["Food","Transport","Home","Shopping","Health","Fun","Bills","Subscriptions"],
  income:["Salary","Freelance","Gift","Bonus","Refund","Interest","Other"]
};
const QUICK_ICONS={Food:"🍴",Transport:"↗",Home:"⌂",Shopping:"⌑",Health:"＋",Fun:"◌",Bills:"▤",Subscriptions:"◫",Salary:"↑",Freelance:"⌁",Gift:"◇",Bonus:"✦",Refund:"↩",Interest:"%",Other:"•"};
const CAT_LABELS={uk:{Food:"Їжа",Transport:"Транспорт",Home:"Дім",Shopping:"Покупки",Health:"Здоров'я",Fun:"Розваги",Bills:"Рахунки",Subscriptions:"Підписки",Salary:"Зарплата",Freelance:"Фриланс",Gift:"Подарунок",Bonus:"Бонус",Refund:"Повернення",Interest:"Відсотки",Other:"Інше"},ru:{Food:"Еда",Transport:"Транспорт",Home:"Дом",Shopping:"Покупки",Health:"Здоровье",Fun:"Развлечения",Bills:"Счета",Subscriptions:"Подписки",Salary:"Зарплата",Freelance:"Фриланс",Gift:"Подарок",Bonus:"Бонус",Refund:"Возврат",Interest:"Проценты",Other:"Другое"},en:{Food:"Food",Transport:"Transport",Home:"Home",Shopping:"Shopping",Health:"Health",Fun:"Fun",Bills:"Bills",Subscriptions:"Subscriptions",Salary:"Salary",Freelance:"Freelance",Gift:"Gift",Bonus:"Bonus",Refund:"Refund",Interest:"Interest",Other:"Other"}};
const state={me:null,dashboard:null,transactions:[],filter:"all",goalEditing:null,capital:null};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=v=>String(v??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;",'"':"&quot;"}[c]));
const t=k=>(I18N[state.me?.language||localStorage.getItem("finplan_lang")||"uk"]||I18N.uk)[k]||k;
const fmt=(n,c="UAH")=>{try{return new Intl.NumberFormat(undefined,{style:"currency",currency:c,maximumFractionDigits:2}).format(Number(n||0))}catch{return `${Number(n||0).toFixed(2)} ${c}`}};
const toast=msg=>{const n=$("#toast");n.textContent=msg;n.classList.add("visible");clearTimeout(toast.timer);toast.timer=setTimeout(()=>n.classList.remove("visible"),2600)};

function deviceTheme(){return tg?.colorScheme||(window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light")}
function applyTheme(theme){const actual=theme==="system"?deviceTheme():theme;document.documentElement.dataset.theme=actual;tg?.setHeaderColor?.(actual==="dark"?"#101214":"#f4f3ee");tg?.setBackgroundColor?.(actual==="dark"?"#0b0d0e":"#f4f3ee");}
function applyLanguage(lang){document.documentElement.lang=lang;localStorage.setItem("finplan_lang",lang);$$("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(I18N[lang]?.[key])el.textContent=I18N[lang][key]});$$("[data-i18n-placeholder]").forEach(el=>{const key=el.dataset.i18nPlaceholder;if(I18N[lang]?.[key])el.placeholder=I18N[lang][key]});fillCurrencies();renderQuickCategories();renderHome();renderTransactions();if($('#invest-view')?.classList.contains('active'))loadInvest();if($('#settings-view')?.classList.contains('active'))syncSettingsForm();}
function fillCurrencies(){
  const lang=state.me?.language||localStorage.getItem("finplan_lang")||"uk";
  const names={uk:{EUR:"Євро",GBP:"Британський фунт",CHF:"Швейцарський франк",CZK:"Чеська крона",DKK:"Данська крона",HUF:"Угорський форинт",PLN:"Польський злотий",RON:"Румунський лей",SEK:"Шведська крона",NOK:"Норвезька крона",ISK:"Ісландська крона",UAH:"Українська гривня",RSD:"Сербський динар",ALL:"Албанський лек",BAM:"Конвертована марка",MDL:"Молдовський лей",MKD:"Македонський денар",BYN:"Білоруський рубель",RUB:"Російський рубель",TRY:"Турецька ліра",GEL:"Грузинський ларі",AMD:"Вірменський драм",AZN:"Азербайджанський манат",USD:"Долар США",CAD:"Канадський долар",AUD:"Австралійський долар",JPY:"Японська єна"},ru:{EUR:"Евро",GBP:"Британский фунт",CHF:"Швейцарский франк",CZK:"Чешская крона",DKK:"Датская крона",HUF:"Венгерский форинт",PLN:"Польский злотый",RON:"Румынский лей",SEK:"Шведская крона",NOK:"Норвежская крона",ISK:"Исландская крона",UAH:"Украинская гривна",RSD:"Сербский динар",ALL:"Албанский лек",BAM:"Конвертируемая марка",MDL:"Молдавский лей",MKD:"Македонский денар",BYN:"Белорусский рубль",RUB:"Российский рубль",TRY:"Турецкая лира",GEL:"Грузинский лари",AMD:"Армянский драм",AZN:"Азербайджанский манат",USD:"Доллар США",CAD:"Канадский доллар",AUD:"Австралийский доллар",JPY:"Японская иена"},en:Object.fromEntries(CURRENCIES)};
  const current={currency:$("#currency-select")?.value,investment:$("#investment-currency")?.value,base:$("#fx-base")?.value,quote:$("#fx-quote")?.value};
  const opts=CURRENCIES.map(([code,name])=>`<option value="${code}">${code} · ${names[lang]?.[code]||name}</option>`).join("");
  $("#currency-select").innerHTML=opts;$("#investment-currency").innerHTML=opts;$("#fx-base").innerHTML=opts;$("#fx-quote").innerHTML=opts;
  if(current.currency) $("#currency-select").value=current.currency;
  if(current.investment) $("#investment-currency").value=current.investment;
  if(current.base) $("#fx-base").value=current.base;
  if(current.quote) $("#fx-quote").value=current.quote;
  upgradeSelects();
}
function greeting(){const h=new Date().getHours();const key=h>=5&&h<12?"morning":h<17?"afternoon":h<23?"evening":"night";return `${t(key)}, ${state.me?.first_name||""}.`.trim()}
function bootError(title,detail){$("#home-view").innerHTML=`<div class="boot-error"><p class="eyebrow">FINPLAN</p><h1>${esc(title)}</h1><p>${esc(detail)}</p><button class="main-action" onclick="location.reload()">Retry</button></div>`}

async function api(path,options={}){
  const headers={"Content-Type":"application/json",...(options.headers||{})};
  const initData=tg?.initData||"";if(initData)headers["X-Telegram-Init-Data"]=initData;
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),10000);
  try{const r=await fetch(`/api${path}`,{...options,headers,signal:controller.signal});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.detail||`HTTP ${r.status}`);return data}
  catch(e){if(e.name==="AbortError")throw new Error("Server timeout");throw e}finally{clearTimeout(timeout)}
}
function openDialog(id){$("#"+id).showModal()}
function closeDialogs(){$$("dialog[open]").forEach(d=>d.close())}
$$("[data-close]").forEach(b=>b.addEventListener("click",closeDialogs));

function showView(name){dismissKeyboard({restore:false});$$('.view').forEach(v=>v.classList.toggle('active',v.id===`${name}-view`));$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));if(name==='activity')renderTransactions();if(name==='invest')loadInvest();window.scrollTo({top:0,behavior:'auto'})}
$$('[data-nav]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.nav)));

function activityRow(item){const positive=item.kind==='income';const title=item.note||item.category;const date=new Date(item.occurred_at).toLocaleDateString(state.me?.language==='en'?'en-GB':state.me?.language==='ru'?'ru-RU':'uk-UA',{day:'2-digit',month:'short'});return `<article class="activity"><span class="icon ${positive?'income-bg':'expense-bg'}">${positive?'↑':'↓'}</span><div class="copy"><strong>${esc(title)}</strong><span>${esc(item.category)} · ${date}</span></div><strong class="amount ${positive?'income':'expense'}">${positive?'+':'−'}${fmt(item.amount,state.me?.currency)}</strong><button class="row-more" data-delete-tx="${item.id}" aria-label="${t('delete')}">×</button></article>`}
function renderTransactions(){const list=state.transactions.filter(x=>state.filter==='all'||x.kind===state.filter);$("#transactions").innerHTML=list.length?list.map(activityRow).join(""):`<div class="empty">${t('noTransactions')}</div>`;$$('[data-delete-tx]').forEach(b=>b.onclick=()=>deleteTransaction(Number(b.dataset.deleteTx)))}
function renderGoals(goals,currency){$("#goals").innerHTML=goals.length?goals.map(g=>{const pct=Math.min(100,Number(g.saved_amount)/Number(g.target_amount)*100||0);return `<button class="goal" data-goal="${g.id}"><div class="goal-head"><span class="goal-name">${esc(g.title)}</span><span class="goal-percent">${pct>=100?t('goalDone'):pct.toFixed(0)+'%'}</span></div><div class="goal-meta"><span>${fmt(g.saved_amount,currency)}</span><span>${fmt(g.target_amount,currency)}</span></div><div class="goal-bar"><i style="width:${pct}%"></i></div></button>`}).join(""):`<div class="empty">${t('noGoals')}</div>`;$$('[data-goal]').forEach(b=>b.onclick=()=>editGoal(Number(b.dataset.goal)))}
function renderQuickCategories(){const kind=$("#transaction-form [name=kind]").value;$("#quick-categories").innerHTML=QUICK[kind].map(c=>`<button type="button" class="quick-chip" data-cat="${c}"><span>${QUICK_ICONS[c]||'•'}</span>${CAT_LABELS[state.me?.language||'uk']?.[c]||c}</button>`).join("");$$('[data-cat]').forEach(b=>b.onclick=()=>{$("#transaction-form [name=category]").value=b.dataset.cat;$$('[data-cat]').forEach(x=>x.classList.toggle('active',x===b))})}

async function loadHome(){const [me,dash,tx]=await Promise.all([api('/me'),api('/dashboard'),api('/transactions')]);state.me=me;state.dashboard=dash;state.transactions=tx;localStorage.setItem('finplan_lang',me.language||'uk');applyTheme(me.theme||'system');applyLanguage(me.language||'uk');$("#greeting").textContent=greeting();$("#currency-pill").textContent=dash.currency;$("#balance").textContent=fmt(dash.balance,dash.currency);$("#income").textContent=fmt(dash.income,dash.currency);$("#expenses").textContent=fmt(dash.expenses,dash.currency);const budget=Number(me.monthly_budget||0),spent=Number(dash.expenses||0);if(dash.budget_left===null){$("#budget-status").textContent=t('noBudget');$("#budget-percent").textContent="";$("#budget-progress").style.width='0%'}else{const pct=Math.min(100,budget?spent/budget*100:0);$("#budget-status").textContent=`${fmt(Math.max(0,Number(dash.budget_left)),dash.currency)} · ${t('spent').toLowerCase()}`;$("#budget-percent").textContent=`${pct.toFixed(0)}%`;$("#budget-progress").style.width=`${pct}%`}renderGoals(dash.goals,dash.currency);$("#recent-transactions").innerHTML=tx.slice(0,5).map(activityRow).join("")||`<div class="empty">${t('noTransactions')}</div>`;syncSettingsForm()}
function renderHome(){$("#greeting").textContent=greeting()}
function syncSettingsForm(){if(!state.me)return;const f=$("#settings-form");f.currency.value=state.me.currency;syncSelectFace(f.currency);$('#settings-language').value=state.me.language||'uk';$('#settings-theme').value=state.me.theme||'system';f.opening_balance.value=state.me.opening_balance??0;f.monthly_budget.value=state.me.monthly_budget??'';$("#profile-name").textContent=state.me.first_name||'finplan';$("#profile-username").textContent=state.me.username?`@${state.me.username}`:'Telegram account';$("#profile-avatar").textContent=(state.me.first_name||'F').slice(0,1).toUpperCase();$$('[data-theme]').forEach(b=>b.classList.toggle('active',b.dataset.theme===(state.me.theme||'system')));$$('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===(state.me.language||'uk')))}

async function deleteTransaction(id){try{await api(`/transactions/${id}`,{method:'DELETE'});toast(t('deleted'));await loadHome();if($('#activity-view').classList.contains('active'))renderTransactions()}catch(e){toast(e.message)}}
async function editGoal(id){const g=state.dashboard?.goals.find(x=>x.id===id);if(!g)return;state.goalEditing=g;$("#goal-edit-title").textContent=g.title;$("#goal-edit-form [name=id]").value=id;$("#goal-edit-form [name=saved_amount]").value=g.saved_amount;openDialog('goal-edit-dialog')}

async function loadInvest(){
  try{
    const [portfolio,trades,capital]=await Promise.all([api('/portfolio'),api('/investments/transactions'),api('/investments/capital')]);
    state.capital=capital;
    const positions=portfolio.positions||[];
    const totalValue=Number(portfolio.total_current_value||0);
    const totalCost=Number(portfolio.total_cost_basis||0);
    const totalUnrealised=Number(portfolio.total_unrealised_pnl||0);
    const realised=Object.entries(portfolio.totals_by_currency||{}).reduce((a,[currency,v])=>a+Number(v.realised_pnl||0)*Number(portfolio.conversion_rates?.[currency]||0),0);
    const accountCurrency=portfolio.account_currency||state.me?.currency||'USD';
    $('#portfolio-value').textContent=positions.length?fmt(totalValue,accountCurrency):'—';
    $('#portfolio-cost-line').textContent=positions.length?`${t('costBasis')}: ${fmt(totalCost,accountCurrency)}`:'—';
    $('#portfolio-pnl').textContent=positions.length?`${totalUnrealised>=0?'+':''}${fmt(totalUnrealised,accountCurrency)}`:'—';
    $('#portfolio-pnl').className=totalUnrealised>=0?'positive':'negative';
    $('#portfolio-pnl-percent').textContent=totalCost>0?`${totalUnrealised>=0?'+':''}${(totalUnrealised/totalCost*100).toFixed(2)}%`:'';
    $('#position-count').textContent=String(positions.length);
    $('#realised-pnl').textContent=trades.length?`${realised>=0?'+':''}${fmt(realised,accountCurrency)}`:'—';
    $('#realised-pnl').className=realised>=0?'positive':'negative';
    const capitalCurrency=capital.currency||accountCurrency;
    $('#investment-capital').textContent=fmt(capital.capital,capitalCurrency);
    $('#investment-available').textContent=fmt(capital.available,capitalCurrency);
    $('#investment-committed').textContent=capital.committed>0?`${t('committedCapital')}: ${fmt(capital.committed,capitalCurrency)}`:t('availableToInvest');
    $('#investment-main-balance').textContent=`${t('currentBalance')}: ${fmt(capital.main_balance,capitalCurrency)}`;
    $('#positions').innerHTML=positions.length?positions.map(p=>{
      const pnl=Number(p.unrealised_pnl||0), pct=Number(p.cost_basis)>0?pnl/Number(p.cost_basis)*100:0;
      return `<article class="position position-card"><button class="position-main" data-asset-symbol="${esc(p.symbol)}" data-asset-name="${esc(p.name)}" data-asset-type="${esc(p.asset_type)}"><span class="ticker">${esc(p.symbol.slice(0,5))}</span><div class="pos-main"><strong>${esc(p.symbol)}</strong><span>${esc(p.name)}</span></div></button><div class="position-grid"><div><span>${t('quantityShort')}</span><strong>${Number(p.quantity).toLocaleString(undefined,{maximumFractionDigits:8})}</strong></div><div><span>${t('avgCost')}</span><strong>${fmt(p.average_cost,p.currency)}</strong></div><div><span>${t('marketValue')}</span><strong>${p.current_value!=null?fmt(p.current_value,p.currency):'—'}</strong></div><div><span>P/L</span><strong class="${pnl>=0?'positive':'negative'}">${p.unrealised_pnl!=null?`${pnl>=0?'+':''}${fmt(pnl,p.currency)} · ${pnl>=0?'+':''}${pct.toFixed(2)}%`:'—'}</strong></div></div></article>`;
    }).join(''):`<div class="empty">${t('noPositions')}</div>`;
    $('#investment-history').innerHTML=trades.length?trades.map(tr=>{
      const side=tr.side==='BUY', total=Number(tr.quantity)*Number(tr.price)+Number(tr.fee||0);
      const date=new Date(tr.occurred_at).toLocaleDateString(state.me?.language==='en'?'en-GB':state.me?.language==='ru'?'ru-RU':'uk-UA',{day:'2-digit',month:'short',year:'numeric'});
      return `<article class="trade-row"><div class="trade-side ${side?'buy-side':'sell-side'}">${side?'↑':'↓'}</div><div class="trade-copy"><strong>${esc(tr.symbol)} · ${side?t('buyShort'):t('sellShort')}</strong><span>${esc(tr.instrument_name)} · ${date}</span></div><div class="trade-numbers"><strong>${Number(tr.quantity).toLocaleString(undefined,{maximumFractionDigits:8})} × ${fmt(tr.price,tr.currency)}</strong><span>${fmt(total,tr.currency)}</span></div><button class="trade-delete" data-delete-trade="${tr.id}" aria-label="${t('deleteTrade')}">×</button></article>`;
    }).join(''):`<div class="empty">${t('noTrades')}</div>`;
    $$('.position-main').forEach(b=>b.onclick=()=>openAsset(b.dataset.assetSymbol,b.dataset.assetName,b.dataset.assetType));
    $$('[data-delete-trade]').forEach(b=>b.onclick=()=>deleteInvestmentTrade(Number(b.dataset.deleteTrade)));
  }catch(e){toast(e.message)}
}

async function deleteInvestmentTrade(id){
  if(!confirm(t('confirmDeleteTrade')))return;
  try{await api(`/investments/transactions/${id}`,{method:'DELETE'});toast(t('deleted'));await loadInvest()}catch(e){toast(e.message)}
}


function upgradeSelects(){
  $$('select').forEach(select=>{
    let shell=select.parentElement?.classList.contains('select-shell')?select.parentElement:null;
    if(!shell){
      shell=document.createElement('div');
      shell.className='select-shell';
      select.parentNode.insertBefore(shell,select);
      shell.appendChild(select);
      const face=document.createElement('button');
      face.type='button';
      face.className='select-face';
      face.setAttribute('aria-hidden','true');
      face.tabIndex=-1;
      face.innerHTML='<span class="select-face__value"></span><svg class="select-face__chevron" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.5 6.75 9 11.25l4.5-4.5"/></svg>';
      shell.appendChild(face);
      select.addEventListener('change',()=>syncSelectFace(select));
    }
    syncSelectFace(select);
  });
}
function syncSelectFace(select){
  const face=select.parentElement?.querySelector('.select-face__value');
  if(face) face.textContent=select.selectedOptions?.[0]?.textContent?.trim()||'';
}

function updateTradeTotal(){const amount=Number($('#investment-form [name=trade_amount]')?.value||0),p=Number($('#investment-form [name=price]')?.value||0),f=Number($('#investment-form [name=fee]')?.value||0),q=amount>0&&p>0?amount/p:0;const qField=$('#investment-form [name=quantity]');if(qField)qField.value=q>0?q.toFixed(8):'';if($('#trade-quantity'))$('#trade-quantity').textContent=q>0?q.toLocaleString(undefined,{maximumFractionDigits:8}):'—';if($('#trade-total'))$('#trade-total').textContent=amount>0?fmt(amount+f,$('#investment-form [name=currency]').value||'USD'):'—'}

let assetState={symbol:null,name:null,type:'Stock',info:null,range:'1mo'};
async function openAsset(symbol,name,type='Stock'){
  assetState={symbol,name,type:type||'Stock',info:null,range:'1mo'};
  $("#asset-title").textContent=symbol;$("#asset-subtitle").textContent=name||'';$("#asset-price").textContent=t('loading');$("#asset-change").textContent='';$("#asset-meta").innerHTML='';$("#asset-add").disabled=true;openDialog('asset-dialog');
  try{const info=await api(`/markets/instruments/${encodeURIComponent(symbol)}`);assetState.info=info;renderAssetInfo();await loadChart('1mo');}catch(e){toast(e.message);$("#asset-price").textContent='—'}
}
function renderAssetInfo(){const i=assetState.info;if(!i)return;$("#asset-price").textContent=fmt(i.price,i.currency);const sign=Number(i.change)>=0?'+':'';$("#asset-change").textContent=`${sign}${Number(i.change||0).toFixed(2)} · ${sign}${Number(i.change_percent||0).toFixed(2)}%`;$("#asset-change").className=Number(i.change)>=0?'positive':'negative';$("#asset-meta").innerHTML=`<div><span>${t('currentPrice')}</span><strong>${fmt(i.price,i.currency)}</strong></div><div><span>${t('assetCurrency')}</span><strong>${esc(i.currency)}</strong></div><div><span>${t('exchangeName')}</span><strong>${esc(i.exchange||'—')}</strong></div><div><span>${t('source')}</span><strong>${esc(i.source||'—')}</strong></div>`;$("#asset-add").disabled=false}
async function loadChart(range){if(!assetState.symbol)return;assetState.range=range;$$('#chart-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.range===range));try{const data=await api(`/markets/instruments/${encodeURIComponent(assetState.symbol)}/history?range=${range}`);drawChart(data.points||[])}catch(e){drawChart([])}}
function drawChart(points){const canvas=$("#asset-chart"),ctx=canvas.getContext('2d');const rect=canvas.getBoundingClientRect();const dpr=window.devicePixelRatio||1;canvas.width=Math.max(1,rect.width*dpr);canvas.height=210*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,rect.width,210);if(!points.length){ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--muted');ctx.font='13px system-ui';ctx.fillText(t('noChart'),16,100);return}const values=points.map(p=>Number(p.price));const min=Math.min(...values),max=Math.max(...values),pad=16;const w=rect.width-pad*2,h=175;const x=i=>pad+(i/(values.length-1||1))*w;const y=v=>20+(max===min?85:(max-v)/(max-min))*h;ctx.beginPath();values.forEach((v,i)=>{const xx=x(i),yy=y(v);i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)});ctx.lineWidth=2.5;ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--green2');ctx.stroke();ctx.lineTo(x(values.length-1),195);ctx.lineTo(x(0),195);ctx.closePath();const grad=ctx.createLinearGradient(0,20,0,195);grad.addColorStop(0,'rgba(120,144,124,.28)');grad.addColorStop(1,'rgba(120,144,124,0)');ctx.fillStyle=grad;ctx.fill();}

async function convertFX(){const base=$("#fx-base").value,quote=$("#fx-quote").value,amount=Number($("#fx-amount").value||0);if(amount<=0){toast(t('amount'));return}$("#fx-result").textContent=t('loading');try{const r=await api('/fx/convert',{method:'POST',body:JSON.stringify({base,quote,amount})});$("#fx-result").textContent=fmt(r.result,quote);$("#fx-rate-label").textContent=`1 ${base} = ${Number(r.rate).toLocaleString(undefined,{maximumFractionDigits:6})} ${quote}`;$("#fx-source").textContent=r.source||''}catch(e){toast(e.message)}}
async function submitForm(event,endpoint,method,after){event.preventDefault();const form=event.currentTarget;if(form.id==='investment-form'){updateTradeTotal();const amount=Number(form.trade_amount?.value||0),price=Number(form.price?.value||0),quantity=Number(form.quantity?.value||0);if(amount<=0||price<=0||quantity<=0){toast(t('amount'));return false}}const values=Object.fromEntries(new FormData(form));for(const [k,v] of Object.entries(values))if(v==='')values[k]=null;['amount','target_amount','saved_amount','quantity','price','fee','trade_amount','monthly_budget','opening_balance'].forEach(k=>{if(values[k]!=null)values[k]=Number(values[k])});delete values.trade_amount;try{await api(endpoint,{method,body:JSON.stringify(values)});if(form.closest('dialog'))form.closest('dialog').close();toast(t('saved'));await after();return true}catch(e){toast(e.message);return false}}

const capitalDirection=()=>$('#investment-capital-direction')?.value||'allocate';
function syncCapitalDialog(){
  const direction=capitalDirection();
  $('#investment-capital-action').textContent=direction==='allocate'?t('capitalAllocate'):t('capitalReturn');
  $('#investment-capital-hint').textContent=t('capitalTransferHint');
  $$('#capital-transfer-toggle button').forEach(b=>b.classList.toggle('active',b.dataset.direction===direction));
  const c=state.capital;
  if(c){$('#capital-dialog-available').textContent=direction==='allocate'?`${t('currentBalance')}: ${fmt(c.main_balance,c.currency)}`:`${t('availableToInvest')}: ${fmt(c.available,c.currency)}`;}
}
$$('#capital-transfer-toggle button').forEach(b=>b.addEventListener('click',()=>{$('#investment-capital-direction').value=b.dataset.direction;syncCapitalDialog()}));
$('#investment-capital-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const amount=Number($('#investment-capital-form [name=amount]').value||0);
  if(amount<=0){toast(t('amount'));return}
  const button=$('#investment-capital-action');button.classList.add('is-saving');
  try{await api('/investments/capital',{method:'POST',body:JSON.stringify({amount,direction:capitalDirection()})});$('#investment-capital-form').reset();closeDialogs();toast(t('capitalSaved'));await loadHome();if($('#invest-view').classList.contains('active'))await loadInvest();}
  catch(err){toast(err.message)}finally{button.classList.remove('is-saving')}
});

$('#transaction-form').addEventListener('submit',e=>submitForm(e,'/transactions','POST',loadHome));
$('#goal-form').addEventListener('submit',e=>submitForm(e,'/goals','POST',loadHome));
$('#investment-form').addEventListener('submit',e=>submitForm(e,'/investments/transactions','POST',loadInvest));
$('#settings-form').addEventListener('submit',async e=>{
  const button=e.currentTarget.querySelector('[type=submit]');
  button?.classList.remove('is-saved');
  button?.classList.add('is-saving');
  const ok=await submitForm(e,'/me','PATCH',loadHome);
  button?.classList.remove('is-saving');
  if(ok){
    button?.classList.add('is-saved');
    setTimeout(()=>button?.classList.remove('is-saved'),1800);
  }
  syncSettingsForm();
});
$('#goal-edit-form').addEventListener('submit',async e=>{e.preventDefault();const id=Number($('#goal-edit-form [name=id]').value);const saved=Number($('#goal-edit-form [name=saved_amount]').value);try{await api(`/goals/${id}?saved_amount=${encodeURIComponent(saved)}`,{method:'PATCH'});closeDialogs();toast(t('saved'));await loadHome()}catch(err){toast(err.message)}});
$('#delete-goal').onclick=async()=>{if(!state.goalEditing)return;try{await api(`/goals/${state.goalEditing.id}`,{method:'DELETE'});closeDialogs();toast(t('deleted'));await loadHome()}catch(e){toast(e.message)}};
$('#settings-button').onclick=()=>showView('settings');
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.open==='transaction-dialog'){renderQuickCategories();$('#transaction-form').reset();$('#transaction-form [name=kind]').value='expense';$$('.segment').forEach((x,i)=>x.classList.toggle('active',i===0));renderQuickCategories()}if(b.dataset.open==='investment-dialog'){const f=$('#investment-form');if(!f.symbol.value){f.reset();upgradeSelects();}f.side.value=f.side.value||'BUY';syncSelectFace(f.currency);updateTradeTotal();}if(b.dataset.open==='investment-capital-dialog'){syncCapitalDialog();$('#investment-capital-form [name=amount]').value='';}openDialog(b.dataset.open)}));
$$('.segment').forEach(b=>b.onclick=()=>{$$('.segment').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#transaction-form [name=kind]').value=b.dataset.kind;renderQuickCategories()});
$$('.trade').forEach(b=>b.onclick=()=>{$$('.trade').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#investment-form [name=side]').value=b.dataset.side});
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.filter=b.dataset.filter;renderTransactions()});
$$('[data-theme]').forEach(b=>b.onclick=()=>{state.me.theme=b.dataset.theme;$('#settings-theme').value=b.dataset.theme;applyTheme(b.dataset.theme);$$('[data-theme]').forEach(x=>x.classList.toggle('active',x===b))});
$$('[data-lang]').forEach(b=>b.onclick=()=>{state.me.language=b.dataset.lang;$('#settings-language').value=b.dataset.lang;applyLanguage(b.dataset.lang);syncSettingsForm()});

let timer,searchSeq=0;$('#instrument-search').addEventListener('input',e=>{clearTimeout(timer);const q=e.target.value.trim();const seq=++searchSeq;if(q.length<2){$('#search-results').innerHTML='';return}timer=setTimeout(async()=>{try{const results=await api(`/markets/search?q=${encodeURIComponent(q)}`);if(seq!==searchSeq||$('#instrument-search').value.trim()!==q)return;$('#search-results').innerHTML=results.map(i=>`<div class="search-result"><button class="search-main" data-symbol="${esc(i.symbol)}" data-name="${esc(i.name)}" data-type="${esc(i.type)}"><span class="ticker">${esc(i.symbol.slice(0,5))}</span><span><strong>${esc(i.symbol)}</strong><span>${esc(i.name)} · ${esc(i.type)}</span></span><span class="search-arrow">›</span></button></div>`).join('')||`<div class="empty">No instruments found.</div>`;$$('.search-main').forEach(b=>b.onclick=()=>openAsset(b.dataset.symbol,b.dataset.name,b.dataset.type))}catch(err){if(seq===searchSeq)$('#search-results').innerHTML=`<div class="empty">${esc(err.message)}</div>`}},300)});

['input','change'].forEach(evt=>$('#investment-form').addEventListener(evt,e=>{if(e.target.matches('[name=trade_amount],[name=price],[name=fee],[name=currency]'))updateTradeTotal()}));updateTradeTotal();upgradeSelects();

$("#exchange-button").onclick=()=>{fillCurrencies();$("#fx-base").value=state.me?.currency||'EUR';$("#fx-quote").value=state.me?.currency==='EUR'?'USD':'EUR';syncSelectFace($("#fx-base"));syncSelectFace($("#fx-quote"));$("#fx-amount").value='1';openDialog('exchange-dialog');convertFX()};$("#fx-convert").onclick=convertFX;$("#fx-swap").onclick=()=>{const a=$("#fx-base").value;$("#fx-base").value=$("#fx-quote").value;$("#fx-quote").value=a;syncSelectFace($("#fx-base"));syncSelectFace($("#fx-quote"));convertFX()};["#fx-base","#fx-quote"].forEach(id=>$(id).addEventListener('change',convertFX));$("#fx-amount").addEventListener('input',()=>{clearTimeout(window.fxTimer);window.fxTimer=setTimeout(convertFX,250)});
$$('#chart-tabs button').forEach(b=>b.onclick=()=>loadChart(b.dataset.range));$("#asset-add").onclick=()=>{const i=assetState.info;if(!i)return;const f=$("#investment-form");f.reset();f.side.value='BUY';f.symbol.value=i.symbol;f.instrument_name.value=i.name;f.asset_type.value=assetState.type||'Stock';f.trade_amount.value=i.price;f.price.value=i.price;f.currency.value=i.currency;syncSelectFace(f.currency);updateTradeTotal();$$('.trade').forEach((x,j)=>x.classList.toggle('active',j===0));closeDialogs();openDialog('investment-dialog')};
setInterval(()=>{if($('#invest-view')?.classList.contains('active'))loadInvest()},60000);
const keyboardState={focused:null,open:false,raf:0};
function keyboardIsOpen(){const vv=window.visualViewport;return !!vv&&((window.innerHeight-vv.height)>110||document.body.classList.contains('keyboard-focus'))}
function setKeyboardOpen(open){if(keyboardState.open===open)return;keyboardState.open=open;document.body.classList.toggle('keyboard-open',open);$('#keyboard-dismiss')?.toggleAttribute('hidden',!open);}
function centerFocusedInput(){
  const el=keyboardState.focused;
  if(!el||el.id!=='instrument-search'||!keyboardState.open)return;
  cancelAnimationFrame(keyboardState.raf);
  keyboardState.raf=requestAnimationFrame(()=>{
    const vv=window.visualViewport; if(!vv)return;
    const r=el.getBoundingClientRect();
    const visibleBottom=vv.height-76;
    const desiredTop=Math.max(86,Math.min(visibleBottom-72,(visibleBottom+86)/2-r.height/2));
    const delta=r.top-desiredTop;
    if(Math.abs(delta)>18)window.scrollBy(0,delta);
  });
}
function dismissKeyboard({restore=true}={}){
  const active=document.activeElement;
  if(active&&/^(INPUT|TEXTAREA)$/.test(active.tagName))active.blur();
  document.body.classList.remove('keyboard-focus');
  setKeyboardOpen(false);
  if(restore)requestAnimationFrame(()=>window.scrollTo(0,Math.max(0,window.scrollY)));
}
document.addEventListener('focusin',e=>{
  if(!/^(INPUT|TEXTAREA)$/.test(e.target.tagName))return;
  keyboardState.focused=e.target;
  document.body.classList.add('keyboard-focus');
  setKeyboardOpen(true);
  if(e.target.id==='instrument-search')setTimeout(centerFocusedInput,120);
});
document.addEventListener('focusout',e=>{
  if(e.target!==keyboardState.focused)return;
  setTimeout(()=>{if(!document.activeElement||!/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)){document.body.classList.remove('keyboard-focus');setKeyboardOpen(false);keyboardState.focused=null;}},220);
});
window.visualViewport?.addEventListener('resize',()=>{const open=keyboardIsOpen();setKeyboardOpen(open);if(open)centerFocusedInput()});
$('#keyboard-dismiss')?.addEventListener('click',()=>dismissKeyboard({restore:false}));
window.addEventListener('online',()=>toast('Online'));window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.me?.theme==='system')applyTheme('system')});tg?.onEvent?.('themeChanged',()=>{if(state.me?.theme==='system')applyTheme('system')});tg?.onEvent?.('viewportChanged',()=>{if(keyboardState.open)centerFocusedInput()});

fillCurrencies();
loadHome().catch(e=>{console.error(e);if(!tg)bootError('Open finplan in Telegram','Open this Mini App from Telegram.');else if(!tg.initData)bootError('Telegram auth is missing','Close the Mini App and open it again from the finplan button.');else bootError('Connection failed',e.message||'API unavailable')});
