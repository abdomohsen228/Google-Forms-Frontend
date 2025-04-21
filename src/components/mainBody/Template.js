import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import "./Template.css"
import blank from '../../assets/images/forms-blank-googlecolors.png';
import uuid from "react-uuid"
import { useNavigate } from 'react-router-dom';

function Template(){
  const navigate = useNavigate();
  const createForm = () => {
    const id_ = uuid();
    navigate("/form/" + id_);
  };
  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <span style={{ fontSize: "16px", color: "#202124" }}>Start New Form</span>
        </div>
        <div className="template_right">
          <div className="gallery_button">

          </div>
          <IconButton>
            <MoreVertIcon fontSize="small"/>
          </IconButton>
        </div>
      </div>
      <div className="template_body">
        <div className="card" onClick={createForm}>
           <img src={blank} alt="Blank form preview" className="card_image"/>
        <p className="card_title">Blank</p>
        </div>
      </div>
    </div>
  );
}

export default Template;
