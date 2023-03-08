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
            const { data } = await axios.get('/routes/admin.json');
            const sidebarLinks = getSideBarLinks(data);
            const routes = getRoutesComponent(data);
            setRoutes(routes);
            setSidebarMenu(sidebarLinks);
        }
        fetchRoutesData()
    }, [])
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