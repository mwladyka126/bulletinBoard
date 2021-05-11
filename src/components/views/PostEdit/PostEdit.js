import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ImageUploader from "react-images-upload";

import { connect } from "react-redux";
import { getStatus } from "../../../redux/userSwitcherRedux.js";
import {
  editPostRequest,
  getOne,
  fetchOnePostFromAPI,
} from "../../../redux/postsRedux.js";

import styles from "./PostEdit.module.scss";
import { NotFound } from "../NotFound/NotFound.js";

class Component extends React.Component {
  state = {
    post: {},
    error: null,
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.postToEdit === {} ||
      this.props.postToEdit._id !== prevProps.postToEdit._id
    ) {
      this.props.fetchPost();
      this.setState({
        post: {
          _id: this.props.postToEdit._id,
          author: this.props.postToEdit.author,
          created: this.props.postToEdit.created,
          updated: this.props.postToEdit.updated,
          status: this.props.postToEdit.status,
          title: this.props.postToEdit.title,
          text: this.props.postToEdit.text,
          photo: this.props.postToEdit.photo,
          price: this.props.postToEdit.price,
          phone: this.props.postToEdit.phone,
          location: this.props.postToEdit.location,
        },
      });
    }
  }

  setPhoto = (files) => {
    const { post } = this.state;
    console.log(files[0]);

    if (files) this.setState({ post: { ...post, photo: files[0].name } });
    else this.setState({ post: { ...post, photo: null } });
  };

  handleChange = (event) => {
    const { post } = this.state;

    this.setState({
      post: { ...post, [event.target.name]: event.target.value },
    });
  };

  submitForm = (e) => {
    const { post } = this.state;
    const { updatePost } = this.props;
    e.preventDefault();

    let error = null;
    const emailPattern = new RegExp(
      "^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}"
    );

    if (post.title.length < 10) {
      alert("The title is too short");
      error = "text too short";
    } else if (post.text.length < 20) {
      alert("The content is too short");
      error = "text too short";
    } else if (!emailPattern.test(post.author)) {
      alert("Your email adress is not valid!");
      error = "wrong email";
    }
    if (!error) {
      post.updated = new Date().toISOString();

      updatePost(post);
      console.log(post);

      this.setState({
        post: {
          _id: "",
          author: "",
          created: "",
          updated: "",
          status: "",
          title: "",
          text: "",
          photo: "",
          price: "",
          phone: "",
          location: "",
        },
      });
      alert("Your changes have been saved!");
    } else {
      alert("Please correct errors before submitting changes!");
    }
  };
  render() {
    const { className, userStatus } = this.props;
    const { post } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        {userStatus === true ? (
          <Grid container align="center" justify="center">
            <Grid item align="center" xs={12} sm={9}>
              <Paper>
                <form onSubmit={this.submitForm}>
                  <Typography variant="h6">Edit your announcement</Typography>

                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="title"
                      label="Title"
                      variant="filled"
                      onChange={this.handleChange}
                      defaultValue={post.title}
                      helperText="min. 10 characters"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="text"
                      label="Give the full description!"
                      variant="filled"
                      onChange={this.handleChange}
                      defaultValue={post.text}
                      helperText="min. 20 characters"
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="author"
                      label="Your Email"
                      variant="filled"
                      onChange={this.handleChange}
                      defaultValue={post.author}
                      helperText="Put your valid email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="location"
                      label="Location"
                      variant="filled"
                      onChange={this.handleChange}
                      defaultValue={post.location}
                      helperText="Location"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="price"
                      label="Price"
                      variant="filled"
                      onChange={this.handleChange}
                      defaultValue={post.price}
                      helperText="Price in EUR"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <TextField
                      required
                      name="phone"
                      label="Phone number"
                      variant="filled"
                      onChange={this.handleChange}
                      defaultValue={post.phone}
                      helperText="Give you contact number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item align="center" xs={12} sm={9}>
                    <FormControl fullWidth>
                      <InputLabel id="status">Status of your add</InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        onChange={this.handleChange}
                        fullWidth
                        variant="filled"
                        name="status"
                        defaultValue={post.status}
                        value={post.status}
                      >
                        <MenuItem value="draft">draft</MenuItem>
                        <MenuItem value="published">published</MenuItem>
                        <MenuItem value="closed">closed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9} className={styles.paperCard__item}>
                    <Typography align="center">Add photo</Typography>
                    <ImageUploader
                      withIcon={true}
                      buttonText="Choose image"
                      imgExtension={[".jpg", ".gif", ".png", ".gif", ".jfif"]}
                      maxFileSize={5242880}
                      withPreview={true}
                      onChange={this.setPhoto}
                      singleImage={true}
                      className={styles.file}
                    />
                  </Grid>
                  <Grid item xs={12} sm={9} align="center">
                    <Button variant="contained" type="submit" color="secondary">
                      Submit
                    </Button>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <NotFound />
        )}
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.bool,
  updatePost: PropTypes.func,
  postToEdit: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  userStatus: getStatus(state),
  postToEdit: getOne(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  updatePost: (post) => dispatch(editPostRequest(post)),
  fetchPost: () => dispatch(fetchOnePostFromAPI(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
