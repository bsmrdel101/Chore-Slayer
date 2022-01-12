import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TaskIcon from '@mui/icons-material/Task';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const theme = useTheme();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

  function handleLeaveGame(page) {
    Swal.fire({
      title: 'Your game will not be saved if you leave!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'rgb(196, 82, 82)',
      confirmButtonColor: 'rgb(51 135 150)',
      confirmButtonText: 'Okay',
    }).then((result) => {
      if (result.isConfirmed) {
        history.push(`/${page}`);
        dispatch({
          type: 'RESET_GAME'
        });
      }
    })
  }

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} id="sidebar">
        <DrawerHeader>
          <IconButton onClick={open === true ? handleDrawerClose : handleDrawerOpen}>
            {open === false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {user.id &&
            <ListItem button onClick={() => (history.location.pathname === '/game' ?  handleLeaveGame('tasks') : history.push('/tasks'))}>
                <ListItemIcon>
                    <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks"/>
            </ListItem>
        }
        {user.id &&
            <ListItem button onClick={() => (history.push('/game'))}>
                <ListItemIcon>
                    <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Game"/>
            </ListItem>
        }
        {user.id &&
            <ListItem button onClick={() => (history.location.pathname === '/game' ?  handleLeaveGame('deck') : history.push('/deck'))}>
                <ListItemIcon>
                    <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Deck"/>
            </ListItem>
        }
        {user.id &&
            <ListItem button onClick={() => (history.location.pathname === '/game' ?  handleLeaveGame('stats') : history.push('/stats'))}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Game Stats"/>
            </ListItem>
        }
        </List>
        {user.id &&
            <Divider />
        }
        {!user.id &&
            <ListItem button onClick={() => history.push('/home')}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Game Stats"/>
            </ListItem>
        }
        <ListItem button onClick={() => (history.location.pathname === '/game' ?  handleLeaveGame('help') : history.push('/help'))}>
            <ListItemIcon>
                <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help"/>
        </ListItem>
        {user.id &&
            <ListItem button onClick={() => dispatch({ type: 'LOGOUT' })}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout"/>
            </ListItem>
        }
      </Drawer>
    </Box>
  );
}