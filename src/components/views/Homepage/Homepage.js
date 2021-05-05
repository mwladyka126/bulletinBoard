import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import { connect } from "react-redux";
import { getAll } from "../../../redux/postsRedux.js";
import { getStatus } from "../../../redux/usersRedux.js";

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

const Component = ({ className, posts, userStatus }) => {
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
        <Paper key={post.id} className={styles.component} elevation={9}>
          <Grid container spacing={3} alignContent="center" justify="center">
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
                      to={`/post/${post.id}/`}
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
                        to={`/post/${post.id}/edit`}
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
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.bool,
  posts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  posts: getAll(state),
  userStatus: getStatus(state),
});

//const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
