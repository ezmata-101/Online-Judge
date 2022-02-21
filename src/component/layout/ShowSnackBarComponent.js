// import {Snackbar} from "@mui/material";
// import MuiAlert from '@mui/material/Alert';
// export function showSnackBar(message, duration = 2000, severity='info'){
//     const Alert = React.forwardRef(function Alert(props, ref) {
//         return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//     });
//     const [open, setOpen] = useState()
//     const handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//
//         setOpen(false);
//     };
//     return(
//         <Snackbar
//             open={true}
//             autoHideDuration={duration}
//             onClose={handleClose}
//             severity={severity}
//         >
//             <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
//                 {message}
//             </Alert>
//         </Snackbar>
//     )
// }