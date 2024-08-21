import React, { useState, useEffect } from 'react';
import './MiniMap.css';

const mapSize = 2048;
const tileSize = 64;
const miniMapSize = 400;

const MiniMap = ({ mapPosition, playerPosition }) => {
    const [visibleTiles, setVisibleTiles] = useState([]);

    useEffect(() => {
        const tiles = [];
        const startX = Math.max(0, Math.floor(playerPosition.x / tileSize) - 3);
        const startY = Math.max(0, Math.floor(playerPosition.y / tileSize) - 3);

        for (let x = startX; x < startX + 7; x++) {
            for (let y = startY; y < startY + 7; y++) {
                if (x >= 0 && x < mapSize / tileSize && y >= 0 && y < mapSize / tileSize) {
                    tiles.push({ x, y });
                }
            }
        }

        setVisibleTiles(tiles);
    }, [playerPosition]);

    return (
        <div className={`mini-map ${mapPosition}`}>
            {visibleTiles.map(tile => (
                <img
                    key={`${tile.x}-${tile.y}`}
                    src={`/images/tiles/${tile.x}-${tile.y}.png`}
                    alt="Map Tile"
                    style={{
                        position: 'absolute',
                        top: (tile.y - Math.floor(playerPosition.y / tileSize)) * tileSize + miniMapSize / 2 - tileSize / 2,
                        left: (tile.x - Math.floor(playerPosition.x / tileSize)) * tileSize + miniMapSize / 2 - tileSize / 2,
                        width: tileSize,
                        height: tileSize,
                    }}
                />
            ))}
            <div className="player-marker" />
        </div>
    );
};

export default MiniMap;