import React from 'react'
import Header from '../../Components/Headers/Header'
import Dashboard from '../Dashboard/Dashboard'
import { Outlet } from 'react-router-dom'
import SubHeader from '../../Components/Headers/SubHeader'
import Footer from '../../Components/Footer/Footer'

export default function Layout() {
    return (
        <>
            <Header />
            <div className="content">
                <SubHeader />
                <div className="outlet-container"><Outlet /></div>
                <Footer />
            </div>
        </>
    )
}
