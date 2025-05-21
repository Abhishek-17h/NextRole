import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedOut, SignInButton, UserButton,SignedIn } from '@clerk/clerk-react'

const Header = () => {
    return (
        <>
            <nav className='px-10 flex justify-between items-center'>
                <Link>
                    <img src="/NextRole.jpg" className='h-30' />
                </Link>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </nav>
        </>
    )
}

export default Header
