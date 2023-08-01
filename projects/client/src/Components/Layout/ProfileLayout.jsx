import React from 'react';
import MenuBarDesktop from './MenuBarDesktop';

const ProfileLayout = (props) => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-center px-4 gap-4 pt-2">
      <MenuBarDesktop />
      {props.children}
    </div>
  );
};

export default ProfileLayout;
