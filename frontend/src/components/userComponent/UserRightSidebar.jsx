// src/components/userComponent/UserRightSidebar.jsx
import React from 'react';
import { Navbar } from 'react-bootstrap';

const UserRightSidebar = () => {
  return (
    <Navbar
      className="right-sidebar"
      bg="dark"
      variant="dark"
      style={{
        height: '80vh',
        width: '5vw',
        position: 'fixed',
        right: '0',
        backgroundColor: 'white',
        borderLeft: '1px solid white',
        top: '10vh'
      }}
    >
      {/* You can add additional sidebar content or shortcuts here */}
    </Navbar>
  );
};

export default UserRightSidebar;
