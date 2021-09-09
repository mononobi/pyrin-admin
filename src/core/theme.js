import { createTheme } from '@material-ui/core/styles';


export const THEME = createTheme({
    palette: {
        primary: {
            main: '#4182be'
        },
        secondary: {
            main: '#12558d'
        }
    },
    typography: {
        fontFamily: ['Roboto', '"Open Sans"', 'sans-serif'].join(',')
    }
})

THEME.props = {

    MuiMenuItem: {
        style: {fontSize: '13px', fontWeight: 'bold'}
    }
};
