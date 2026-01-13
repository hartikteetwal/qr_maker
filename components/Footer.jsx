import React from 'react'

const Footer = () => {
    return (
        <footer className="text-center py-6 text-gray-600 border-t mt-16">
            © {new Date().getFullYear()} QR Maker. All rights reserved.
        </footer>
    );
}

export default Footer
