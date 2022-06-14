import * as React from "react"
import Button from "@mui/material/Button"
import { authActions } from "../../redux/actions/authActions"

const Login: React.FC = () => {
  const handleLogin = () => {
    //use redux actions to dispatch login
    authActions.login("kahoot@meme.com", "bcryptlater")
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </div>
  )
}

export default Login
