import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import TotalLinhas from '../components/TotalLinhas';
import TotalEquipamentos from '../components/TotalEquipamentos';
import Chart from '../components/Chart';

export default function Home() {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      [theme.breakpoints.down(540)]: {
        flexDirection: 'column',
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Container component="div" className={classes.container}>
        <TotalLinhas />
        <TotalEquipamentos />
      </Container>
      <Container>
        <Chart />
      </Container>
    </>
  );
}
