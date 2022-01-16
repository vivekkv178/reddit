import React from "react";
import Thread from "../UI/Thread.jsx";
import axios from "axios";
import * as constants from "../../constants";
import Snackbar from "@mui/material/Snackbar";

class ThreadDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    if (this.props.threadLink) this.callAPI();
  }

  callAPI = () => {
    this.setState({ loading: true });
    axios
      .get(`https://www.reddit.com/${this.props.threadLink}.json`)
      .then((res) => {
        this.setState({
          data: res.data[0].data.children[0].data,
          loading: false,
        });
      })
      .catch((e) => {
        this.setState({
          error: true,
          loading: false,
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.threadLink !== this.props.threadLink) this.callAPI();
  }

  closeSnackbar = () => {
    this.setState({
      error: false,
    });
  };

  render() {
    return (
      <>
        {!this.state.error && (
          <Thread
            thread={{ data: this.state.data }}
            showDescription={true}
            loading={this.state.loading}
          />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={this.state.error}
          onClose={this.closeSnackbar}
          message={constants.ERROR_MESSAGE}
        />
      </>
    );
  }
}

export default ThreadDetails;
