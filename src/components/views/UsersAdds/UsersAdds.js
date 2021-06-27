import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import { connect } from "react-redux";
import {
  getAll,
  getLoadingState,
  fetchUserPosts,
} from "../../../redux/postsRedux.js";
import { getStatus } from "../../../redux/userSwitcherRedux.js";

import styles from "./UsersAdds.module.scss";

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
import { PostBox } from "../../features/PostBox/PostBox";

class Component extends React.Component {
  componentDidMount() {
    const { fetchPosts, posts } = this.props;
    fetchPosts();
  }
  componentDidUpdate(prevProps) {
    const { fetchPosts, posts } = this.props;
    if (posts === {} || posts !== prevProps.posts) {
      fetchPosts();
    }
  }

  render() {
    const {
      className,
      posts,
      userStatus,
      loading: { active, error },
    } = this.props;

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
            <PostBox
              photo={post.photo}
              title={post.title}
              created={post.created}
              updated={post.updated}
              text={post.text}
              id={post._id}
            />
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(fetchUserPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as UsersAdds,
  Container as UsersAdds,
  Component as UsersAddsComponent,
};
