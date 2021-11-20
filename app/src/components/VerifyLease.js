import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import crypto from 'crypto';

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

const VerifyLease = ({ drizzle, drizzleState }) => {
  const [buffer, setBuffer] = useState();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      leaseId: 0,
    },
    onSubmit: async ({ leaseId }) => {
      try {
        const hash = crypto.createHash('sha256').update(buffer).digest('hex');
        const leaseHash = await drizzle.contracts.Housing.methods.leaseHash(leaseId).call();
        if (hash === leaseHash) {
          alert('The lease is valid');
        } else {
          alert('The lease is NOT valid');
        }
      } catch (error) {
        alert('The lease ID is invalid or you did not upload a file.');
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
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid item xs={12} className={classes.item}>
          <Typography variant="h5">Verify that your lease copy matches the uploaded lease</Typography>
        </Grid>

        <form onSubmit={formik.handleSubmit}>
          <Grid item xs={6} className={classes.item}>
            <input type="file" onChange={captureFile} />
          </Grid>
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
              Verify
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default VerifyLease;
