import React from "react";
import Thread from "../UI/Thread.jsx";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { connect } from "react-redux";

class SubReddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      after: null,
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

    axios
      .get(
        `https://www.reddit.com/r/dota2/${this.props.sort}/.json?after=${this.state.after}&raw_json=1&limit=10`
      )
      .then((res) => {
        let newData = [...this.state.data];
        newData = newData.concat(res.data.data.children);
        this.setState({
          data: newData,
          after: `t3_${newData[newData.length - 1].data.id}`,
          loading: false,
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sort !== this.props.sort)
      this.setState({ data: [], after: null }, () => {
        this.callAPI();
      });
  }

  render() {
    return (
      <Container maxWidth="sm">
        <br />
        {this.state.data.map((thread,index) => (
          <Thread key={index} thread={thread} />
        ))}
        {this.state.loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
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
