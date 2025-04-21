import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography, Box, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function SuccessPage() {
  const location = useLocation();
  const { formId, formTitle } = location.state || {};
  const formUrl = `${window.location.origin}/submit/${formId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formUrl);
    alert('Link copied to clipboard!');
  };

  if (!formId) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          No form data found. Please create a form first.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Form Created Successfully!
        </Typography>
        <Typography variant="h6" gutterBottom>
          {formTitle}
        </Typography>
        
        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          Share this link with others to collect responses:
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#f5f5f5', 
          p: 1, 
          borderRadius: 1,
          mb: 2
        }}>
          <Typography variant="body1" sx={{ flexGrow: 1, wordBreak: 'break-all' }}>
            {formUrl}
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<ContentCopyIcon />} 
            onClick={copyToClipboard}
            sx={{ ml: 1 }}
          >
            Copy
          </Button>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          href={formUrl} 
          target="_blank"
          sx={{ mr: 2 }}
        >
          View Form
        </Button>
        
        <Button 
          variant="contained" 
          color="secondary" 
          href="/"
        >
          Back to My Forms
        </Button>
      </Paper>
    </Box>
  );
}

export default SuccessPage;