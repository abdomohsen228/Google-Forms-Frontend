import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Box, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Checkbox, 
  FormGroup,
  FormControl,
  FormLabel,
  Alert,
  Paper
} from '@mui/material';
import axios from 'axios';

function SubmitForm() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/form/${formId}`);
        setForm(response.data);
        
        const initialAnswers = response.data.questions.map(question => ({
          questionId: question._id,
          answerText: '',
          answerOptions: []
        }));
        setAnswers(initialAnswers);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load form');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleAnswerChange = (questionIndex, value, isCheckbox = false) => {
    const newAnswers = [...answers];
    
    if (isCheckbox) {
      const optionIndex = newAnswers[questionIndex].answerOptions.indexOf(value);
      if (optionIndex === -1) {
        newAnswers[questionIndex].answerOptions.push(value);
      } else {
        newAnswers[questionIndex].answerOptions.splice(optionIndex, 1);
      }
    } else {
      newAnswers[questionIndex].answerText = value;
    }
    
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const submissionData = {
        answers: [
          {
            questionId: form.questions[0]._id,
            answerText: email
          },
          ...answers.slice(1)
        ]
      };

      const response = await axios.post(
        `http://localhost:3000/forms/${formId}/submit`,
        submissionData
      );

      setSuccess(response.data.message);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    }
  };

  if (loading) return <Container><Typography>Loading form...</Typography></Container>;
  if (error) return <Container><Typography color="error">{error}</Typography></Container>;
  if (!form) return <Container><Typography>Form not found</Typography></Container>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 5, p: 4, bgcolor: '#f9f9f9' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {form.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {form.description}
        </Typography>
        
        {success && (
          <Alert severity="success" sx={{ my: 2 }}>
            {success}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          {form.questions.slice(1).map((question, index) => (
            <Box
              key={question._id}
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 3,
                my: 2,
                backgroundColor: '#fff'
              }}
            >
              <FormControl fullWidth required={question.isRequired}>
                <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {question.QuestionTitle || 'Untitled Question'}
                </FormLabel>
    
                {question.type === 'short_text' || question.type === 'paragraph' ? (
                  <TextField
                    variant="outlined"
                    multiline={question.type === 'paragraph'}
                    rows={question.type === 'paragraph' ? 4 : 1}
                    value={answers[index + 1]?.answerText || ''}
                    onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
                    required={question.isRequired}
                  />
                ) : question.type === 'multiple_choice' ? (
                  <RadioGroup
                    value={answers[index + 1]?.answerText || ''}
                    onChange={(e) => handleAnswerChange(index + 1, e.target.value)}
                  >
                    {question.options.map((option, optIndex) => (
                      <FormControlLabel
                        key={optIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                ) : question.type === 'checkboxes' ? (
                  <FormGroup>
                    {question.options.map((option, optIndex) => (
                      <FormControlLabel
                        key={optIndex}
                        control={
                          <Checkbox
                            checked={answers[index + 1]?.answerOptions?.includes(option) || false}
                            onChange={() => handleAnswerChange(index + 1, option, true)}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormGroup>
                ) : null}
              </FormControl>
            </Box>
          ))}

          <Box sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default SubmitForm;
