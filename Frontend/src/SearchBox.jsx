import PropTypes from "prop-types";

function SearchBox({ place, name, arr }) {
  return (
    <>
      <label>{place}</label>
      <select name={name} defaultValue="">
        <option value="" disabled>
          Select a station
        </option>
        {arr &&
          arr.map((station, index) => (
            <option key={index} value={station}>
              {station}
            </option>
          ))}
      </select>
    </>
  );
}

SearchBox.propTypes = {
  place: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  arr: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchBox;
