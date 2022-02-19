import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import axios from "axios";
import Badge from "@mui/material/Badge";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";

import {
  Fab,
  Box,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  CssBaseline,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import "../Styles/miniDrawer.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "flex-end",
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [requestToApprove, setRequestToApprove] = React.useState(0);

  const isAdmin = React.useMemo(() => {
    return (
      localStorage.getItem("userType") == 0 &&
      "Bearer " + localStorage.getItem("token")
    );
  }, []);
  React.useEffect(() => {
    if (isAdmin) {
      axios
        .get(`http://localhost:3001/recipe/approval`, {
          headers: {
            "x-access-token": "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((recipes) => {
          setRequestToApprove((recipes.data || []).length);
        })
        .catch((err) => console.log(err));
    }
  }, [isAdmin]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function listOfIcons() {
    return [
      { url: "/RecipesList", label: "Home", icon: HomeIcon },
      { url: "/Weekly", label: "Weekly Schedule", icon: DateRangeIcon },
      { url: "/myRecipes", label: "My Recipes", icon: MenuBookIcon },
      { url: "/UsersRecipes", label: "Users", icon: AccountBoxIcon },
    ];
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar className="AppBarStyle" open={open}>
        <Toolbar>
          <IconButton
            className="iconStyle"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {localStorage.getItem("userId") == null ? null : (
            <Fab className="logOutbuttn" onClick={handleLogout}>
              Log out
            </Fab>
          )}
          <Typography
            className="recipmeLabel"
            variant="h6"
            noWrap
            component="div"
          >
            RecipMe
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listOfIcons().map((item, index) => {
            const { label, url, icon: Icon } = item;
            return (
              <NavLink
                className="drawerLabel"
                key={`${url}-${index}`}
                to={`${url}`}
              >
                <ListItem button key={label}>
                  <Icon className={"iconColor"}></Icon>
                  <ListItemText className="listLabel" primary={label} />
                </ListItem>
              </NavLink>
            );
          })}
        </List>
        <Divider />
        {localStorage.getItem("userType") == 0 ? (
          <>
            <List>
              {[
                {
                  url: "/AdminApproval",
                  label: "Approval requests",
                  icon: MoveToInboxIcon,
                },
                { url: "/AdminBlackList", label: "Delete requests" },
              ].map((item, index) => {
                const { label, url, icon } = item;
                const showBadge = isAdmin && icon === MoveToInboxIcon;
                console.log(requestToApprove);
                return (
                  <NavLink key={`${url}-${index}`} to={`${url}`}>
                    <ListItem button key={label}>
                      {!!showBadge ? (
                        <Badge
                          className="notificationsBubble"
                          badgeContent={requestToApprove}
                          color="error"
                        >
                          <ListItemIcon className="adminIcons">
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                        </Badge>
                      ) : (
                        <ListItemIcon className="adminIcons">
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                      )}

                      <ListItemText primary={label} />
                    </ListItem>
                  </NavLink>
                );
              })}
            </List>
          </>
        ) : null}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
