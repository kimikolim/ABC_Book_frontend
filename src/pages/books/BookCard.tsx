import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'

const BookCard = () => {
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345, display: 'flex' }}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              The art of thinking clearly
            </Typography>
            <Typography variant="body1">
              Book description goes here Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Mollitia, esse! Vel nihil, quia quo aspernatur
              porro ea. Laborum suscipit iure adipisci. Omnis voluptate cum
              corrupti eveniet aliquam, facere deserunt illo?
            </Typography>
          </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small" color="error">
                Delete
              </Button>
            </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default BookCard
