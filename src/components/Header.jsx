import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from '../context/AuthContext';
import RedditIcon from '@mui/icons-material/Reddit';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Menu from '@mui/material/Menu';
import { Auth } from 'aws-amplify';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';

export default function Header() {
  const router = useRouter();
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const signUserOut = async () => {
    await Auth.signOut();
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }} >
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <RedditIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Reddit Clone
          </Typography>
          {user ? (
            <div>
              <Tooltip title='Create Post'>
                              <IconButton onClick={() => router.push('/create') } aria-label='create' color='inherit'>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Account'>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  color='inherit'
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id='menu-appbar'
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
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => signUserOut()}>Sign Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button variant='outlined' onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant='contained'
                color='primary'
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
