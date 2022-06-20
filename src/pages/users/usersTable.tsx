import React, { useEffect } from 'react'
import { Role } from '../../models/Role'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getAllUsers,
  getUserById,
  removeUser,
} from '../../redux/users/usersSlice'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumnVisibilityModel,
  GridRowParams,
} from '@mui/x-data-grid'
import { isAuthorised } from '../../utils/accessToken'
import { setEditUserMode } from '../../redux/users/userEditSlice'
import { useNavigate } from 'react-router-dom'

const UsersTable = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const users: any = useAppSelector((state) => state.users)
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const handleEditUser = async (id: string) => {
    dispatch(setEditUserMode())
    await dispatch(getUserById(id))
    navigate(`/user/${id}`)
  }

  const handleDeleteUser = async (id: string) => {
    await dispatch(removeUser(id))
  }

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => {
            handleEditUser(params.row.id)
          }}
          label="Edit"
          color="primary"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => {
            handleDeleteUser(params.row.id)
          }}
          label="Delete"
          color="error"
        />,
      ],
    },
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
