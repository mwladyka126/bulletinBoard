import React from "react";
import PropTypes from "prop-types";
import { AUTH_URL, API_URL } from "../../../config";
import { Link } from "react-router-dom";

import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { getStatus, getUserStatus } from "../../../redux/userSwitcherRedux.js";

import styles from "./Header.module.scss";

class Component extends React.Component {
  handleOnChange = (event) => {
    const { getUserStatus, user } = this.props;

    if (event === "true") {
      user.active = true;
      getUserStatus(true);
    } else {
      user.active = false;
      getUserStatus(false);
    }
  };
  render() {
    const { className, userStatus } = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <AppBar position="sticky" className={styles.appbar}>
          <Container maxWidth="xl">
            <Toolbar className={styles.toolbar}>
              <Typography variant="h6">
                <Link to={"/"} className={styles.link}>
                  Bulletin Board
                </Link>
              </Typography>
              {userStatus === true ? (
                <>
                  <Typography variant="h6">
                    <Link to={"/"} className={styles.link}>
                      LIST OF YOURS ADDS
                    </Link>
                  </Typography>
                  <Button
                    color="inherit"
                    variant="outlined"
                    className={styles.login}
                    href={`${AUTH_URL}/logout`}
                    value="false"
                    onClick={(event) => this.handleOnChange(event.target.value)}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  color="inherit"
                  variant="outlined"
                  href={`${AUTH_URL}/google`}
                  className={styles.login}
                  value="true"
                  onClick={(event) => this.handleOnChange(event.target.value)}
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  userStatus: getStatus(state),
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  getUserStatus: (user) => dispatch(getUserStatus(user)),
});

const ContainerH = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Header,
  ContainerH as Header,
  Component as HeaderComponent,
};
