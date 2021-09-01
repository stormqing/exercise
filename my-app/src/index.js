
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
    return (
        //一个方块
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {


    renderSquare(i) {
        return <Square value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} />;//给每个方块传一个值
    }
    render() {

        return (
            //渲染9个方块
            <div>

                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
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
            xIsNext: true,
            stepNumber: 0,//查看哪一项历史记录
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);//。如果我们“回到过去”，然后再走一步新棋子，原来的“未来”历史记录就不正确了，这个替换可以保证我们把这些“未来”的不正确的历史记录丢弃掉。
        const current = history[history.length - 1];
        const squares = current.squares.slice();//复制一份新的历史记录
        // const squares = this.state.squares.slice();//slice() 函数为每一步创建 squares 数组的副本,实现“回到过去”的功能，从而在游戏里跳回到历史步骤。
        //当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';//方块里的值发生变化
        this.setState({
            //把新的历史记录拼接到history上
            history: history.concat([
                {
                    squares: squares,
                }
            ]),
            stepNumber: history.length,//stepNumber state 用于给用户展示当前的步骤。每当我们落下一颗新棋子的时候更新 stepNumber。这就保证了保证每走一步 stepNumber 会跟着改变。
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,//为偶数时也为true
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        //把历史步骤映射为代表按钮的 React 元素，然后可以展示出一个按钮的列表，点击这些按钮，可以“跳转”到对应的历史步骤,move代表每一个历史步骤
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });
        let status;
        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            //父容器
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}//最新一次历史记录
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    //对角线或者是直线
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];//位置坐标
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {//三个值相等及判断为胜者
            return squares[a];//返回"x"，"o","null"
        }
    }
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

// history = [
//     // 第一步之前
//     {
//       squares: [
//         null, null, null,
//         null, null, null,
//         null, null, null,
//       ]
//     },
//     // 第一步之后
//     {
//       squares: [
//         null, null, null,
//         null, 'X', null,
//         null, null, null,
//       ]
//     },
//     // 第二步之后
//     {
//       squares: [
//         null, null, null,
//         null, 'X', null,
//         null, null, 'O',
//       ]
//     },
//     // ...
