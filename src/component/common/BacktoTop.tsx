import { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { CustomButton } from '@/component/common';

/**
 * BackToTop is a button component that becomes visible when the user scrolls down a specified distance
 * on the page (300px in this case). When clicked, the button smoothly scrolls the page back to the top.
 *
 * This component listens for the scroll event and toggles the visibility of the "back to top" button,
 * making it a useful UI element for long pages.
 * */
const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top">
      {isVisible && (
        <CustomButton
          type="button"
          className="w-100 back-to-top-btn"
          onClick={scrollToTop}
        >
          Back to Top
        </CustomButton>
      )}
    </div>
  );
};

export default BackToTop;
