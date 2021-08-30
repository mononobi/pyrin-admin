import { CONFIGS } from '../core/configs';
import { HomeComponent } from '../components/pages/home/home';
import { ListComponent } from '../components/pages/list/list';
import { AddComponent } from '../components/pages/add/add';
import { EditComponent } from '../components/pages/edit/edit';
import { LoginComponent } from '../components/pages/login/login';
import { NotFoundComponent } from '../components/pages/not_found/not_found';


export const ROUTES = [
    {
        path: CONFIGS.panel_home_path,
        component: HomeComponent,
        exact: true
    },
    {
        path: `${CONFIGS.panel_home_path}/login`,
        component: LoginComponent,
        exact: true
    },
    {
        path: `${CONFIGS.panel_home_path}/:register_name`,
        component: ListComponent,
        exact: true
    },
    {
        path: `${CONFIGS.panel_home_path}/:register_name/add`,
        component: AddComponent,
        exact: true
    },
    {
        path: `${CONFIGS.panel_home_path}/:register_name/:pk`,
        component: EditComponent,
        exact: true
    },
    {
        path: '*',
        component: NotFoundComponent,
        exact: false
    }
];

Object.freeze(ROUTES);
