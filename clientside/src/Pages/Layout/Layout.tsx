import React, { useEffect, useState } from 'react'
import Header from '../../Components/Headers/Header'
import Dashboard from '../Dashboard/Dashboard'
import { Outlet, useLocation } from 'react-router-dom'
import SubHeader from '../../Components/Headers/SubHeader'
import Footer from '../../Components/Footer/Footer'

export default function Layout() {
    const location = useLocation();
    return (
        <>
             <Header />
            <div className="content">
                {location.pathname !== '/chat' && <SubHeader />}
                <div className={location.pathname !== '/chat' ? "outlet-container" : ''}><Outlet /></div>
                <Footer />
            </div>
        </>
    )
}
