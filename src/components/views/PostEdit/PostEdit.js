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
import { getStatus } from "../../../redux/usersRedux.js";
import { editPost, getPostById } from "../../../redux/postsRedux.js";

import styles from "./PostEdit.module.scss";
import { NotFound } from "../NotFound/NotFound.js";

class Component extends React.Component {
  state = {
    post: {
      id: "",
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
    error: null,
  };

  componentWillMount() {
    const { postToEdit } = this.props;
    const { post } = this.state;
    this.setState({
      post: {
        ...post,
        id: postToEdit.id,
        author: postToEdit.author,
        created: postToEdit.created,
        updated: postToEdit.updated,
        status: postToEdit.status,
        title: postToEdit.title,
        text: postToEdit.text,
        photo: postToEdit.photo,
        price: postToEdit.price,
        phone: postToEdit.phone,
        location: postToEdit.location,
      },
    });
  }
  setPhoto = (files) => {
    const { post } = this.state;

    if (files) this.setState({ post: { ...post, photo: files[0] } });
    else this.setState({ post: { ...post, file: null } });
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
    const emailPattern = /\S+@\S+\.\S+/;

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
      post.created = new Date().toISOString();
      post.updated = post.created;
      post.id = Math.random().toString(36).substr(2, 5);

      updatePost(post);

      this.setState({
        post: {
          id: "",
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
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
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
  postToEdit: getPostById(state, props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (post) => dispatch(editPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
