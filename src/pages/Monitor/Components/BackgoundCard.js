import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  subtitle: {
    fontWeight: 'light',
    fontSize: 14,
    color: 'grey'
  }
});

export default function BackgoundCard({ header,subheader }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" style={{marginTop:15}}>
      <Typography variant="h6" className={classes.title}>
        {header}
      </Typography>
      <Typography display="block" className={classes.subtitle}>
        {subheader} </Typography>
    </Container>
  );
}
