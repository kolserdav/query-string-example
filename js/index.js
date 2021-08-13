/**
 * Объявление Функции
 * Так как у браузера нет API из коробки
 * для получения значения одного из полей queryString
 * Эта функция Возвращает из queryString
 * значение поля по названию
 * @param {*} name - имя ключа, в данном случае gclid
 * @returns 
 */
function getValueFromQueryString(name) {
  // Параметры запроса страницы в формате ?ключ=значение?ключ2=значение2&ключ3=занчение3
  const queryString = window.location.search;
  // Задаем регулярное выражение исходя из целевого имени name
  // Вначале ищет знак вопроса или & после которого идет name потом = любые символы и возможная & после
  // Прим [a-zA-Z0-9\\-_] - это набор символов, который может быть в значении, \\- - это экранированная -
  // так как в остальных случаях a-z от а до z и тд
  const regEx = new RegExp(`\\??&?${name}=[a-zA-Z0-9\\-_]+&?`);
  // Выполняет поис в строке параметров по рег выражению 
  let result = queryString.match(regEx);
  // Если найдено то значение иначе null
  result = result ? result[0] : null;
  // Возвращает если не null то чистит лишние символы иначе возвращает null
  return result ? (
    result.replace(/\?/g, '')
    .replace(/&/g, '')
    .replace(name, '')
    .replace('=', '')
    ) : (
      null
    );
}
// Получаем ссылку на ссылку
const link = document.querySelector('#target-link');
// При помощи служебной функции парсим нужный параметр страницы
const value = getValueFromQueryString('gclid');
// Заменяем элементу ссылка атрибут href
link.href = `https://site-offer.ru/?sub_id_1=${value}`;