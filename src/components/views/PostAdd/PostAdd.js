import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ImageUploader from "react-images-upload";

import { connect } from "react-redux";
import { getStatus } from "../../../redux/usersRedux.js";
import styles from "./PostAdd.module.scss";
import { NotFound } from "../NotFound/NotFound.js";

const Component = ({ className, children, userStatus }) => {
  return (
    <div className={clsx(className, styles.root)}>
      {userStatus === true ? (
        <Grid container align="center" justify="center">
          <Grid item align="center" xs={12} sm={9}>
            <Paper>
              <form>
                <Typography variant="h6">
                  Fill the fields to add an announcement
                </Typography>

                <Grid item align="center" xs={12} sm={9}>
                  <TextField
                    required
                    name="title"
                    label="Title"
                    variant="filled"
                    //onChange={this.handleChange}
                    helperText="min. 10 characters"
                    fullWidth
                  />
                </Grid>
                <Grid item align="center" xs={12} sm={9}>
                  <TextField
                    required
                    name="Description"
                    label="Give the full description!"
                    variant="filled"
                    //onChange={this.handleChange}
                    helperText="min. 20 characters"
                    fullWidth
                  />
                </Grid>
                <Grid item align="center" xs={12} sm={9}>
                  <TextField
                    required
                    name="Email"
                    label="Your Email"
                    variant="filled"
                    //onChange={this.handleChange}
                    helperText="Put your vaild email"
                    fullWidth
                  />
                </Grid>
                <Grid item align="center" xs={12} sm={9}>
                  <TextField
                    required
                    name="Location"
                    label="Location"
                    variant="filled"
                    //onChange={this.handleChange}
                    helperText="Location"
                    fullWidth
                  />
                </Grid>
                <Grid item align="center" xs={12} sm={9}>
                  <TextField
                    required
                    name="Price"
                    label="Price"
                    variant="filled"
                    //onChange={this.handleChange}
                    helperText="Price in EUR"
                    fullWidth
                  />
                </Grid>
                <Grid item align="center" xs={12} sm={9}>
                  <TextField
                    required
                    name="Phone"
                    label="Phone number"
                    variant="filled"
                    //onChange={this.handleChange}
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
                      //onChange={this.handleChange}
                      fullWidth
                      variant="filled"
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
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
                    //onChange={this.handleImage}
                    singleImage={true}
                    className={styles.file}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={9}
                  className={styles.paperCard__item}
                  align="center"
                >
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    className={styles.paperCard__btn}
                  >
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
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userStatus: getStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
