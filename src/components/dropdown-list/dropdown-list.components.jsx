import "./dropdown-list.styles.scss";

function DropDown({ handleSize, count }) {
  return (
    <div>
      <select onChange={handleSize} disabled={count === 0 ? false : true}>
        <option value="3">3x3</option>
        <option value="4">4x4</option>
        <option value="5">5x5</option>
        <option value="6">6x6</option>
      </select>
    </div>
  );
}

export default DropDown;
