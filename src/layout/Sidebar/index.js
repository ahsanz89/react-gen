import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
  <nav>
    <ul>
      <li>
        <NavLink to='/dashboard'>Dashboard</NavLink>
      </li>
      <li>
        <NavLink to='/users'>User</NavLink>
      </li>
    </ul>
  </nav>
  )
}
