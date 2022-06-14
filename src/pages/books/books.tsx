import React from 'react'
import { usePermissions } from '../../hooks/authHooks'
import { Role } from '../../models/Role'
import { bookActions } from '../../redux/actions/bookActions'

/**
 * Books page
 * List all Books
 * Valid logged in user can borrow/return books
 * Admin/Editor can add/remove/update book details
 * Features: sorting, pagination, filtering
 */

const Books = () => {
    usePermissions([Role.ADMIN, Role.EDITOR, Role.MEMBER])
  return (
    <div>Books Page</div>
  )
}

export default Books
