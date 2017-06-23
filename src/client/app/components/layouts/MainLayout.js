import React, {PropTypes} from 'react';

const MainLayout = ({children}) => {
  return (
    <div id='main' className='main-layout'>
      <div id='content' className='content-layout'>
        {children}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element
};

export default MainLayout;
