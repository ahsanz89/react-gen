import { useEffect, useState } from "react";
import axios from "axios"
import { routes as ROUTES } from '../data/constant';
import * as Component from '../pages';
import * as Layout from "../layout"

const useRoutes = (returnedValue = "") => {
    const [routes, setRoutes] = useState([]);
    const [sidebarMenu, setSidebarMenu] = useState([]);


    useEffect(() => {
        async function fetchRoutesData() {
            const { data } = await axios.get('/routes/user.json'); 
            const sidebarLinks = getSideBarLinks(data[0].children || []);
            let routes = [];
            data.map(route=>{
                routes.push(route)
                routes = [...routes,...getChild(route.children || [])].flat()
                return routes
            }) 
            routes = getRoutesComponent(routes);
            console.log(routes)
            setRoutes(routes);
            setSidebarMenu(sidebarLinks);
        }
        fetchRoutesData()
    }, [])
 
    function getChild(routes){ 
        return routes.map(route => {
            if(route.children && route.children.length>0){
                return route.children
            }
            return route
        })
    }

    const getRoutesComponent = (routes) => routes.map(route => { 
        // layout and pages creation
        const GenaricComponent = route.element === ROUTES.DEFAULT_LAYOUT_COMPONENT ? Layout[route.element] : Component[route.element]
        route.element = <GenaricComponent />; 
        // set error component
        const ErrorComponent = Component[route.errorElement] || Component[ROUTES.DEFAULT_ERROR_COMPONENT];
        route.errorElement = <ErrorComponent />
        return route;
    })

    const getSideBarLinks = (routes) => routes.map(route => {
        return {
            label: route.label,
            path: route.path,
            sub_menu: route.children || []
        }
    })


    return returnedValue === ROUTES.GET_ROUTES ? routes : returnedValue === ROUTES.GET_SIDEBAR_MENU ? sidebarMenu : [routes, sidebarMenu];
};

export default useRoutes;