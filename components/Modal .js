import React from 'react'
import { HiOutlineX } from 'react-icons/hi'

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-lg z-10 animate-scaleIn">
                {/* Header */}
                <div className="flex justify-between items-center px-5 py-3 border-b">
                    <h3 className="font-semibold text-lg text-black">{title}</h3>
                    <button onClick={onClose} className='text-black'>
                        <HiOutlineX size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
