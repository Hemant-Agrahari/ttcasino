import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const NewHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className="header-container">
      <nav className="nav d-flex gap-1">
        <span className="toggle-header" onClick={toggleMenu}>
          <MenuIcon />
        </span>
        <div className="logo-img">
          <Image
            alt="logo"
            src="/assets/images/superbet.webp"
            width={220}
            height={70}
          />
        </div>
        <div className="nav-container nav-links">
          <div className="nav-links gap-2">
            <Image
              src="/assets/images/bet-slot.webp"
              alt="img"
              width={25}
              height={25}
              className="nav-img"
            />
            <span className="yellow-class">PLAY VEGAS SLOTS</span>
          </div>
          <div className="nav-links d-flex align-items-center justify-content-center gap-2">
            <Image
              src="/assets/images/live-table.webp"
              alt="img"
              width={25}
              height={25}
              className="nav-img"
            />
            <span className="yellow-class">LIVE TABLES</span>
          </div>
          <div className="nav-links d-flex align-items-center justify-content-center gap-2">
            <Image
              src="/assets/images/sports.webp"
              alt="img"
              width={25}
              height={25}
              className="nav-img"
            />
            <span>SPORT</span>
          </div>
          <div className="nav-links d-flex align-items-center justify-content-center gap-2">
            <Image
              src="/assets/images/in-play.webp"
              alt="img"
              width={25}
              height={25}
              className="nav-img"
            />
            <span>IN-PLAY(LIVE)</span>
          </div>
          <div className="nav-links d-flex align-items-center justify-content-center gap-2">
            <Image
              src="/assets/images/supannumber.webp"
              alt="img"
              width={25}
              height={25}
              className="nav-img"
            />
            <span>SUPANUMBERS</span>
          </div>
        </div>
      </nav>

      <div className="actions">
        <button className="btn-outline">Join Now</button>
        <button className="btn-filled">
          <Image
            src="/assets/images/iconLogin.webp"
            width={10}
            height={10}
            alt="button logo"
          />{' '}
          Login
        </button>
      </div>

      {/* Mobile Menu Modal */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className='d-flex align-items-center justify-content-space'>
            <div className="close-icons">
              <span onClick={toggleMenu}>
                <CloseIcon />
              </span>
            </div>
            <div className="">
              <div className="logo-img mobile-logo">
                <Image
                  alt="logo"
                  src="/assets/images/superbet.webp"
                  width={220}
                  height={70}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-menu-items">
          <div className="popular-provider">Popular Provider</div>
        </div>
        <div className="provider-section">
          <div className="provider-grid">
            <div className="provider-card">
              <Image
                width="1500"
                height={100}
                src="/assets/images/3_Oaks.webp"
                alt="Habanero"
              />
            </div>
            <div className="provider-card">
              <Image
                width={1500}
                height={100}
                src="/assets/images/Hacksaw.webp"
                alt="Habanero"
              />
            </div>
            <div className="provider-card">
              <Image
                width={1500}
                height={100}
                src="/assets/images/Endorphina.webp"
                alt="Habanero"
              />
            </div>
            <div className="provider-card">
              <Image
                width={1500}
                height={100}
                src="/assets/images/Pragmaticnew.webp"
                alt="Habanero"
              />
            </div>
            <div className="provider-card">
              <Image
                width={1500}
                height={100}
                src="/assets/images/Evolution.webp"
                alt="Habanero"
              />
            </div>
            <div className="provider-card">
              <Image
                width={1500}
                height={100}
                src="/assets/images/Pragmaticnew.webp"
                alt="Habanero"
              />
            </div>
          </div>
        </div>
        <div className="mobile-menu-items">
          <div className="popular-provider">Casino Category</div>
        </div>
        <div className="header-game-listing">
          <div className="header-game-name d-flex align-items-center justify-content-between">
            <div className="header-game-name">All Game</div>
            <div className="header-game-number">737</div>
          </div>
          <div className="header-game-name d-flex align-items-center justify-content-between mt-2">
            <div className="header-game-name">Flip 2 Win</div>
            <div className="header-game-number">50</div>
          </div>
          <div className="header-game-name d-flex align-items-center justify-content-between mt-2">
            <div className="header-game-name"></div>
            <div className="header-game-number">7</div>
          </div>
          <div className="header-game-name d-flex align-items-center justify-content-between mt-2">
            <div className="header-game-name"></div>
            <div className="header-game-number">20</div>
          </div>
          <div className="header-game-name d-flex align-items-center justify-content-between mt-2">
            <div className="header-game-name">Drop and Wins</div>
            <div className="header-game-number">73</div>
          </div>
          <div className="header-game-name d-flex align-items-center justify-content-between mt-2">
            <div className="header-game-name">Crash Games</div>
            <div className="header-game-number">737</div>
          </div>
          <div className="header-game-name d-flex align-items-center justify-content-between mt-2">
            <div className="header-game-name">Bet Games</div>
            <div className="header-game-number">37</div>
          </div>
          <div className="header-game-name d-flex align-items-center justify-content-between v">
            <div className="header-game-name">New Games</div>
            <div className="header-game-number">73</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
