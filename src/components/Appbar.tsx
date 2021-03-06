import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { useNavigate } from 'react-router-dom'
import { isAuthorised } from '../utils/accessToken'
import { Role } from '../models/Role'
import { useCookies } from 'react-cookie'
import { useAppDispatch } from '../redux/hooks'
import { logoutAccount } from '../redux/auth/authSlice'


const ResponsiveAppBar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [cookie, setCookie, removeCookie] = useCookies(['accessToken']);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleLogout = () => {
    removeCookie('accessToken')
    dispatch(logoutAccount())
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/login"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            ABC Fanclub
          </Typography>

          {/**
           * Navbar options in md
           */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={()=>{navigate('/books')}}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Books
            </Button>
            {isAuthorised([Role.ADMIN, Role.EDITOR]) && (<Button
              onClick={()=>{navigate('/users')}}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Users
            </Button>)}
            <Button
              onClick={handleLogout}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Logout
            </Button>
          </Box>
          {/**
           * Responsive menu Burger at screen size xs
           */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             
                <MenuItem onClick={()=>{
                  navigate('/books')
                  }}>
                  <Typography textAlign="center">Books</Typography>
                </MenuItem>
                <MenuItem onClick={()=>{navigate('/users')}}>
                  <Typography textAlign="center">Users</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
          {/**
           * Responsive icon when screen is xs
           */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ABC Fanclub
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
