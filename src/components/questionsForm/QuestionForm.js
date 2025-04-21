import React, { useState } from 'react';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ShortTextIcon from '@mui/icons-material/ShortText';
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
import './QuestionForm.css';

function QuestionForm() {
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      questionText: 'Which is the capital city of Egypt?',
      questionType: 'radio',
      options: [
        { id: 'q1-o1', optionText: 'Cairo' },
        { id: 'q1-o2', optionText: 'Alex' },
        { id: 'q1-o3', optionText: 'Aswan' },
        { id: 'q1-o4', optionText: 'Menia' },
      ],
      open: true,
      required: false,
      saved: false
    },
  ]);

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
    setQuestions(newQuestions);
  }

  function toggleRequired(i) {
    const newQuestions = [...questions];
    newQuestions[i].required = !newQuestions[i].required;
    setQuestions(newQuestions);
  }

  function addOption(i) {
    const newQuestions = [...questions];
    const newOptionId = `q${i+1}-o${newQuestions[i].options.length + 1}`;
    newQuestions[i].options.push({ 
      id: newOptionId,
      optionText: `Option ${newQuestions[i].options.length + 1}` 
    });
    setQuestions(newQuestions);
  }

  function removeOption(i, j) {
    const newQuestions = [...questions];
    if (newQuestions[i].options.length > 1) {
      newQuestions[i].options.splice(j, 1);
      setQuestions(newQuestions);
    }
  }

  function addMoreQuestionField() {
    const updatedQuestions = questions.map(q => ({
      ...q,
      open: false,
      saved: true
    }));

    const newId = `q${questions.length + 1}`;
    setQuestions([...updatedQuestions, {
      id: newId,
      questionText: "Question",
      questionType: "radio",
      options: [{ id: `${newId}-o1`, optionText: "Option 1" }],
      open: true,
      required: false,
      saved: false
    }]);
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
      if (newQuestions.length > 1) {
        newQuestions.splice(i, 1);
        setQuestions(newQuestions);
      }
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
                  {i + 1}. {ques.questionText}
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

              {ques.options.map((op, j) => (
                <div className="add_question_body" key={op.id}>
                  {ques.questionType === 'text' ? (
                    <ShortTextIcon style={{ marginRight: '10px' }} />
                  ) : (
                    <input
                      type={ques.questionType}
                      style={{ marginRight: '10px' }}
                    />
                  )}
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
            />
            <input
              type="text"
              className="question_form_top_desc"
              placeholder="Form Description"
            />
          </div>
        </div>
        {questionUI()}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addMoreQuestionField}
          >
            Add Question
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;