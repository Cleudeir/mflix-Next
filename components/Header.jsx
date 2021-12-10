/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const HeaderButtons = function HeaderButtons({
  genres, valueInput, valueSelect, type, atualizarSelect,
}) {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
        }}
      >
        {type === 'tv' && (
          <Link href="/movie">
            <a href="replace" style={{ width: '75px' }} className="myButton">
              Movie
            </a>
          </Link>
        )}
        {type === 'movie' && (
          <Link href="/tv">
            <a href="replace" style={{ width: '75px' }} className="myButton">
              TvShow
            </a>
          </Link>
        )}
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <input
          style={{ width: '80px' }}
          className="myButton"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            valueInput(e.target.value);
          }}
        />
        <select
          name="select"
          value={atualizarSelect}
          className="myButton"
          onChange={(e) => {
            valueSelect(e.target.value);
            valueInput('');
          }}
        >
          {genres
              && genres.map((x, i) => (
                <option key={x} value={i}>
                  {x}
                </option>
              ))}
        </select>
      </div>
    </div>
  );
};
export default HeaderButtons;
