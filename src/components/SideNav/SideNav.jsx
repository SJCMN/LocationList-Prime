import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconHome from '../IconHome/IconHome'
import './SideNav.css';

import { useSelector, useDispatch } from 'react-redux';



const drawerWidth = 120;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function SideNav() {

    const currentIndex = useSelector(store => store.index.currentIndex)
    const dispatch = useDispatch();
    const mode = useSelector(store => store.mode);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar 
            position="fixed" open={open}
            id="appBar"
            >
                <Toolbar sx={{ display: 'flex', p:1.4}}>
                    
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 20, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <Typography 
                        variant="h5" 
                        fontWeight="800"
                        noWrap 
                        component="div"  
                        
                        sx={{  ...(open &&  {ml:10})}}
                        >
                            LocationList
                        </Typography>
                        <Typography 
                        variant="h7" 
                        fontWeight="500"
                        noWrap 
                        component="div"  
                        fontStyle="italic"
                        sx={{  ...(open &&  {ml:10})}}
                        >
                            {mode}
                        </Typography>

                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                    <List>

                        {['HOME', 'SHOP', 'LIST'].map(text => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {
                                    text === 'HOME' ? <Link to="/home"><IconHome /></Link> : 
                                    text === 'SHOP' ? <Link to={`/lists/${currentIndex}`}><ShoppingCartOutlinedIcon 
                                    onClick={() =>  (dispatch({ type: "TOGGLE_SHOP_MODE", payload: {mode:'SHOP', currentIndex:currentIndex} }))}/>
                                    </Link> :
                                    text === 'LIST' ? <Link to="/lists"><AssignmentOutlinedIcon 
                                    onClick={() =>  (dispatch({ type: "TOGGLE_LIST_MODE", payload: 'LIST' }))}/>
                                    </Link> : ''
                                    }
                                </ListItemIcon>
                            </ListItem>
                        ))}
                        
                    </List>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />

            </Main>
        </Box>
    );
}

export default SideNav;

