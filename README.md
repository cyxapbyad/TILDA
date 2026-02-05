# React-слайдер учителей для Tilda

Слайдер карточек учителей для вставки в HTML-блок Tilda. Собран как UMD-библиотека, React и ReactDOM подключаются с CDN.

## Сборка

```bash
npm install
npm run build:slider
```

Результат в папке `dist/`:
- `teacher-slider.js` — основной скрипт (используйте его для Tilda)
- `teacher-slider.css` — стили

## Локальная разработка

```bash
npm run dev
```

Откройте http://localhost:5173 — слайдер отображается на главной странице.

## Инструкция для Tilda

1. **Загрузите файлы** `teacher-slider.js` и `teacher-slider.css` на доступный хостинг (Tilda Zero, ваш домен, CDN и т.п.).

2. **Создайте HTML-блок** на странице Tilda и вставьте следующий фрагмент:

```html
<div id="teacher-slider-root"></div>
<link rel="stylesheet" href="https://ваш-хостинг/teacher-slider.css" />
<script
  crossorigin
  src="https://unpkg.com/react@18/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
></script>
<script src="https://ваш-хостинг/teacher-slider.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    if (window.initTeacherSlider)
      window.initTeacherSlider("#teacher-slider-root");
  });
</script>
```

3. **Замените** `https://ваш-хостинг/` на реальные URL файлов `teacher-slider.js` и `teacher-slider.css`.

4. **Опционально:** можно передать другой селектор или DOM-элемент:
   ```javascript
   window.initTeacherSlider("#rec1583260721 .tn-atom");
   ```

## Настройка данных учителей

Сейчас используются заглушки (массив по умолчанию). Модель данных:

- `id`, `name`, `position` — обязательные
- `photo` — URL фото
- `bio` — краткая биография (обрезается до 3 строк)
- `subjectBadge` — URL бейджа предмета (опционально)
- `detailsLink` — ссылка «Читать подробнее» (опционально)

Данные можно заменить через пропсы при рендере или глобальную переменную (потребуется доработка точки входа).

## Технические детали

- **Сборка:** Vite, режим library, формат UMD
- **Внешние зависимости:** React 18+, ReactDOM (подключаются с CDN)
- **Контейнер:** max-width 1200px, высота блока ~723px
- **Функционал:** бесконечная плавная карусель, стрелки влево/вправо, автопрокрутка (5 сек)
- **Стили:** matyx.ru — акцент #8a55ff, шрифт Montserrat, карточки в обёртке tn-atom
