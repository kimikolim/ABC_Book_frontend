import React, { useEffect } from 'react'
import { IconButton } from '@mui/material'
import { Role } from '../../models/Role'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getAllUsers } from '../../redux/users/usersSlice'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataGrid,
  GridActionsCellItem,
  GridColumnVisibilityModel,
  GridRowParams,
} from '@mui/x-data-grid'
import { isAuthorised } from '../../utils/accessToken'


const UsersTable = () => {
  const dispatch = useAppDispatch()

  const users: any = useAppSelector((state) => state.users)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])


  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<EditIcon />} onClick={()=>{console.log(params.row.id)}} label="Edit" color='primary' />,
        <GridActionsCellItem icon={<DeleteIcon />} onClick={()=>{}} label="Delete" color='error' />,
      ]
    }
  ]

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
      actions: isAuthorised([Role.ADMIN]),
    })

  const data = {
    columns: columns,
    rows: users.allUsers,
  }

  return (
    <>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          {...data}
          loading={users.isLoading}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
        />
      </div>
    </>
  )
}

export default UsersTable
