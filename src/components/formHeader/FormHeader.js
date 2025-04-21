import React from 'react';

import { FiStar } from "react-icons/fi";
import { IoMdFolderOpen } from "react-icons/io";

import IconButton from '@mui/material/IconButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./FormHeader.css";
import { Avatar } from '@mui/material';

function FormHeader(){
    return (
        <div className="form_header">
            <div className="form_header_left">
            <input type="text" placeholder="Untitled Form" className="form_name"></input>
            <IoMdFolderOpen className="form_header_icon" style={{ marginRight:"10px"}}></IoMdFolderOpen>
                <FiStar className="form_header_icon" style={{ marginRight:"10px"}}/>
            </div>
            <div className="form_header_right">
                <IconButton>
                    <ColorLensIcon size="small" className="form_header_icon" />
                </IconButton>
                <IconButton>
                    <MoreVertIcon size="small" className="form_header_icon" />
                </IconButton>
                <IconButton>
                    <Avatar size="small" className="form_header_icon" />
                </IconButton>
            </div>
        </div>
    )
}
export default FormHeader;