import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import { connect } from "react-redux";
import {
  getAll,
  getLoadingState,
  fetchPublished,
} from "../../../redux/postsRedux.js";
import { fetchLoggedUser, getLoggedUser } from "../../../redux/usersRedux.js";
import { getStatus } from "../../../redux/userSwitcherRedux.js";

import styles from "./Homepage.module.scss";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

import { Loading } from "../../common/Loading/Loading";
import { Error } from "../../common/Error/Error";

class Component extends React.Component {
  componentDidMount() {
    const { fetchPublishedPosts, fetchUser } = this.props;
    fetchPublishedPosts();
    fetchUser();
  }
  render() {
    const {
      className,
      posts,
      userStatus,
      loading: { active, error },
      currentUser,
    } = this.props;
    console.log(currentUser);
    if (active || !posts.length) {
      return (
        <Paper className={styles.component}>
          <Loading />
        </Paper>
      );
    } else if (error) {
      return (
        <Paper className={styles.component}>
          <Error>{error}</Error>
        </Paper>
      );
    } else {
      return (
        <div className={clsx(className, styles.root)}>
          {userStatus === true ? (
            <div className={styles.buttonAdd}>
              <Link to={"/post/add"} variant="subtitle1" color="secondary">
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  variant="extended"
                >
                  Add new add
                </Fab>
              </Link>
            </div>
          ) : null}
          {posts.map((post) => (
            <Paper key={post._id} className={styles.component} elevation={9}>
              <Grid
                container
                spacing={3}
                alignContent="center"
                justify="center"
              >
                <Grid item xs={12} sm={5}>
                  <div className={styles.photoWrapper}>
                    <img src={post.photo} alt={post.title} />
                  </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Card>
                    <CardHeader
                      title={post.title}
                      subheader={`Publication date: ${post.created}, last update: ${post.updated}`}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ wordWrap: "break-word" }}
                      >
                        {post.text}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <div className={styles.linkWrapper}>
                        <Link
                          to={`/post/${post._id}/`}
                          variant="subtitle1"
                          color="secondary"
                        >
                          <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            className={styles.fab}
                          >
                            More details
                          </Fab>
                        </Link>
                      </div>

                      {userStatus === true ? (
                        <div className={styles.linkWrapper}>
                          <Link
                            to={`/post/${post._id}/edit`}
                            variant="subtitle1"
                            color="secondary"
                          >
                            <Fab
                              size="small"
                              color="secondary"
                              aria-label="add"
                              variant="extended"
                            >
                              Edit post
                            </Fab>
                          </Link>
                        </div>
                      ) : null}
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      );
    }
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.bool,
  posts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  posts: getAll(state),
  userStatus: getStatus(state),
  loading: getLoadingState(state),
  currentUser: getLoggedUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
  fetchUser: () => dispatch(fetchLoggedUser()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
