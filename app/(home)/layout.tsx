import Banner from '@/components/layout/Banner'
import Footer from '@/components/layout/Footer'
import HomeBottomSection from '@/components/layout/HomeBottomSection'
import TopBar from '@/components/layout/TopBar'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
            <Banner />
            {children}
            <HomeBottomSection />
            <Footer />
        </div>
    )
}

export default HomeLayout