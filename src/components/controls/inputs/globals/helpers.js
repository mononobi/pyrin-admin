import { IconButton, InputAdornment} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';


export function getFKButton(info, openFKDialog, disabled) {
    const OpenDialogWrapper = () => {
        openFKDialog(info.fk_register_name, info.field, info.fk_name);
    }

    if (info.is_fk) {
        return {
            endAdornment: (
                <InputAdornment position='end'>
                    <IconButton onClick={OpenDialogWrapper} disabled={disabled}>
                        <SearchOutlined fontSize='medium'/>
                    </IconButton>
                </InputAdornment>
            )};
    }
    return {};
}
