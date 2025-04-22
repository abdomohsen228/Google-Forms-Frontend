import React, { useState } from 'react';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SubjectIcon from '@mui/icons-material/Subject';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { IconButton, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuestionForm.css';

function QuestionForm() {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState('Untitled document');
  const [formDescription, setFormDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [questions, setQuestions] = useState([]); // Start with empty array
  const [isSubmitting, setIsSubmitting] = useState(false);

  function addNewQuestion(type = 'text') {
    const newQuestion = {
      id: `q${questions.length + 1}`,
      questionText: "",
      questionType: type,
      options: type === 'text' || type === 'paragraph' ? [] : [{ id: '1', optionText: "Option 1" }],
      open: true,
      required: false,
      saved: false
    };
    setQuestions([...questions, newQuestion]);
  }

  function changeQuestion(text, i) {
    const newQuestions = [...questions];
    newQuestions[i].questionText = text;
    setQuestions(newQuestions);
  }

  function changeOptionValue(text, i, j) {
    const newQuestions = [...questions];
    newQuestions[i].options[j].optionText = text;
    setQuestions(newQuestions);
  }

  function addQuestionType(i, type) {
    const newQuestions = [...questions];
    newQuestions[i].questionType = type;
    if (type === 'text' || type === 'paragraph') {
      newQuestions[i].options = [];
    } else if (newQuestions[i].options.length === 0) {
      newQuestions[i].options = [{ id: '1', optionText: "Option 1" }];
    }
    setQuestions(newQuestions);
  }

  function toggleRequired(i) {
    const newQuestions = [...questions];
    newQuestions[i].required = !newQuestions[i].required;
    setQuestions(newQuestions);
  }

  function addOption(i) {
    const newQuestions = [...questions];
    if (newQuestions[i].questionType !== 'text' && newQuestions[i].questionType !== 'paragraph') {
      const newOptionId = `q${i+1}-o${newQuestions[i].options.length + 1}`;
      newQuestions[i].options.push({ 
        id: newOptionId,
        optionText: `Option ${newQuestions[i].options.length + 1}` 
      });
      setQuestions(newQuestions);
    }
  }

  function removeOption(i, j) {
    const newQuestions = [...questions];
    if (newQuestions[i].options.length > 1) {
      newQuestions[i].options.splice(j, 1);
      setQuestions(newQuestions);
    }
  }

  function toggleQuestionOpen(i) {
    const newQuestions = [...questions];
    newQuestions[i].open = !newQuestions[i].open;
    if (!newQuestions[i].open) {
      newQuestions[i].saved = true;
    }
    setQuestions(newQuestions);
  }

  function deleteQuestion(i) {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const newQuestions = [...questions];
      newQuestions.splice(i, 1);
      setQuestions(newQuestions);
    }
  }

  async function submitForm() {
    setIsSubmitting(true);
    try {
      const formattedQuestions = questions.map((q, index) => {
        const questionType = q.questionType === 'text' ? 'short_text' : 
                           q.questionType === 'checkbox' ? 'checkboxes' :
                           q.questionType === 'radio' ? 'multiple_choice' : 
                           q.questionType === 'paragraph' ? 'paragraph' : 'short_text';
        
        return {
          type: questionType,
          questionText: q.questionText,
          isRequired: q.required,
          options: questionType === 'short_text' || questionType === 'paragraph' ? [] : q.options.map(opt => opt.optionText),
          settings: {},
          order: index + 1,
        };
      });

      const formData = {
        title: formTitle,
        description: formDescription,
        isPublic: isPublic,
        questions: formattedQuestions
      };

      console.log('Submitting form:', JSON.stringify(formData, null, 2));

      const response = await axios.post('http://localhost:3000/form', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      navigate('/success', { 
        state: { 
          formId: response.data.GeneratedFormId,
          formTitle: formTitle 
        } 
      });
    } catch (error) {
      console.error('Error creating form:', error);
      alert(error.response?.data?.message || 'Failed to create form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function questionUI() {
    return questions.map((ques, i) => (
      <div key={ques.id}>
        <Accordion expanded={ques.open} onChange={() => toggleQuestionOpen(i)} className={ques.saved ? 'saved_question' : ''}>
          <AccordionSummary
            aria-controls={`panel${i}-content`}
            id={`panel${i}-header`}
            style={{ width: '100%' }}
          >
            {!ques.open ? (
              <div className="saved_questions">
                <Typography
                  style={{
                    fontSize: '15px',
                    fontWeight: ques.saved ? '500' : '400',
                    letterSpacing: '.1px',
                    lineHeight: '24px',
                    paddingBottom: '8px',
                    color: ques.saved ? '#333' : '#666'
                  }}
                >
                  {i + 1}. {ques.questionText || "Untitled question"}
                </Typography>

                {ques.saved && ques.options.map((op) => (
                  <div key={op.id} style={{ display: 'flex' }}>
                    <FormControlLabel
                      style={{ marginLeft: '5px', marginBottom: '5px' }}
                      disabled
                      control={
                        <input
                          type={ques.questionType}
                          color="primary"
                          style={{ marginRight: '3px' }}
                          required={ques.required}
                        />
                      }
                      label={
                        <Typography
                          style={{
                            fontFamily: 'Roboto, Arial, sans-serif',
                            fontSize: '13px',
                            fontWeight: '400',
                            letterSpacing: '.2px',
                            lineHeight: '20px',
                            color: '#202124',
                          }}
                        >
                          {op.optionText}
                        </Typography>
                      }
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </AccordionSummary>

          <AccordionDetails className="add_question">
            <div className="question_boxes">
              <div className="add_question_top">
                <input
                  type="text"
                  className="question"
                  placeholder="Question"
                  value={ques.questionText}
                  onChange={(e) => changeQuestion(e.target.value, i)}
                />
                <CropOriginalIcon style={{ color: '#5f6368' }} />
                <Select
                  className="select"
                  style={{ color: '#5f6368', fontSize: '13px' }}
                  value={ques.questionType}
                  onChange={(e) => addQuestionType(i, e.target.value)}
                >
                  <MenuItem value="text">
                    <SubjectIcon style={{ marginRight: '10px' }} /> Short Text
                  </MenuItem>
                  <MenuItem value="paragraph">
                    <SubjectIcon style={{ marginRight: '10px' }} /> Paragraph
                  </MenuItem>
                  <MenuItem value="checkbox">
                    <CheckBoxIcon
                      style={{ marginRight: '10px', color: '#70757a' }}
                      checked
                    />{' '}
                    Checkboxes
                  </MenuItem>
                  <MenuItem value="radio">
                    <Radio
                      style={{ marginRight: '10px', color: '#70757a' }}
                      checked
                    />{' '}
                    Multiple Choice
                  </MenuItem>
                </Select>
              </div>

              {(ques.questionType === 'checkbox' || ques.questionType === 'radio') && ques.options.map((op, j) => (
                <div className="add_question_body" key={op.id}>
                  <input
                    type={ques.questionType}
                    style={{ marginRight: '10px' }}
                  />
                  <div>
                    <input
                      type="text"
                      className="text_input"
                      placeholder="option"
                      value={op.optionText}
                      onChange={(e) => changeOptionValue(e.target.value, i, j)}
                    />
                  </div>
                  <IconButton aria-label="delete" onClick={() => removeOption(i, j)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}

              <div className="add_footer">
                <div className="add_question_bottom_left">
                  {(ques.questionType === 'checkbox' || ques.questionType === 'radio') && (
                    <Button
                      size="small"
                      style={{
                        textTransform: 'none',
                        color: '#4285f4',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                      onClick={() => addOption(i)}
                    >
                      <AddCircleOutlineIcon
                        style={{ border: '2px solid #4285f4', padding: '2px', marginRight: '8px' }}
                      />{' '}
                      Add Option
                    </Button>
                  )}
                </div>
                <div className="add_question_bottom">
                  <IconButton 
                    aria-label="Delete" 
                    onClick={() => deleteQuestion(i)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <span style={{ color: '#5f6368', fontSize: '13px' }}>
                    Required{' '}
                  </span>
                  <Switch
                    name="checkedA"
                    color="primary"
                    checked={ques.required}
                    onChange={() => toggleRequired(i)}
                  />
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    ));
  }

  return (
    <div className="question_form">
      <br />
      <div className="section">
        <div className="question_title_section">
          <div className="question_form_top">
            <input
              type="text"
              className="question_form_top_name"
              style={{ color: 'black' }}
              placeholder="Untitled document"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <input
              type="text"
              className="question_form_top_desc"
              placeholder="Form Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
          <div className="form_visibility">
            <span>Make form public: </span>
            <Switch
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              color="primary"
            />
          </div>
        </div>
        
        {questions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h6" style={{ marginBottom: '16px' }}>
              No questions added yet
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => addNewQuestion()}
            >
              Add Your First Question
            </Button>
          </div>
        ) : (
          <>
            {questionUI()}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={() => addNewQuestion()}
                style={{ marginRight: '10px' }}
              >
                Add Question
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={submitForm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Form'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionForm;