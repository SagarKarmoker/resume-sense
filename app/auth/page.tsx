import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'

export default function Auth() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
                    <p className="text-gray-600">Sign in to your account or create a new one</p>
                </div>
                
                <SignedOut>
                    <div className="space-y-4">
                        <SignInButton>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 hover:cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-4 rounded-lg border-2 border-blue-600 transition duration-200 ease-in-out transform hover:scale-105 hover:cursor-pointer">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>
                
                <SignedIn>
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">You are signed in!</p>
                        <div className="flex justify-center">
                            <UserButton />
                            <Link 
                                href="/dashboard" 
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 ease-in-out ml-4"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </SignedIn>
            </div>
        </div>
    )
}
