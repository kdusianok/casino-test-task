import React, { useState, useEffect, useCallback } from 'react'
import options from './options'

let currentGame: number | undefined
let currentWheels: number[] = []
let timerCurrentGame: number | undefined

export default function Casino() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [balls, setBalls] = useState<number>(0)
    const [isActive, setIsActive] = useState<boolean>(false)

    currentWheels = generateWheels()
    const [wheels, setWheels] = useState<React.FC[]>(currentWheels.map(item => options[item]))

    const runCasino = useCallback(() => {
        if (isActive) {
            playGame(setWheels)
            timerCurrentGame = window.setTimeout(() => {
                stopGame(setBalls, setWheels, setIsActive)
            }, 10000)
        }
    }, [isActive])

    useEffect(() => {
        if (isActive) {
            runCasino()
        } else {
            var timerRestart = window.setTimeout(() => {
                if (!isActive) {
                    setIsActive(true)
                }
            }, 5000)
        }

        return () => {
            clearTimeout(timerRestart)
            if (isActive) {
                stopGame(setBalls, setWheels, setIsActive)
            }
        }
    }, [isActive, runCasino])

    return {
        wheels,
        balls,
        isActive,
        playGame: () => setIsActive(true),
        stopGame: () => setIsActive(false)
    }
}

export function generateWheels(): number[] {
    return [
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4)
    ]
}

export function playGame(setWheels: Function) {
    currentGame = window.setInterval(() => {
        currentWheels = generateWheels()

        setWheels(currentWheels.map(item => options[item]))
    }, 50)
}

export function stopGame(setBalls: Function, setWheels: Function, setIsActive: Function) {
    if (currentWheels.length === 3) {
        clearInterval(currentGame)
        clearTimeout(timerCurrentGame)
        currentGame = undefined
        timerCurrentGame = undefined
        if (
            currentWheels[0] === currentWheels[1] &&
            currentWheels[1] === currentWheels[2]
        ) {
            setBalls((balls: number) => balls + 20)
        } else if (
            currentWheels[0] === currentWheels[1] ||
            currentWheels[0] === currentWheels[2] ||
            currentWheels[1] === currentWheels[2]
        ) {
            setBalls((balls: number) => balls + 10)
        }
        setWheels(currentWheels.map(item => options[item]))
        setIsActive(false)
    }
}
