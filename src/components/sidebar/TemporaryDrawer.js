import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

import docImage from '../../assets/images/docs_2020q4_48dp.png';
import slidesImage from '../../assets/images/slides_2020q4_48dp.png';
import sheetImage from '../../assets/images/sheets_2020q4_48dp.png';

function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{ width: "250px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List>
        {/* Title at the top of the sidebar */}
        <ListItem style={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '16px' }}>
          Mohsen Form
        </ListItem>
        <Divider />
        <ListItem>
          <img src={docImage} alt="Docs Icon" style={{ marginRight: "10px", height: "30px", width: "30px" }} />
          <span>Documents</span>
        </ListItem>
        <ListItem>
          <img src={slidesImage} alt="Slides Icon" style={{ marginRight: "10px", height: "30px", width: "30px" }} />
          <span>Slides</span>
        </ListItem>
        <ListItem>
          <img src={sheetImage} alt="Sheets Icon" style={{ marginRight: "10px", height: "30px", width: "30px" }} />
          <span>Sheets</span>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={state['left']} onClose={toggleDrawer("left", false)} anchor={'left'}>
        {list('left')}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;
