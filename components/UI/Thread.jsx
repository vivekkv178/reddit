import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import Container from "@mui/material/Container";
import CommentIcon from "@mui/icons-material/Comment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import * as constants from "../../constants.js";

/**
 * Below is the thread component that displays all the threads in a subreddit also the same component
 * is used to show the thread details along with the description by conditionally enabling descriptiuon only in 
 * thread detail view.
 * 
 * Each thread is linked to its thread detail page and when the user is in the thread detail page, since the user is 
 * already in that page, the link does not make any change when clicked so temporarily left it as is. 
 */

export default function Thread(props) {
  return (
    <Link
      href={`/${
        constants.THREAD_ROUTE_NAME
      }/${props.thread.data.permalink
        ?.split("/")
        .join(constants.DYNAMIC_ROUTE_CONCAT_VALUE)}`}
    >
      <Container maxWidth="sm">
        <Card sx={{ display: "flex", margin: "10px" }}>
          {props.loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {props.thread.data.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <AccountBoxIcon />
                  Posted by {props.thread.data.author}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <CalendarTodayIcon />
                  Created on{" "}
                  {new Date(
                    props.thread.data.created_utc * 1000
                  ).toDateString()}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <CommentIcon />
                  {props.thread.data.num_comments} Comments
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                <IconButton aria-label="previous">
                  <ArrowUpward />
                </IconButton>
                <IconButton aria-label="play/pause">
                  {/* <PlayArrowIcon sx={{ height: 38, width: 38 }} /> */}
                  {props.thread.data.score}
                </IconButton>
                <IconButton aria-label="next">
                  <ArrowDownward />
                </IconButton>
              </Box>
              {props.showDescription && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {props.thread.data.selftext
                    ? props.thread.data.selftext
                    : "No Description"}
                </Typography>
              )}
            </Box>
          )}
        </Card>
      </Container>
    </Link>
  );
}
