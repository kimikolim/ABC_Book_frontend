// import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import { useAppSelector } from '../../redux/hooks'

interface Props {
  total: number
  availableBooks: number
  borrowedBooks: number
}

const BooksCounter: React.FC<Props> = ({total, availableBooks, borrowedBooks}) => {
  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'whitesmoke',
    height: '300px',
    borderRadius: '20px'
  }))

  return (
    <>
    <Box sx={{ flexGrow: 1, mt: '5rem' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Item>
                <Typography variant="h3" mt={"1rem"}>Total Books</Typography>
                <Typography variant="h2" mt={"5rem"}>{total}</Typography>
              </Item>
            </Grid>
            <Grid item xs={12} md={4}>
            <Item>
                <Typography variant="h3" mt={"1rem"}>Books Available</Typography>
                <Typography variant="h2" mt={"5rem"}>{availableBooks}</Typography>
              </Item>            </Grid>
            <Grid item xs={12} md={4}>
            <Item>
                <Typography variant="h3" mt={"1rem"}>My Borrowed</Typography>
                <Typography variant="h2" mt={"5rem"}>{borrowedBooks}</Typography>
              </Item>            </Grid>
          </Grid>
        </Box>
    </>
  )
}

export default BooksCounter
