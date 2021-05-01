import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { getStatus } from "../../../redux/usersRedux.js";

import styles from "./Header.module.scss";

const Component = ({ className, children, userStatus }) => {
  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar className={styles.toolbar}>
            <Typography variant="h6">
              <Link to={"/"} className={styles.link}>
                Bulletin Board
              </Link>
            </Typography>
            <Button
              color="inherit"
              className={styles.login}
              href="https://google.com"
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        {userStatus === true ? (
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
      </Container>
      {children}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userStatus: getStatus(state),
});

const ContainerH = connect(mapStateToProps)(Component);

export {
  //Component as Header,
  ContainerH as Header,
  Component as HeaderComponent,
};
