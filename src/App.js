import React, {useState} from 'react'
import Header from "./component/layout/Header";
import MyRouters from './component/layout/MyRouters'
function App() {
    return (
        <div className="App">
            <Header/>
            <MyRouters/>
        </div>
    );
}

export default App;