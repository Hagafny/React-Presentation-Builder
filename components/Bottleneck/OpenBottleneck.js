import React, { useEffect, useState } from 'react'
import { AnimatedCircle } from './AnimatedCircle'
import { useSprings, easings } from 'react-spring'
import { BaseBottleneck, BOTTLENECK_MODE } from './BaseBottleneck'
import { DEPARTMENTS, DEPARTMENTS_COLORS } from '../../consts/departments'

const initialDelay = 200
const interval = 300

const DEPARTMENT_PROPS = {
  [DEPARTMENTS.MARKETING]: {
    department: DEPARTMENTS.MARKETING,
    color: DEPARTMENTS_COLORS[DEPARTMENTS.MARKETING],
    top: '14%',
    leftStart: '14%',
  },
  [DEPARTMENTS.DESIGN]: {
    department: DEPARTMENTS.DESIGN,
    color: DEPARTMENTS_COLORS[DEPARTMENTS.DESIGN],
    top: '32%',
    leftStart: '10%',
  },
  [DEPARTMENTS.PRODUCT]: {
    department: DEPARTMENTS.PRODUCT,
    color: DEPARTMENTS_COLORS[DEPARTMENTS.PRODUCT],
    top: '52%',
    leftStart: '11%'
  },
  [DEPARTMENTS.OPERATIONS]: {
    department: DEPARTMENTS.OPERATIONS,
    color: DEPARTMENTS_COLORS[DEPARTMENTS.OPERATIONS],
    top: '69%',
    leftStart: '16%'
  }
}

const circleAnimations = () => {
  return [
    { ...DEPARTMENT_PROPS[DEPARTMENTS.MARKETING], topEnd: '14%', leftEnd: '100%' },
    { ...DEPARTMENT_PROPS[DEPARTMENTS.DESIGN], topEnd: '32%', leftEnd: '100%' },
    { ...DEPARTMENT_PROPS[DEPARTMENTS.PRODUCT], topEnd: '52%', leftEnd: '100%' },
    { ...DEPARTMENT_PROPS[DEPARTMENTS.OPERATIONS], topEnd: '69%', leftEnd: '100%' },

    // {...DEPARTMENT_PROPS[DEPARTMENTS.MARKETING], topEnd: '43%', leftEnd: '100%' },
    // {...DEPARTMENT_PROPS[DEPARTMENTS.DESIGN], topEnd: '37%', leftEnd: '100%' },
    //  {...DEPARTMENT_PROPS[DEPARTMENTS.PRODUCT], topEnd: '50%', leftEnd: '100%'  },
    // {...DEPARTMENT_PROPS[DEPARTMENTS.OPERATIONS], topEnd: '45%', leftEnd: '100%'  },

    // {...DEPARTMENT_PROPS[DEPARTMENTS.MARKETING], topEnd: '41%', leftEnd: '92%', delay: 700 },
  ]
}

function randomId () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function randBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createBall (department) {
  const departmentProps = DEPARTMENT_PROPS[department]
  return {
    ...departmentProps,
    leftEnd: '100%',
    delay: randBetween(initialDelay, initialDelay + 500)
  }
}

export const OpenBottleneck = () => {
  const [balls, setBalls] = useState([])
  const springs = useSprings(balls.length, balls.map(({ top, leftStart, leftEnd, delay }) => {
    return {
      from: { top, left: leftStart, opacity: 10 },
      to: { left: leftEnd, opacity: 0 },
      config: {
        duration: 1500, easing: easings.linear
      },
      delay,
      loop: true
    }
  }))

  useEffect(() => {
    for (const department of Object.values(DEPARTMENTS)) {
      const ballsOfDepartment = balls.filter(ball => ball.department === department)
      if (ballsOfDepartment.length < 3) {
        setBalls(balls => ([
          ...balls,
          createBall(department)
        ]))
      }
    }
  })

  return (
    <BaseBottleneck mode={BOTTLENECK_MODE.OPEN}>
      {springs.map((values, i) => {
        return <AnimatedCircle key={i} size={24} color={balls[i].color} springProps={values}/>
      })}
    </BaseBottleneck>
  )
}