import React, { useState, useEffect } from 'react';
import StorageIcon from '@mui/icons-material/Storage';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import docImage from '../../assets/images/docImage.jpg';
import axios from 'axios';
import './MainBody.css';

function MainBody() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalForms: 0,
    totalPages: 1
  });

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/form/', {
          params: {
            page: pagination.page,
            limit: pagination.limit
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        setForms(response.data.forms);
        setPagination({
          page: response.data.page,
          limit: response.data.limit,
          totalForms: response.data.totalForms,
          totalPages: response.data.totalPages
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [pagination.page, pagination.limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  if (loading) {
    return (
      <div className="mainbody">
        <div className="loading-container">
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mainbody">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

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
        {forms.length === 0 ? (
          <div className="no-forms-message">
            No forms found. Create your first form!
          </div>
        ) : (
          forms.map(form => (
            <div key={form._id} className="doc_card">
              <img src={docImage} alt="Form preview" className="doc_image" />
              <div className="doc_card_content">
                <h5>{form.title || 'Untitled Form'}</h5>
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
                    {new Date(form.createdAt).toLocaleDateString()}
                  </div>
                  <MoreVertIcon style={{ fontSize: "16px", color: "gray" }} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button 
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default MainBody;