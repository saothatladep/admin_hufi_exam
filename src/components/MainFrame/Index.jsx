import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import { makeStyles } from '@material-ui/core/styles'


const MainFrame = () => {
    return (
        <div>
            <Navbar/>
            <Dashboard/>
        </div>
    )
}

export default MainFrame
