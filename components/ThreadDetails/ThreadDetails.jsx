import React from "react";
import Thread from "../UI/Thread.jsx";
import * as constants from "../../constants";
import Snackbar from "@mui/material/Snackbar";
import { getThreadData } from "./sideEffects";

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

    getThreadData(this.props, this.state)
      .then((successState) => {
        this.setState(successState);
      })
      .catch((errorState) => {
        this.setState(errorState);
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
        {this.state.error && (
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={this.state.error}
            onClose={this.closeSnackbar}
            message={constants.ERROR_MESSAGE}
          />
        )}
      </>
    );
  }
}

export default ThreadDetails;
