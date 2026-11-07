const $ = s => document.querySelector(s);
const fill = (sel, list, tpl) => $(sel).innerHTML = list.map(tpl).join('');

/* ---------- данные ---------- */
const stats = [[1960,'','год основания завода'],[66,' лет','выпускаем овощные консервы'],[100,' км','к северу от Саратова'],
  [22000,'','единиц продукции в сутки'],[10,'','позиций в обновлённой линейке'],[19,'','городов в географии продаж']];
const history = [['1960','Основание завода','Консервный завод открыт в р.п. Базарный Карабулак на севере Саратовской области.'],
  ['2007','Модернизация','Смена собственника, обновление производства, выпуск под маркой «Карабуэль».'],
  ['Награда','Золото «Продэкспо»','Кабачковая икра «Карабуэль» получила золотую медаль выставки.'],
  ['2026','Новый этап','Обновлённый бренд, линейка соусов и соков, маркировка «Честный знак».']];
const facilities = [['Производственный корпус','Переработка овощей, фасовка и стерилизация консервов'],['Овощехранилище','Хранение свежего урожая перед переработкой'],
  ['Склады','Хранение готовой продукции и сборка отгрузок'],['Своя котельная','Тепло и пар для варки и стерилизации'],
  ['Собственная земля','Земельный участок завода в Базарном Карабулаке']];
const steps = [['Приёмка сырья','Овощи с местных полей проходят контроль качества.'],['Подготовка','Мойка, сортировка и очистка овощей.'],
  ['Обжарка и варка','Кабачки обжариваем, продукт уваривают по рецептуре ГОСТ.'],['Фасовка в стекло','Банка 480 г для консервов, бутылка для соков.'],
  ['Стерилизация','Укупорка и стерилизация без консервантов.'],['Хранение и отгрузка','Склад готовой продукции, отгрузка партнёрам.']];
const quality = [['ГОСТ','Кабачковая икра — высший сорт по ГОСТ 2654-2017, паста и соусы — по ГОСТ.'],
  ['Чистый состав','Без загустителей, красителей, усилителей вкуса и консервантов.'],
  ['«Честный знак»','Подключаем обязательную маркировку продукции.'],['Награда','Золотая медаль «Продэкспо» за кабачковую икру.']];
const cities = 'Саратов,Москва,Санкт-Петербург,Самара,Пенза,Волгоград,Ульяновск,Екатеринбург,Челябинск,Омск,Новосибирск,Ижевск,Калуга,Кемерово,Красноярск,Курган,Иваново,Ярославль,Тверь'.split(',');
// [название, объём, тип (c — консервы, s — соки), описание, файл]
const products = [
  ['Кабачковая икра','480 г','c','Высший сорт по ГОСТ, золотая медаль «Продэкспо».','j0'],
  ['Томатная паста','480 г','c','Насыщенная паста из томатов, без консервантов.','j2'],
  ['Фасоль в томатном соусе','480 г','c','Фасоль в густом томатном соусе, готова к столу.','j1'],
  ['Соус «По-грузински»','480 г','c','Острый томатный соус с чесноком и пряностями.','j3'],
  ['Соус «Краснодарский»','480 г','c','Классический томатный соус с чесноком и зеленью.','j4'],
  ['Соус «Шашлычный»','480 г','c','Пряный соус к мясу, шашлыку и гриль.','j5'],
  ['Сок тыквенный','1 л','s','Натуральный сок из тыквы.','b1'],
  ['Сок тыквенно-яблочный','1 л','s','Сладость тыквы и свежесть яблока.','b3'],
  ['Сок морковный','1 л','s','Натуральный сок из моркови.','b0'],
  ['Сок морковно-яблочный','1 л','s','Морковь и яблоко в одной бутылке.','b2']];

/* ---------- рендер ---------- */
fill('#stats', stats, ([n,s,t]) => `<div><b data-n="${n}" data-s="${s}">${n.toLocaleString('ru')}${s}</b>${t}</div>`);
fill('#tl', history, ([y,h,t]) => `<div><big>${y}</big><h3>${h}</h3><p>${t}</p></div>`);
fill('#fac', facilities, ([h,t]) => `<div class="card rv"><h3>${h}</h3><p>${t}</p></div>`);
$('#fac').insertAdjacentHTML('beforeend', '<div class="card hl rv">От приёмки овощей до отгрузки — без посредников</div>');
fill('#steps', steps, ([h,t],i) => `<div class="card rv"><i>${i+1}</i><h3>${h}</h3><p>${t}</p></div>`);
fill('#qual', quality, ([h,t]) => `<div class="card rv"><h3>${h}</h3><p>${t}</p></div>`);
fill('#chips', cities, c => `<span>${c}</span>`);

