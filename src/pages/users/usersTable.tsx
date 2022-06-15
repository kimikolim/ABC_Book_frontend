import React from 'react'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import { Role } from '../../models/Role'

//Hardcoded data
interface Column {
  id: 'name' | 'email' | 'role' 
  label: string
  minWidth?: number
  align?: 'right'
//   edit: () => {}
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'role',
    label: 'Role',
    minWidth: 170,
    align: 'right',
  },
//   {}
]

//Hardcoded data
interface Data {
  id: string
  name: string
  email: string
  role: Role
}

const rows: Data[] = [
  {
    id: '62a6da98448bd41f44e2ab96',
    name: 'Mike Oxlong',
    email: 'troll@lol.com',
    role: Role.MEMBER,
  },
  {
    id: '62a6dac0448bd41f44e2ab99',
    name: 'Ben Dover',
    email: 'kahoot@meme.com',
    role: Role.EDITOR,
  },
  {
    id: '62a6dafa448bd41f44e2ab9c',
    name: 'Justin Case',
    email: 'super@careful.com',
    role: Role.ADMIN,
  },
]
const UsersTable = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            {/* <Button>Edit</Button>
                            <Button>Delete</Button> */}
                            </TableCell>

                          </>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  )
}

export default UsersTable
