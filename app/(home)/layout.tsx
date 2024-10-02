import TopBar from '@/components/layout/TopBar'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
            {children}
        </div>
    )
}

export default HomeLayout