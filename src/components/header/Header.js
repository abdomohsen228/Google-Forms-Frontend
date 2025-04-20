import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import FaceIcon from '@mui/icons-material/Face';
import headerImage from '../../assets/images/photo_2025-04-20_17-59-54.jpg';
import './Header.css';

function Header() {
  return (
    <div className='header'>
      <div className='header_info'>
        <IconButton>
          <MenuIcon />
        </IconButton>

        <img src={headerImage} alt='logo' style={{height:"40px",width:"40px"}} className="form_image" />
        <div className='info'>
            Forms
        </div>
      </div>

      <div className='header_search'>
      <IconButton>
         <SearchIcon />
      </IconButton>

        <input type="text" name="search" placeholder="Search..." />
      </div>

      <div className='header_right'>
      <IconButton>
        <AppsIcon />
       </IconButton>

       <IconButton>
        <FaceIcon />
       </IconButton>
      </div>
    </div>
  );
}

export default Header;
