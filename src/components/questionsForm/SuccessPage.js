import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Typography, 
  Box, 
  Paper, 
  Snackbar,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PreviewIcon from '@mui/icons-material/Preview';
import HomeIcon from '@mui/icons-material/Home';
import ShareIcon from '@mui/icons-material/Share';

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formId, formTitle } = location.state || {};
  const formUrl = `${window.location.origin}/forms/${formId}/submit`;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formUrl);
    setSnackbarMessage('Link copied to clipboard!');
    setOpenSnackbar(true);
  };

  const shareForm = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: formTitle || 'Form',
          text: 'Please fill out this form',
          url: formUrl,
        });
      } else {
        copyToClipboard();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (!formId) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          No form data found. Please create a form first.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
          startIcon={<HomeIcon />}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          🎉 Form Created Successfully!
        </Typography>
        
        {formTitle && (
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            "{formTitle}"
          </Typography>
        )}
        
        <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
          Share this link with others to start collecting responses:
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#f5f5f5', 
          p: 1, 
          borderRadius: 1,
          mb: 3
        }}>
          <Typography variant="body1" sx={{ 
            flexGrow: 1, 
            wordBreak: 'break-all',
            textAlign: 'left',
            px: 1
          }}>
            {formUrl}
          </Typography>
          <Tooltip title="Copy link">
            <IconButton onClick={copyToClipboard}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Tooltip title="Preview your form">
            <Button 
              variant="contained" 
              color="primary" 
              href={formUrl} 
              target="_blank"
              startIcon={<PreviewIcon />}
            >
              Preview Form
            </Button>
          </Tooltip>
          
          <Tooltip title="Share via native share dialog">
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={shareForm}
              startIcon={<ShareIcon />}
            >
              Share
            </Button>
          </Tooltip>
          
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/')}
            startIcon={<HomeIcon />}
          >
            My Forms
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SuccessPage;