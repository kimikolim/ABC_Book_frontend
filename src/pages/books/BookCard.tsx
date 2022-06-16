import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'

import { Role } from '../../models/Role'
import { isAuthorised } from '../../utils/accessToken'

interface Props {
	title: string
	description: string
	genre: string
	author: string
	yearPublished: number
	availability: boolean
  borrower?: string | null
}

const BookCard: React.FC<Props> = ({
  title,
  description,
  genre,
  author,
  yearPublished,
  availability,
  borrower,
}) => {

  /**
   * Checks the role of the current user
   * If is Admin or Editor, edit and delete buttons should show
   * Else, it should be
   */


  


  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {title}
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </CardContent>
          {isAuthorised([Role.ADMIN , Role.EDITOR]) && (<CardActions>
            <Button size="small">Edit</Button>
            <Button size="small" color="error">
              Delete
            </Button>
          </CardActions>)}
          <CardActions>
            <Typography sx={{flex: 1}}>Status: {availability ? "Available" : "Unavailable"}</Typography>
            <Button size="small" color={availability ? "success" : "error"} disabled={!availability}>
              Borrow
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default BookCard
