import { Button } from '@/components/ui/button';
import { SignInButton, UserButton } from '@/node_modules/@clerk/nextjs';
import Link from '@/node_modules/next/link';
import { currentUser } from '@clerk/nextjs'
import React from 'react'

async function LandingPageNavbar() {
    const user = await currentUser();
    console.log(user)
    return (
        <nav className="flex w-screen items-center justify-between p-6 ">
          <div>
            <Link
              className="text-2xl font-bold text-purple-500 no-underline"
              href="/"
            >
              LeadConvert
            </Link>
          </div>
          <div className="text-purple-500 font-semibold text-lg">
            {user ? (
              <div className="flex flex-row gap-x-4 items-center">
                <Link href="/lead-magnets">
                  <Button variant="outline">Open App</Button>
                </Link>
                <UserButton />
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        </nav>
      );
}

export default LandingPageNavbar