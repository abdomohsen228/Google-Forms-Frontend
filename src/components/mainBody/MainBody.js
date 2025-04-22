import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageIcon from '@mui/icons-material/Storage';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import docImage from '../../assets/images/docImage.jpg';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import './MainBody.css';

function MainBody() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionsDialogOpen, setSubmissionsDialogOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleFormClick = async (formId) => {
    try {
      setSubmissionsLoading(true);
      const response = await axios.get(`http://localhost:3000/forms/${formId}/all-submission`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setSubmissions(response.data.submissions);
      setSubmissionsDialogOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch submissions');
    } finally {
      setSubmissionsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setSubmissionsDialogOpen(false);
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
            <div 
              key={form._id} 
              className="doc_card"
              onClick={() => handleFormClick(form.GeneratedFormId)}
              style={{ cursor: 'pointer' }}
            >
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

      <Dialog
        open={submissionsDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Form Submissions</DialogTitle>
        <DialogContent>
          {submissionsLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <CircularProgress />
            </div>
          ) : submissions.length === 0 ? (
            <Typography variant="body1" style={{ padding: '20px', textAlign: 'center' }}>
              No submissions yet
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Submitted By</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Answers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((submission, index) => (
                    <TableRow key={index}>
                      <TableCell>{submission.submittedBy}</TableCell>
                      <TableCell>
                        {new Date(submission.submittedAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {submission.answers.map((answer, idx) => (
                          <div key={idx}>
                            <strong>Q{idx + 1}:</strong> {answer.answerText || answer.answerOptions.join(', ')}
                          </div>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MainBody;