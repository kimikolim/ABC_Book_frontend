import * as React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Role } from '../../models/Role'
import { isAuthorised } from '../../utils/accessToken'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://www.instagram.com/mavericksconsulting/"
      >
        Mavericks Consulting Pte Ltd
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false)
  /**
   * Login email and password focus
   */
  const [emailInput, setEmailInput] = React.useState<string>('')
  const [passwordInput, setPasswordInput] = React.useState<string>('')
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value)
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value)
  }

  const handleSignUp = () => {
    // Sign up logic here
  }

  React.useEffect(() => {
    if (isAuthorised([Role.ADMIN, Role.EDITOR, Role.MEMBER])) {
      navigate('/home')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  /**
   * If login fails redirects to login page
   * If login successful redirects to dashboard
   */
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //use redux actions to dispatch login
    try {
      await dispatch(userLogin({ email: emailInput, password: passwordInput }))
    } catch (error) {
      // toast.error("Login Failed. Please Try Again.")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?books)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={isSignUp ? handleSignUp : handleLogin}
              sx={{ mt: 1 }}
            >
              {isSignUp && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Name"
                  type="text"
                  id="name"
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />

              {isSignUp && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color={isSignUp ? 'secondary' : 'primary'}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    type="button"
                    style={{ cursor: 'pointer' }}
                    variant="body2"
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                    }}
                  >
                    {isSignUp
                      ? 'Already have an account? Log in'
                      : "Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
