import { useState, useEffect, useRef, useCallback } from 'react'
import './TeacherSlider.css'

const DEFAULT_TEACHERS = [
  {
    id: 1,
    name: 'Екатерина Иванова',
    position: 'Математика / Директор школы',
    bio: 'Окончила ДВФУ по направлению «Математика и компьютерные науки». Училась в магистратуре РГПУ им. Герцена…',
    photo: 'https://placehold.co/200x250/e8e8e8/666?text=EI',
    subjectBadge: 'https://placehold.co/120x32/e8e8e8/999?text=ОГЭ+матем.',
  },
  {
    id: 2,
    name: 'Олег Иванов',
    position: 'Технический руководитель',
    bio: 'Окончил ДВФУ, факультет математики и компьютерных наук. Разработал эксклюзивную информационную систему…',
    photo: 'https://placehold.co/200x250/e8e8e8/666?text=OI',
    subjectBadge: 'https://placehold.co/120x32/e8e8e8/999?text=ОГЭ+матем.',
  },
  {
    id: 3,
    name: 'Юлия Шкиль',
    position: 'Математика',
    bio: 'Окончила Тольяттинский государственный университет, факультет математики, физики и информационных технологий…',
    photo: 'https://placehold.co/200x250/e8e8e8/666?text=YSh',
    subjectBadge: 'https://placehold.co/120x32/e8e8e8/999?text=ОГЭ+матем.',
  },
  {
    id: 4,
    name: 'Олег Скрябин',
    position: 'Математика',
    bio: 'Учился на механико-математическом факультете МГУ им. М.В. Ломоносова. Многократный лауреат олимпиад…',
    photo: 'https://placehold.co/200x250/e8e8e8/666?text=OS',
    subjectBadge: 'https://placehold.co/120x32/e8e8e8/999?text=Олимпиада',
  },
  {
    id: 5,
    name: 'Елена Ёлшина',
    position: 'Математика',
    bio: 'Окончила Южный федеральный университет, факультет математики, механики и компьютерных наук…',
    photo: 'https://placehold.co/200x250/e8e8e8/666?text=EY',
    subjectBadge: 'https://placehold.co/120x32/e8e8e8/999?text=ВПР',
  },
]

const CARD_WIDTH = 280
const CARD_GAP = 24

function TeacherSlider({ teachers = DEFAULT_TEACHERS, autoplayInterval = 5000 }) {
  const n = teachers.length
  const lastItems = n >= 3 ? [teachers[n - 3], teachers[n - 2], teachers[n - 1]] : [...teachers].reverse()
  const duplicated = [...lastItems, ...teachers, ...teachers, ...teachers, teachers[0]]
  const startIndex = lastItems.length

  const [index, setIndex] = useState(startIndex)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const skipTransitionRef = useRef(false)
  const trackRef = useRef(null)

  const goNext = useCallback(() => {
    if (!isTransitioning) return
    setIndex((i) => i + 1)
  }, [isTransitioning])

  const goPrev = useCallback(() => {
    if (!isTransitioning) return
    setIndex((i) => {
      if (i <= 0) {
        skipTransitionRef.current = true
        return startIndex + n * 2 - 1
      }
      return i - 1
    })
  }, [isTransitioning, startIndex, n])

  const handleTransitionEnd = useCallback(() => {
    setIndex((i) => {
      if (i >= startIndex + n * 2) {
        return i - n
      }
      if (i < 0) {
        return i + n
      }
      return i
    })
    setIsTransitioning(true)
  }, [n, startIndex])

  useEffect(() => {
    const pastEnd = index >= startIndex + n * 2
    const beforeStart = index < 0
    if (pastEnd || beforeStart) {
      setIsTransitioning(false)
    }
  }, [index, n, startIndex])

  useEffect(() => {
    if (skipTransitionRef.current) {
      skipTransitionRef.current = false
      setIsTransitioning(true)
    }
  })

  useEffect(() => {
    if (autoplayInterval <= 0) return
    const timer = setInterval(goNext, autoplayInterval)
    return () => clearInterval(timer)
  }, [autoplayInterval, goNext])

  const translateX = -index * (CARD_WIDTH + CARD_GAP)

  return (
    <div className="teacher-slider">
      <div className="teacher-slider__viewport">
        <div
          ref={trackRef}
          className="teacher-slider__track"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isTransitioning && !skipTransitionRef.current ? 'transform 0.5s ease' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {duplicated.map((teacher, i) => (
            <div
              key={`${teacher.id}-${i}`}
              className="tn-atom teacher-slider__card"
              style={{ boxSizing: 'border-box' }}
            >
              {teacher.subjectBadge && (
                <div className="teacher-slider__badge-wrap">
                  <img
                    src={teacher.subjectBadge}
                    alt=""
                    className="teacher-slider__badge"
                  />
                </div>
              )}
              <div className="teacher-slider__photo-wrap">
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="teacher-slider__photo"
                />
              </div>
              {teacher.bio && (
                <p className="teacher-slider__bio">{teacher.bio}</p>
              )}
              <h3 className="teacher-slider__name">{teacher.name}</h3>
              <p className="teacher-slider__position">
                * {teacher.position}
              </p>
              {teacher.detailsLink && (
                <a
                  href={teacher.detailsLink}
                  className="teacher-slider__link"
                >
                  Читать подробнее
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="teacher-slider__nav teacher-slider__nav--prev"
        onClick={goPrev}
        aria-label="Назад"
      >
        ‹
      </button>
      <button
        type="button"
        className="teacher-slider__nav teacher-slider__nav--next"
        onClick={goNext}
        aria-label="Вперёд"
      >
        ›
      </button>
    </div>
  )
}

export default TeacherSlider
