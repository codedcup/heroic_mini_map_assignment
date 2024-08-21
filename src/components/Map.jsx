import React, { useState, useEffect, useRef } from 'react';
import MiniMap from './MiniMap.jsx';

const mapSize = 2048;

function Map() {
    const [playerPosition, setPlayerPosition] = useState({ x: 1024, y: 1024 });
    const keysPressed = useRef({});

    useEffect(() => {
        const handleKeyDown = (e) => {
            keysPressed.current[e.key] = true;
        };

        const handleKeyUp = (e) => {
            keysPressed.current[e.key] = false;
        };

        const movePlayer = () => {
            setPlayerPosition((prevPosition) => {
                let newX = prevPosition.x;
                let newY = prevPosition.y;

                if (keysPressed.current['ArrowUp']) {
                    newY = Math.max(0, prevPosition.y - 10);
                }
                if (keysPressed.current['ArrowDown']) {
                    newY = Math.min(mapSize - 1, prevPosition.y + 10);
                }
                if (keysPressed.current['ArrowLeft']) {
                    newX = Math.max(0, prevPosition.x - 10);
                }
                if (keysPressed.current['ArrowRight']) {
                    newX = Math.min(mapSize - 1, prevPosition.x + 10);
                }

                return { x: newX, y: newY };
            });

            requestAnimationFrame(movePlayer);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        requestAnimationFrame(movePlayer);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <MiniMap mapPosition="top-right" playerPosition={playerPosition} />
    );
}

export default Map;
