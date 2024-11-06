import Footer from '@/components/layout/Footer'
import TopBar from '@/components/layout/TopBar'
import React from 'react'

const ContactLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <TopBar />
            {children}
            <Footer />
        </div>
    )
}

export default ContactLayout