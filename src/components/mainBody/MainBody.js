import React from 'react';
import StorageIcon from '@mui/icons-material/Storage';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import docImage from '../../assets/images/docImage.jpg';

import IconButton from '@mui/material/IconButton';
import './MainBody.css';

function MainBody() {
  return (
    <div className="mainbody">
      <div className="mainbody_top">
        <div className="mainbody_top_left" style={{ fontSize: "16px", fontWeight: "500" }}>
          Recent forms
        </div>
        <div className="mainbody_top_right">
          <div className="mainbody_top_center" style={{ fontSize: "14px", marginRight: "125px" }}>
            You are the Creator for this form
            <ArrowDropDownIcon />
          </div>
          <IconButton>
            <StorageIcon style={{ fontSize: '16px', color: "black" }} />
          </IconButton>
          <IconButton>
            <FolderOpenIcon style={{ fontSize: '16px', color: "black" }} />
          </IconButton>
        </div>
      </div>
      <div className="mainbody_docs">
        <div className="doc_card">
          <img src={docImage} alt="Document preview" className="doc_image" />
          <div className="doc_card_content">
            <h5>Document Title</h5>
            <div className="doc_content" style={{ fontSize: "12px", color: "gray" }}>
              <div className="content_left">
                <StorageIcon
                  style={{
                    color: "white",
                    fontSize: "12px",
                    backgroundColor: "#6E2594",
                    padding: "3px",
                    marginRight: "3px",
                    borderRadius: "2px"
                  }}
                />
              </div>
              <MoreVertIcon style={{ fontSize: "16px", color: "gray" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBody;
