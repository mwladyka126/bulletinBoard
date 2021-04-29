import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from "./Header.module.scss";

const Component = ({ className, children }) => {
  const [user, setUser] = useState(false);

  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6">
            <Link
              to={"/"}
              className={styles.link}
              onClick={() => setUser(!user)}
            >
              Bulletin Board
            </Link>
          </Typography>
          <Button
            color="inherit"
            className={styles.login}
            onClick={() => setUser(!user)}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        {user === true ? (
          <>
            <Typography variant="h6">
              <Link to={"/"} className={styles.link}>
                LIST OF YOURS ADDS
              </Link>
            </Typography>
            <Button color="inherit" variant="outlined">
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" variant="outlined">
            Login
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

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
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
