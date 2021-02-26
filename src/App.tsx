import React from 'react'
import Casino from './Casino'
import './styles.css'

export default function App() {
    const {wheels, balls, isActive, playGame, stopGame} = Casino()

    return (
        <div className="App">
            <div className="casino-balls">
                Your balls: <span style={{ fontWeight: 'bold' }}>{balls}</span>
            </div>
            <div className="casino-bar">
                {wheels.map((Item, key) => (
                    <div className="casino-box" key={key}>
                        <Item />
                    </div>
                ))}
                <div>
                    <div
                        onClick={() => (!isActive ? playGame() : stopGame())}
                        className={
                            'casino-button ' + (!isActive ? 'play-game' : 'stop-game')
                        }
                    >
                        {!isActive ? 'PLAY' : 'STOP'}
                    </div>
                </div>
            </div>
        </div>
    )
}
