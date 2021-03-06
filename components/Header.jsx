import Link from 'next/link';
import styles from '../styles/Header.module.css';

const HeaderButtons = function HeaderButtons({ type, search }) {
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
          style={{ width: '140px' }}
          className="myButton"
          type="text"
          placeholder="Search"
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default HeaderButtons;
