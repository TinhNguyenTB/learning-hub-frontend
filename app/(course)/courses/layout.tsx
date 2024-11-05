import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import React from 'react'

const CoursesLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
            {children}
            <Footer />
        </div>
    )
}

export default CoursesLayout