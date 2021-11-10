import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CssBaseline, Container, Typography } from '@material-ui/core';

import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  item: {
    margin: theme.spacing(3),
  },
  pastLease: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const NewLease = ({ drizzle, drizzleState }) => {
  const classes = useStyles();
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const web3 = drizzle.web3;
      const contract = drizzle.contracts.Housing;
      const yourContractWeb3 = new web3.eth.Contract(contract.abi, contract.address);

      let fetchedEvents = await yourContractWeb3.getPastEvents('PaidRent', {
        fromBlock: 0,
      });

      let parsedEvents = await Promise.all(
        fetchedEvents
          .filter((pastEvent) => pastEvent.returnValues.tenant === drizzleState.accounts[0])
          .map(async ({ returnValues: { leaseId, tenant } }) => {
            return {
              leaseId,
              tenant,
            };
          })
      );

      setPastEvents(parsedEvents);
    })();
    // eslint-disable-next-line
  }, [drizzleState.contracts.Housing.events]);

  const formik = useFormik({
    initialValues: {
      leaseId: 0,
    },
    onSubmit: async ({ leaseId }) => {
      try {
        console.log(leaseId);
        const rent = await drizzle.contracts.Housing.methods.rent(leaseId).call();
        console.log(rent);
      } catch (error) {
        alert('Please upload a lease contract');
      }
    },
  });

  return (
    <>
      <CssBaseline />
      <Container>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.item}>
                  <Typography variant="h5">Pay rent to a lease contract</Typography>
                </Grid>

                <form onSubmit={formik.handleSubmit}>
                  <Grid item xs={6} className={classes.item}>
                    <TextField
                      fullWidth
                      id="leaseId"
                      name="leaseId"
                      label="Lease ID"
                      type="number"
                      value={formik.values.leaseId}
                      onChange={formik.handleChange}
                      error={formik.touched.leaseId && Boolean(formik.errors.leaseId)}
                      helperText={formik.touched.leaseId && formik.errors.leaseId}
                    />
                  </Grid>

                  <Grid item xs={6} className={classes.item}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                      Pay
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default NewLease;
