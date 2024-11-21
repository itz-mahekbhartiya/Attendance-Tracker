import React from 'react'
import { Link } from 'react-router-dom'
import gmailLogo from '../assets/gmail.png'
import facebookLogo from '../assets/facebook.png'
import twitterLogo from '../assets/twitter.png'
import instagramLogo from '../assets/instagram.png'

export default function Footer() {
    return (
        <div className='w-[100vw] h-[20vh] bg-red-600 flex flex-col gap-4 justify-center items-center'>
            <div className='flex gap-3'>
                <Link to="https://gmail.com" target="_blank" rel="noopener noreferrer">
                    <img src={gmailLogo} alt="gmail logo" className='w-8 bg-white rounded-xl p-1' />
                </Link>
                <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebookLogo} alt="facebook logo" className='w-8 bg-white rounded-xl p-1' />
                </Link>
                <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={twitterLogo} alt="twitter logo" className='w-8 bg-white rounded-xl p-1' />
                </Link>
                <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagramLogo} alt="twitter logo" className='w-8 bg-white rounded-xl p-1' />
                </Link>
            </div>
            <p className="text-center text-white font-medium">&copy; 2024 Serviphi Pvt. Ltd. All rights reservered.</p>

        </div>
    )
}
