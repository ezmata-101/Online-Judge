import React, {useState} from 'react'
import Header from "./component/layout/Header";
import MyRouters from './component/layout/MyRouters';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
    const themeOptions = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#3d3f4a',
            },
            secondary: {
                main: '#f50057',
            },
        },
    });
    return (
        <ThemeProvider theme={themeOptions}>
            <div className="App">
                <Header/>
                <MyRouters/>
            </div>
        </ThemeProvider>
    );
}

export default App;