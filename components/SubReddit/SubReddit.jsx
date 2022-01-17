import React from "react";
import Thread from "../UI/Thread.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { connect } from "react-redux";
import { getSubRedditData } from "./sideEffects";
import Snackbar from "@mui/material/Snackbar";
import * as constants from "../../constants";

class SubReddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      after: null,
      error: false,
    };
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    } else {
      this.callAPI();
    }
  };

  componentDidMount() {
    this.callAPI();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  callAPI = () => {
    this.setState({ loading: true });

    getSubRedditData(this.props, this.state)
      .then((successState) => {
        this.setState(successState);
      })
      .catch((errorState) => {
        this.setState(errorState);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sort !== this.props.sort)
      this.setState({ data: [], after: null }, () => {
        this.callAPI();
      });
  }

  closeSnackbar = () => {
    this.setState({
      error: false,
    });
  };

  render() {
    return (
      <Container maxWidth="sm">
        {this.state.data.map((thread, index) => (
          <Thread key={index} thread={thread} />
        ))}
        {this.state.loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
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
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  sort: state.common.sort,
});

const mapDispatchToProps = (dispatch) => ({
  changeSort: (page) => dispatch(commonActions.changeSort(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubReddit);
