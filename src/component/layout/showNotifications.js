import * as React from 'react';
import SnackBar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

export function showNotification(message, severity){
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    return(
        <SnackBar
            open={true}
        >
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </SnackBar>
    )
}