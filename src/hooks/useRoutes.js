import { useEffect, useState } from "react";
import axios from "axios"
import { routes as ROUTES } from '../data/constant';
import * as Component from '../pages';

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
        const GenaricComponent = Component[route.element]
        route.element = <GenaricComponent />;
        return route;
    })

    const getSideBarLinks = (routes) => routes.map(route => {
        return {
            label: route.label,
            path: route.path
        }
    })


    return returnedValue === ROUTES.GET_ROUTES ? routes : returnedValue === ROUTES.GET_SIDEBAR_MENU ? sidebarMenu : [routes, sidebarMenu];
};

export default useRoutes;