import Image from 'next/image';
import React from 'react';

const Providers = () => {
  const cards = [
    { id: 1, src: '/assets/images/mm.webp', alt: 'Jackpot Race' },
    { id: 2, src: '/assets/images/Endorphina.webp', alt: 'Habanero' },
    { id: 3, src: '/assets/images/Habanero.webp', alt: 'Greentube' },
    { id: 4, src: '/assets/images/Hacksaw.webp', alt: 'Pragmatic Play' },
    { id: 5, src: '/assets/images/3_Oaks.webp', alt: 'Smartsoft Gaming' },
    { id: 6, src: '/assets/images/bet-slot.webp', alt: 'AGT Software' },
    { id: 8, src: '/assets/images/Pragmaticnew.webp', alt: 'Pragmatic Live' },
    { id: 9, src: '/assets/images/mm.webp', alt: 'Jackpot Race' },
    { id: 10, src: '/assets/images/Hacksaw.webp', alt: 'Habanero' },
    { id: 11, src: '/assets/images/mm.webp', alt: 'Greentube' },
    { id: 12, src: '/assets/images/Habanero.webp', alt: 'Pragmatic Play' },
    { id: 13, src: '/assets/images/mm.webp', alt: 'Smartsoft Gaming' },
    { id: 14, src: '/assets/images/Habanero.webp', alt: 'AGT Software' },
    { id: 15, src: '/assets/images/Endorphina.webp', alt: 'Pragmatic Live' },
  ];

  return (
    <div className="provider-scroll-container">
      {cards.map((card) => (
        <div className="provider-card" key={card.id}>
          <Image src={card.src} alt={card.alt} width={160} height={27} />
        </div>
      ))}
    </div>
  );
};

export default Providers;
