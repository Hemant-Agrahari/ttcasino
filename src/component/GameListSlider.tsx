import React from 'react'

const GameListSlider = () => {
   const categories = [
    { name: 'All Games', icon: '/assets/images/home-1.svg' },
    {
      name: 'Live Tables',
      icon: '/assets/images/livetables.svg',
      active: true,
    },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
    { name: 'New', icon: '/assets/images/new.svg' },
    { name: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { name: 'First Games', icon: '/assets/images/1stp.svg' },
    { name: 'Blacl Jack', icon: '/assets/images/blackjackicon.svg' },
  ];
  return (
      <div className="game-list-scroll-container">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`scroll-item ${item.active ? 'active' : ''}`}
            >
              <img src={item.icon} alt={item.name} className="icon" />
              <span className="label">{item.name}</span>
            </div>
          ))}
        </div>
  )
}

export default GameListSlider
