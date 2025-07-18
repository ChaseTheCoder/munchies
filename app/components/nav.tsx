import Image from "next/image";
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav>
      <Image
        src="/vector.png"
        alt="Next.js logo"
        width={180}
        height={28}
        priority
      />
    </nav>
  );
};

export default Nav;