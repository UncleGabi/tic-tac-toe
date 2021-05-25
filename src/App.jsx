import React, { Component } from "react";
import "./App.scss";

import $ from "jquery";
import uuid from "react-uuid";

import Header from "./components/header/header.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      count: 0,
      size: 3,
      player1: [],
      player2: [],
      currentPlayer: "",
      xIsNext: true,
      board: [],
      gameOver: false,
      winnerSteps: [],
    };
  }

  componentDidMount = () => {
    // initialize the array that builds up the board of buttons
    const { size } = this.state;
    this.setState({ board: Array(size ** 2).fill("") });
    this.setWinnerSteps(size);
  };

  handleSizeChange = (e) => {
    // in case of a size change, the board gets re-rendered
    // and it also readjusts the number of frs according to the board size
    const { value } = e.target;
    const { size } = this.state;

    this.setState(
      {
        size: parseInt(value),
        board: Array(value * value).fill(""),
      },
      () => {
        this.setWinnerSteps(size);
      }
    );

    let board = $(".board");
    board.css("gridTemplateColumns", `repeat(${value}, 1fr)`);
    this.setPlayers();
  };

  setPlayerName = (e) => {
    // simply sets the names of the players
    const { gameOver } = this.state;
    const { value, name } = e.target;

    if (gameOver) {
      this.setState({ player1: [], player2: [] });
    } else {
      this.setState({ [name]: [value] });
    }
  };

  setPlayers = () => {
    // decides which player to start and makes the board visible
    const { player1, player2 } = this.state;
    const randomNumber = Math.random();
    const player1_name = player1[0];
    const player2_name = player2[0];
    const newPlayer1 =
      randomNumber < 0.5 ? [player1_name, "X"] : [player1_name, "O"];
    const newPlayer2 =
      randomNumber >= 0.5 ? [player2_name, "X"] : [player2_name, "O"];
    const nextCurrentPlayer = randomNumber < 0.5 ? player1_name : player2_name;

    if (player1.length >= 1 && player2.length >= 1) {
      // if the names of player1 and player2 are given

      this.setState({
        player1: newPlayer1,
        player2: newPlayer2,
        currentPlayer: nextCurrentPlayer,
      });

      $(".main").css("visibility", "visible");
    } else {
      alert("The names of the players are not given..");
    }
  };

  restart = () => {
    // resets the state to default
    const { size, player1, player2 } = this.state;

    this.setState({
      count: 0,
      size: size,
      player1: [player1[0], ""],
      player2: [player2[0], ""],
      currentPlayer: "",
      xIsNext: true,
      board: Array(size ** 2).fill(""),
      gameOver: false,
    });
    this.setPlayers();
  };

  setStart = () => {
    // if the game is over, resets the state to default and the order of players
    // in the beginning it just sets the order of players
    const { gameOver } = this.state;

    if (gameOver) {
      this.restart();
    } else {
      this.setPlayers();
    }
  };

  handleClick = (event) => {
    // when a board-button is clicked, X/O is added, updates the board
    // checks if we have a winner or it's a tie
    // in case of a tie, it resets the state to default
    const { count, size, player1, player2, currentPlayer, board, xIsNext } =
      this.state;
    const { id, value } = event.target;
    const updatedBoard = board;
    const next = currentPlayer === player1[0] ? player2[0] : player1[0];

    if (value === "") {
      let sign = this.state.xIsNext ? "X" : "O";
      updatedBoard[id] = sign;
      this.setState({
        xIsNext: !xIsNext,
        board: updatedBoard,
        currentPlayer: next,
      });

      if (count === size ** 2 - 1) {
        this.setState({ gameOver: true, currentPlayer: "It's a tie.." });

        setTimeout(this.restart, 2000);
      } else {
        this.setState({ count: count + 1 });
      }
    }

    this.getWinner();
  };

  getWinner = () => {
    // it creats a subarray according to the ids given in the winnerSteps array
    // then the X/Os of the given ID-s are added to a temporary list, if they are of the same kind, we have a winner
    const { board, currentPlayer, winnerSteps, size } = this.state;
    const steps = [];

    for (let unit of winnerSteps) {
      const subArray = [];

      for (let id of unit) {
        const currentItem = board[parseInt(id)];
        if (currentItem !== "") subArray.push(currentItem);
      }

      steps.push(subArray);
    }

    steps.map((sublist) => {
      let allSteps = sublist.join("");
      let isWinner =
        allSteps === "O".repeat(size) || allSteps === "X".repeat(size);

      if (isWinner) {
        const boardHeader = $("#boardHeader");
        boardHeader.val(`The winner is ${currentPlayer}`);
        this.setState({
          gameOver: true,
          currentPlayer: `The winner is ${currentPlayer}`,
        });
      }
    });
  };

  setWinnerSteps = (boardSize) => {
    // generates the winnerSteps according to the size of the board (Columns, Rows, Diagonals)
    // A player needs to go through all the way through a column/row/diagonal to win
    const { size } = this.state;
    boardSize = size;
    const allBoxes = size ** 2;
    let steps = [];
    let winnerSteps = [];

    // Rows
    for (let i = 0; i < boardSize ** 2; i++) {
      steps.push(String(i));
    }

    // slice it into chunks
    const chunkSize = size;
    for (let i = 0; i < allBoxes; i += chunkSize) {
      const chunk = steps.slice(i, i + chunkSize);
      winnerSteps.push(chunk);
    }
    steps = [];

    // Diagonals
    for (let i = 0; i < allBoxes; i += boardSize + 1) {
      steps.push(String(i));
    }
    winnerSteps.push(steps);
    steps = [];

    for (
      let i = allBoxes - boardSize;
      i >= 0 + boardSize - 1;
      i -= boardSize - 1
    ) {
      steps.push(String(i));
    }
    winnerSteps.push(steps);
    steps = [];

    //Columns
    for (let i = 0; i < boardSize; i++) {
      let count = i;
      let step = `${i}`;
      for (let j = 0; j < size - 1; j++) {
        step += String(` ${(count += size)}`);
      }

      winnerSteps.push(step.split(" "));
      steps = "";
    }

    this.setState({ winnerSteps: winnerSteps });
  };

  render() {
    const { count, size, player1, player2, board, currentPlayer, gameOver } =
      this.state;
    let id = -1;

    return (
      <div className="App">
        <div className="header">
          <Header
            count={count}
            handleSize={this.handleSizeChange}
            handleName={this.setPlayerName}
            handleStart={this.setStart}
            player1={player1}
            player2={player2}
            gameOver={gameOver}
          />
        </div>
        <div className="main">
          {gameOver || !currentPlayer ? (
            <h2 id="boardHeader">{currentPlayer}</h2>
          ) : (
            <h2 id="boardHeader">{currentPlayer}'s turn</h2>
          )}
          <div className="board">
            {board.map((item) => {
              id++;
              return (
                <button
                  key={uuid()}
                  id={id}
                  disabled={board[id] || gameOver ? true : false}
                  className="boardBtn"
                  onClick={this.handleClick}
                >
                  {board[id]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
