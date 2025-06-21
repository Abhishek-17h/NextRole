import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedOut, UserButton, SignedIn, SignIn, useUser } from '@clerk/clerk-react'
import { BriefcaseBusinessIcon, Heart, PenBox } from 'lucide-react'

const Header = () => {
    const [showSignin, setshowSignin] = useState(false);
    const [search, setSearch] = useSearchParams();
    const {user}=useUser();

     useEffect(() => {
        if (search.get("sign-in")) {
            setshowSignin(true)
        }
    }, [search]);

    const handleOverLayClick = (e) => {
        if (e.target === e.currentTarget) {
            setshowSignin(false);
            setSearch({});
        }
    }

    return (
        <>
            <nav className='px-5 flex justify-between items-center'>
                <Link to="/"> 
                    <img src="/NextRole.jpg" className='h-30' />
                </Link>
                <div className='flex gap-4'>
                    <SignedOut>
                        <Button variant="outline" onClick={() => setshowSignin(true)}>Login</Button>
                    </SignedOut>
                    <SignedIn>
                        { user?.unsafeMetadata?.role==="recruiter" && (
                            <Link to="/post-jobs">
                            <Button variant="destructive" className="rounded-full text-center pb-2 cursor-pointer">
                                <PenBox size={20} />
                                Post a Job
                            </Button>
                        </Link>
                        )}
                        <UserButton
                        appearance={{
                            elements:{
                                avatarBox:"h-10 w-10",
                            },
                        }}
                        >
                            <UserButton.MenuItems>
                                <UserButton.Link
                                label='My Jobs'
                                href="/my-jobs"
                                labelIcon={<BriefcaseBusinessIcon size={15}/>}
                                />
                                <UserButton.Link
                                label='Saved Jobs'
                                href="/saved-jobs"
                                labelIcon={<Heart size={15}/>}
                                />
                            </UserButton.MenuItems>

                        </UserButton>
                    </SignedIn>
                </div>
            </nav>

            {
                showSignin && (
                    <div className='fixed inset-0 flex items-center justify-center bg-opacity-60'
                        onClick={handleOverLayClick}>
                        <SignIn
                            signUpForceRedirectUrl='/onboarding'
                            fallbackRedirectUrl='/onboarding'
                        />
                    </div>
                )
            }
        </>
    )
}

export default Header
