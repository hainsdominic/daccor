import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CssBaseline, Container, Typography } from '@material-ui/core';

import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import crypto from 'crypto';

import weiToUSD from '../utils/weiToUSD';

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
  const [buffer, setBuffer] = useState();
  const classes = useStyles();
  const [currentVisitorLeases, setCurrentVisitorLeases] = useState([]);

  useEffect(() => {
    (async () => {
      const leasesList = await drizzle.contracts.Housing.methods.getLeases().call();

      const currentLeases = await Promise.all(
        leasesList
          .filter((lease) => lease.owner === drizzleState.accounts[0])
          .map(async ({ rent, leaseHash }, idx) => {
            const rentUSD = await weiToUSD(rent);

            return {
              idx,
              rent,
              leaseHash,
              rentUSD,
            };
          })
      );

      setCurrentVisitorLeases(currentLeases);
    })();
    // eslint-disable-next-line
  }, [drizzleState.contracts.Housing.events]);

  const formik = useFormik({
    initialValues: {
      rent: 0,
    },
    onSubmit: async ({ rent }) => {
      try {
        const hash = crypto.createHash('sha256').update(buffer).digest('hex');
        await drizzle.contracts.Housing.methods.newLease.cacheSend(drizzleState.accounts[0], hash, rent.toString());
      } catch (error) {
        alert('Please upload a lease contract');
      }
    },
  });

  const captureFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    try {
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        setBuffer(Buffer(reader.result));
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.item}>
                  <Typography variant="h5">Create a new decentralized lease contract</Typography>
                </Grid>

                <form onSubmit={formik.handleSubmit}>
                  <Grid item xs={6} className={classes.item}>
                    <input type="file" onChange={captureFile} />
                  </Grid>
                  <Grid item xs={6} className={classes.item}>
                    <TextField
                      fullWidth
                      id="rent"
                      name="rent"
                      label="Rent amount in wei"
                      type="number"
                      value={formik.values.rent}
                      onChange={formik.handleChange}
                      error={formik.touched.rent && Boolean(formik.errors.rent)}
                      helperText={formik.touched.rent && formik.errors.rent}
                    />
                  </Grid>

                  <Grid item xs={6} className={classes.item}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                      Deploy
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.item}>
                  <Typography variant="h5">Your leases</Typography>
                </Grid>
                <Grid item xs={12} className={classes.item}>
                  {currentVisitorLeases.length > 0 &&
                    currentVisitorLeases.map(({ idx, leaseHash, rent, rentUSD }) => (
                      <Paper elevation={3} className={classes.pastLease} key={idx}>
                        <Typography variant="body1">ID: {idx}</Typography>
                        <Typography variant="body1">
                          Rent: {rent} wei or {rentUSD}
                        </Typography>
                        <Typography variant="body2">SHA256 Lease Hash: {leaseHash}</Typography>
                      </Paper>
                    ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default NewLease;
