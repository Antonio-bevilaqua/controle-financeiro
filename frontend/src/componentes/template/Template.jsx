import React from 'react'
import Navbar from '../navigation/Navbar/Navbar'

const Template = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="mt-16">
                {children}
            </main>
        </>
    )
}

export default Template