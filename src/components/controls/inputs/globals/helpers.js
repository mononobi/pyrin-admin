import { IconButton, InputAdornment} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';


export function getFKButton(info, openFKDialog) {
    const OpenDialogWrapper = () => {
        openFKDialog(info.fk_register_name, info.field);
    }

    if (info.is_fk) {
        return {
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={OpenDialogWrapper}>
                        <SearchOutlined fontSize='medium'/>
                    </IconButton>
                </InputAdornment>
            )};
    }
    return {};
}
