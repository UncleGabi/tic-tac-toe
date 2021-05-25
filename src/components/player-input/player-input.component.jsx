import "./player-input.styles.scss";

const PlayerInput = ({ label, name, handleName, givenName, count }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        name={name}
        placeholder="Enter your name..."
        onBlur={handleName}
        autoFocus={label === "Player 1"}
        disabled={count === 0 ? false : true}
      />
      <span>{givenName}</span>
    </div>
  );
};

export default PlayerInput;
