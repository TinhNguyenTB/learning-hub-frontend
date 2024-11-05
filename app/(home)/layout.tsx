import Banner from '@/components/layout/Banner'
import TopBar from '@/components/layout/TopBar'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
            <Banner />
            {children}
        </div>
    )
}

export default HomeLayout