const drawCatalog = f => fill('#cat', products.filter(p => !f || p[2] === f), ([n,v,,d,img],i) =>
  `<article class="p" style="animation-delay:${i*60}ms"><div class="im"><img loading="lazy" src="img/${img}.jpg" alt="${n}, ${v}"></div>
   <div class="t"><h3>${n}</h3><b>${v}</b><p>${d}</p></div></article>`);
drawCatalog('');
$('#tabs').onclick = e => {
  if (e.target.tagName !== 'BUTTON') return;
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b === e.target));
  drawCatalog(e.target.dataset.f);
};

/* ---------- форма ---------- */
const fields = [['Компания','organization'],['ИНН',''],['Регион',''],['Контактное лицо','name'],['Телефон','tel'],['E-mail','email']];
$('#form').innerHTML = fields.map(([n,a]) => `<label>${n}<input name="${n}" maxlength="120" autocomplete="${a}" required
  ${n==='ИНН'?'inputmode="numeric" pattern="[0-9]{10,12}" title="10 или 12 цифр"':''}
  ${n==='Телефон'?'type="tel"':n==='E-mail'?'type="email"':''}></label>`).join('')
  + '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><label class="wide">Комментарий<textarea name="Комментарий" rows="3" maxlength="1000"></textarea></label><button class="btn">Отправить заявку</button><p class="msg" id="msg"></p>';
const loadedAt = Date.now(), COOLDOWN = 60e3;
$('#form').onsubmit = e => {
  e.preventDefault();
  const form = e.target, say = t => $('#msg').textContent = t;
  // антибот: заполненная ловушка или отправка быстрее 3 секунд — молча игнорируем
  if (form.website.value || Date.now() - loadedAt < 3000) return;
  // защита от повторной отправки: не чаще раза в минуту
  let last = 0; try { last = +localStorage.getItem('sent') || 0; } catch {}
  if (Date.now() - last < COOLDOWN) return say('Заявка уже отправлена. Повторите через минуту.');
  const clean = v => v.replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, 1000);
  const body = [...new FormData(form)].filter(([k]) => k !== 'website').map(([k,v]) => `${k}: ${clean(v)}`).join('\n');
  try { localStorage.setItem('sent', Date.now()); } catch {}
  // Для автоматической отправки замените на fetch() к Formspree / вашему бэкенду (+ Cloudflare Turnstile)
  location.href = `mailto:tdbkkz@bk.ru?subject=${encodeURIComponent('Заявка с сайта Карабуэль')}&body=${encodeURIComponent(body)}`;
  say('Откроется почтовая программа с готовым письмом, нажмите «Отправить».');
};

/* ---------- карта ---------- */
// Яндекс.Карты: метка по адресу завода (замените координаты при необходимости)
$('#map').innerHTML = '<iframe loading="lazy" title="Карта: завод Карабуэль" src="https://yandex.ru/map-widget/v1/?text=' +
  encodeURIComponent('Саратовская область, Базарный Карабулак, улица Новая, 29') + '&z=15"></iframe>';

/* ---------- меню, шапка ---------- */
const nav = $('#menu');
addEventListener('scroll', () => $('#hd').classList.toggle('s', scrollY > 30), {passive:true});
$('#burger').onclick = () => nav.classList.toggle('o');
nav.onclick = () => nav.classList.remove('o');

/* ---------- анимации при прокрутке ---------- */
const countUp = el => {
  const n = +el.dataset.n, s = el.dataset.s || '', t0 = performance.now();
  (function tick(t) {
    const k = Math.min((t - t0) / 1500, 1), v = Math.round(n * (1 - (1 - k) ** 3));
    el.textContent = v.toLocaleString('ru') + s;
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
};
const io = new IntersectionObserver(es => es.forEach(({target:t, isIntersecting}) => {
  if (!isIntersecting) return;
  t.classList.add('v');
  t.querySelectorAll('[data-n]').forEach(countUp);
  if (t.dataset.n) countUp(t);
  io.unobserve(t);
}), {threshold: .15});
document.querySelectorAll('.rv').forEach((e,i) => { e.style.transitionDelay = i % 3 * 90 + 'ms'; io.observe(e); });
