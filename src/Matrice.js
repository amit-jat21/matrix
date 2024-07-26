import React, { useState } from 'react';
import './Matrice.css';

const Matrix = () => {
  const initialMatrix = Array(3).fill(null).map(() => Array(3).fill(null));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clicks, setClicks] = useState([]);
  const [lastClicked, setLastClicked] = useState(null);
  const [allOrange, setAllOrange] = useState(false);

  const handleClick = (row, col) => {
    if (matrix[row][col] === 'green') return;

    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((c, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return 'green';
        }
        return c;
      })
    );

    setMatrix(newMatrix);
    setClicks([...clicks, { row, col }]);
    setLastClicked({ row, col });

    
    if (row === 2 && col === 2) {
      setTimeout(changeToOrange, 300);
    }
  };

  const changeToOrange = () => {
    if (allOrange) return; 

    const newMatrix = [...matrix];
    clicks.forEach((click, index) => {
      setTimeout(() => {
        newMatrix[click.row][click.col] = 'orange';
        setMatrix([...newMatrix]);
      }, index * 300);
    });

    setTimeout(() => {
      newMatrix[2][2] = 'orange';
      setMatrix([...newMatrix]);
      setAllOrange(true);
      setTimeout(resetMatrix, 1000);
    }, clicks.length * 300 + 300);
  };

  const resetMatrix = () => {
    setMatrix(initialMatrix);
    setClicks([]);
    setLastClicked(null);
    setAllOrange(false);
  };

  return (
    <div className="background">
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className="box"
                style={{ backgroundColor: color || 'white' }}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {lastClicked &&
                  lastClicked.row === rowIndex &&
                  lastClicked.col === colIndex &&
                  color === 'orange' && (
                    <span className="message"> gotcha!</span>
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;
