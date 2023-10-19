import React, { useState, useEffect } from 'react';

import { SContainer } from './styles';

const NavFixed: React.FC = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <SContainer scroll={window.scrollY}>
      {children}
    </SContainer>

  );
};

export default NavFixed;
