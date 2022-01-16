import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as commonActions from "../../store/actions/common";

/**
 * Declaring the options to be shown on the navbar.
 */
const routes = ["home"];
const sortTypes = ["hot", "new", "top"];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    /**
     * If user clicks on the home page then the user has to be redirected to the home page.
     * If the user chooses to change the sort type then redux state is updated to fetch the new data according to sort type
     */
    if (page === "home") router.push("/");
    else props.changeSort(page);
  };

  /**
   * Using the router to identify if the user is on home page or thread detail page.
   * If the user is on home page show the Sort options.
   * If the user is on thread page show the home option to go back.
   */
  const router = useRouter();
  let pages = router.asPath === "/" ? sortTypes : routes;

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Reddit/DotA2
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu("")}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Reddit/DotA2
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                variant={props.sort === page ? "contained" : ""}
                color={props.sort === page ? "secondary" : ""}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "white", display: "block", margin: "10px" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  sort: state.common.sort,
});

const mapDispatchToProps = (dispatch) => ({
  changeSort: (page) => dispatch(commonActions.changeSort(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveAppBar);
