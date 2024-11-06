import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import React from 'react'

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
            {children}
            <Footer />
        </div>
    )
}

export default AboutLayout