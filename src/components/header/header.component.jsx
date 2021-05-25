import "./header.styles.scss";

import DropDown from "../DropDownList/dropdown-list.components";
import PlayerInput from "../player-input/player-input.component";

function Header({
  count,
  handleSize,
  handleName,
  handleStart,
  player1,
  player2,
  gameOver,
}) {
  return (
    <div className="header">
      <h1>Tic-Tac-Toe</h1>
      <div className="header-data">
        <PlayerInput
          label="Player 1"
          name="player1"
          handleName={handleName}
          givenName={player1[1]}
          count={count}
        />
        <DropDown handleSize={handleSize} count={count} />
        <PlayerInput
          label="Player 2"
          name="player2"
          handleName={handleName}
          givenName={player2[1]}
          count={count}
        />
      </div>
      <button onClick={handleStart}>{!gameOver ? "Start" : "Restart"}</button>
    </div>
  );
}

export default Header;
