import "./header.styles.scss";
import DropDown from "../DropDownList/dropdown-list.components";

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
        <div>
          <label>Player 1</label>
          <input
            name="player1"
            placeholder="Enter your name..."
            onBlur={handleName}
            autoFocus
            disabled={count === 0 ? false : true}
          />
          <span>{player1[1]}</span>
        </div>
        <DropDown handleSize={handleSize} count={count} />
        <div>
          <label>Player 2</label>
          <input
            name="player2"
            placeholder="Enter your name..."
            onBlur={handleName}
            disabled={count === 0 ? false : true}
          />
          <span>{player2[1]}</span>
        </div>
      </div>
      <button onClick={handleStart}>{!gameOver ? "Start" : "Restart"}</button>
    </div>
  );
}

export default Header;
