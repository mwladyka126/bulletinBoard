import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from "./NotFound.module.scss";

const Component = ({ className, children }) => (
  <Paper className={styles.component} elevation={9}>
    <Grid
      container
      justify="center"
      direction="column"
      justify="center"
      alignItems="center"
      xl
    >
      <Grid item>
        <Typography className={styles.title} variant="h2" component="h2">
          Not found
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" component={Link} to={"/"}>
          Homepage
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
