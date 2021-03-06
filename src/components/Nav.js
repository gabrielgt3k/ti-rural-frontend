import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Toolbar,
  AppBar,
  Drawer,
  CssBaseline,
  Divider,
  IconButton,
  Typography,
  Collapse,
  Menu,
  MenuItem,
} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import PeopleIcon from '@material-ui/icons/People';
import DevicesIcon from '@material-ui/icons/Devices';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signOut } from '../store/modules/auth/actions';
import { store } from '../store';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.primary.mainGradient,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#093028',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Nav({ children }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openLinhas, setOpenLinhas] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const dispatch = useDispatch();
  const { profile } = store.getState();
  console.log(profile);

  const handleListLinhas = () => {
    setOpenLinhas(!openLinhas);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function handleLodout() {
    dispatch(signOut());
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLodout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={handleDrawerClose}
            component={Link}
            to="/home"
          >
            <ListItemIcon>
              <HomeIcon style={{ color: '#fafafa' }} />
            </ListItemIcon>
            <ListItemText style={{ color: '#fafafa' }} primary="Home" />
          </ListItem>
          <ListItem button onClick={handleListLinhas}>
            <ListItemIcon>
              <PhoneIcon style={{ color: '#fafafa' }} />
            </ListItemIcon>
            <ListItemText style={{ color: '#fafafa' }} primary="Linhas" />
            {openLinhas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openLinhas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                style={{ color: '#fafafa' }}
                button
                onClick={handleDrawerClose}
                className={classes.nested}
                component={Link}
                to="/linhas-oi"
              >
                <ListItemIcon>
                  <PhoneIcon style={{ color: '#fafafa' }} />
                </ListItemIcon>
                <ListItemText
                  style={{ color: '#fafafa' }}
                  primary="Linhas Oi"
                />
              </ListItem>
              <ListItem
                button
                style={{ color: '#fafafa' }}
                onClick={handleDrawerClose}
                className={classes.nested}
                component={Link}
                to="/linhas-vivo"
              >
                <ListItemIcon>
                  <PhoneIcon style={{ color: '#fafafa' }} />
                </ListItemIcon>
                <ListItemText primary="Linhas Vivo" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <DevicesIcon style={{ color: '#fafafa' }} />
            </ListItemIcon>
            <ListItemText style={{ color: '#fafafa' }} primary="Equipamentos" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon style={{ color: '#fafafa' }} />
            </ListItemIcon>
            <ListItemText style={{ color: '#fafafa' }} primary="Usuários" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon style={{ color: '#fafafa' }} />
            </ListItemIcon>
            <ListItemText
              style={{ color: '#fafafa' }}
              primary="Contas a pagar"
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};
