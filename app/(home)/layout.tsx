import TopBar from '@/components/TopBar'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
        </div>
    )
}

export default HomeLayout