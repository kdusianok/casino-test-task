import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import App from './App'
import Casino, { generateWheels, playGame } from './Casino'

describe('testing casino', () => {
    it('click play casino', () => {
        render(<App/>)
        const button = screen.getByText(/PLAY/i)
        expect(button.className).toBe('casino-button play-game')
        button.click()
        expect(button.textContent).toBe('STOP')
        expect(button.className).toBe('casino-button stop-game')
    })

    it('casino hook', () => {
        const {result} = renderHook(() => Casino())
        expect(result.current.isActive).toBe(false)
        act(() => {
            result.current.playGame()
        })
        expect(result.current.wheels.length).toBe(3)
        expect(result.current.isActive).toBe(true)
        act(() => {
            result.current.stopGame()
        })
        expect(result.current.isActive).toBe(false)
    })

    it('generate wheels', () => {
        expect(generateWheels().length).toBe(3)
    })

    it('play game', async () => {
        let wheels: React.FC[] = []
        const setWheels = (items: React.FC[]) => wheels = items
        playGame(setWheels)
        await (new Promise((res) => setTimeout(() => res(null), 100)))
        expect(wheels.length).toBe(3)
    })
})
