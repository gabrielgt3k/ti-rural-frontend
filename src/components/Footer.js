import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="http://www.ruralbrasil.com/">
        Rural Brasil - Tecnologia da Informação
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    // position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'column',
    marginTop: 'auto',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container align="center" maxWidth="sm">
          <Typography variant="body1" />
          <Copyright />
        </Container>
      </footer>
    </>
  );
}
