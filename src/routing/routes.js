import { CONFIGS } from '../core/configs';
import { HomeComponent } from '../components/home/home';
import { ListComponent } from '../components/list/list';
import { AddComponent } from '../components/add/add';
import { EditComponent } from '../components/edit/edit';
import { LoginComponent } from '../components/login/login';
import { NotFoundComponent } from '../components/not_found/not_found';


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
