import React from 'react'
import ReactDOM from 'react-dom'
import TeacherSlider from './TeacherSlider.jsx'

/**
 * Инициализация слайдера учителей в указанном контейнере.
 * Вызывается из HTML-блока Tilda после загрузки React и скрипта.
 *
 * @param {string|Element} [selector='#teacher-slider-root'] - CSS-селектор или DOM-элемент
 */
function initTeacherSlider(selector = '#teacher-slider-root') {
  const el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector

  if (!el) {
    console.warn('[TeacherSlider] Элемент не найден:', selector)
    return
  }

  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined' || !ReactDOM.createRoot) {
    console.error('[TeacherSlider] React 18+ или ReactDOM не загружены. Подключите их с CDN перед teacher-slider.js')
    return
  }

  const root = ReactDOM.createRoot(el)
  root.render(React.createElement(TeacherSlider))
}

if (typeof window !== 'undefined') {
  window.initTeacherSlider = initTeacherSlider
}

export { initTeacherSlider, TeacherSlider }
