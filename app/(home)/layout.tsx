import Banner from '@/components/layout/Banner'
import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
            <Banner />
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout