import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import clsx from "clsx";

import { connect } from "react-redux";
import { getPostById } from "../../../redux/postsRedux.js";
import { getStatus } from "../../../redux/usersRedux.js";

import styles from "./Post.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 345,
  },
  media: {
    // height: 0,
    //  paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    //transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Component = ({ className, children, post, userStatus }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={clsx(className, styles.root)}>
      <Paper className={styles.component} elevation={9}>
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
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.text}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Fab
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  variant="extended"
                  size="small"
                  color="primary"
                >
                  {" "}
                  More details
                  <ExpandMoreIcon />
                </Fab>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph> Status: {post.status}</Typography>
                  <Typography paragraph> Price: {post.price}</Typography>
                  <Typography paragraph>Author:{post.author}</Typography>
                  <Typography paragraph>Phone:{post.phone}</Typography>
                  <Typography>Location:{post.location}</Typography>
                </CardContent>
              </Collapse>
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
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  userStatus: getStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });
const Container = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
