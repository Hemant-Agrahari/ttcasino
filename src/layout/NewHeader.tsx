import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const NewHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navItems = [
    {
      label: 'PLAY VEGAS SLOTS',
      icon: '/assets/images/bet-slot.webp',
      href: '#',
    },
    { label: 'LIVE TABLES', icon: '/assets/images/bet-slot.webp', href: '#' },
    { label: 'SPORT', icon: '/assets/images/bet-slot.webp', href: '#' },
    { label: 'IN-PLAY(LIVE)', icon: '/assets/images/bet-slot.webp', href: '#' },
    { label: 'SUPANUMBERS', icon: '/assets/images/bet-slot.webp', href: '#' },
  ];
  return (
    <header className="header">
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
    <span onClick={toggleMenu}><CloseIcon /></span>
  </div>
  <div className="mobile-menu-items">
    <div className="mobile-menu-item">PLAY VEGAS SLOTS</div>
    <div className="mobile-menu-item">LIVE TABLES</div>
    <div className="mobile-menu-item">SPORT</div>
    <div className="mobile-menu-item">IN-PLAY(LIVE)</div>
    <div className="mobile-menu-item">SUPANUMBERS</div>
  </div>
</div>

    </header>
  );
};

export default NewHeader;
