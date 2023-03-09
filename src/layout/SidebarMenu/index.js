import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useRoutes } from '../../hooks';
import { routes as ROUTES } from "../../data/constant"
import { Link } from 'react-router-dom';
export default function SidebarMenu() {
  const sidebarMenu = useRoutes(ROUTES.GET_SIDEBAR_MENU)
  return (
    <Sidebar>
      <Menu>
        {sidebarMenu.map((menu, index) => menu.sub_menu.length > 0 ?
          <SubMenu label={menu.label} key={index}>
            {menu.sub_menu.map((sub_menu,sub_index) => {
             return <MenuItem component={<Link to={sub_menu.path} />} key={sub_index}> {sub_menu.label} </MenuItem>
            })}
          </SubMenu> :
          <MenuItem component={<Link to={menu.path} />} key={index}> {menu.label} </MenuItem>)}
      </Menu>
    </Sidebar>
  )
}
