import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winningSquares: lines[i], winner: `Winner: ${squares[a]}` };
    }
  }
  if (squares.filter(s => s).length === 9) {
    return { winningSquares: [], winner: "It's a draw" };
  } else {
    return { winningSquares: [], winner: null };
  }
}

function Square(props) {
  return (
    <button className={"square " + props.win} onClick={props.onClick} >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
      win={this.props.winningSquares.indexOf(i) > -1 ? 'win' : ''}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        {Array(3).fill(0).map((el, row) => (
          <div className="board-row" key={'row' + row}>
            {Array(3).fill(0).map((el, col) => this.renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      movesDesc: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, winningSquares } = calculateWinner(current.squares);

    const moves = history.map((step, move, orig) => {
      let desc;
      if (move === 0) {
        desc = 'Go to game start';
      } else {
        let i = 0;
        for (; i < step.squares.length; i++) {
          if (step.squares[i] !== orig[move - 1].squares[i]) break;
        }
        const col = (i % 3) + 1;
        const row = i < 3 ? 1 : i < 6 ? 2 : 3; 
        desc = `Go to move: (${col}, ${row})`;
      }
        
      return (
        <li key={move} className={this.state.stepNumber === move ? 'current' : ''}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = winner;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningSquares={winningSquares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>

          <ol>{ this.state.movesDesc ? moves : moves.reverse() }</ol>

          <button onClick={() => this.setState({ movesDesc: !this.state.movesDesc })}>
            Change Move Order
          </button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
