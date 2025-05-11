import Image from 'next/image';
import React from 'react';

const GameListSlider = () => {
  const categories = [
    {
      type: 'text',
      icon: '/assets/images/home-1.svg',
      label: 'Home',
    },
    {
      type: 'image',
      image: '/assets/images/spinwin.webp',
    },
    {
      type: 'image',
      image: '/assets/images/34free.webp',
    },
    {
      type: 'image',
      image: '/assets/images/drops-wins.svg',
    },
    {
      type: 'text',
      icon: '/assets/images/blackjackicon.svg',
      label: 'Live Tables',
    },
    { type: 'text', label: 'Bet Games', icon: '/assets/images/betgames.svg' },
    { type: 'text', label: 'First Games', icon: '/assets/images/1stp.svg' },
    {
      type: 'text',
      icon: '/assets/images/blackjackicon.svg',
      label: 'Live Tables',
    },
    {
      type: 'text',
      icon: '/assets/images/aviator-anim.gif',
      label: 'Crash',
    },
    { type: 'text', label: 'New', icon: '/assets/images/new.svg' },

    {
      type: 'text',
      icon: '/assets/images/blackjackicon.svg',
      label: 'Live Tables',
    },
    {
      type: 'text',
      icon: '/assets/images/blackjackicon.svg',
      label: 'Live Tables',
    },
    {
      type: 'text',
      icon: '/assets/images/blackjackicon.svg',
      label: 'Live Tables',
    },
    {
      type: 'text',
      icon: '/assets/images/aviator-anim.gif',
      label: 'Crash',
    },
    { type: 'text', label: 'New', icon: '/assets/images/new.svg' },

    {
      type: 'text',
      icon: '/assets/images/blackjackicon.svg',
      label: 'Live Tables',
    },
  ];
  return (
    <div className="game-list-slider-wrapper">
      {categories.map((cat, index) => (
        <div key={index} className="game-list-item">
          {cat.type === 'text' ? (
            <>
              <div className="icon-wrapper">
                <Image src={cat.icon} alt={cat.label} width={30} height={30} />
              </div>
              <span className="label">{cat.label}</span>
            </>
          ) : (
            <Image
              src={cat.image}
              alt="Category Image"
              width={60}
              height={60}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default GameListSlider;
