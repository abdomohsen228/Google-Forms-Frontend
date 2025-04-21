import React from 'react';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tab: {
    fontSize: 12,
    color: "#5f6368",
    textTransform: "capitalize",
    height: 10,
    fontWeight: "600",
    fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
  },
  tabs: {
    height: 10
  }
});

function FormTabs() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          className={classes.tabs}
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab label="Question" className={classes.tab} />
          <Tab label="Responses" className={classes.tab} />
        </Tabs>
      </Paper>
    </div>
  );
}

export default FormTabs;
