'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { validateAndClaimInvitation } from '../actions/invitation'
import Navigation from "@/components/Navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "react-day-picker";
import SignInButton from "@/components/SignInButton";
import Link from "next/link";
import {ArrowRight, Github} from "lucide-react";

export default function InvitePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isValidating, setIsValidating] = useState(true)
  const [isValidInvite, setIsValidInvite] = useState(false)
  
  useEffect(() => {
    const inviteKey = searchParams.get('inviteKey')
    
    const validateInvite = async () => {
      if (!inviteKey) {
        console.log('❌ No invite key provided')
        router.push('/')
        return
      }

      console.log('🔍 Validating invite key:', inviteKey)
      
      try {
        const result = await validateAndClaimInvitation(inviteKey)
        
        if (result.success) {
          console.log('✅ Invite key is valid and claimed')
          setIsValidInvite(true)
        } else {
          console.log('❌ Invalid invite key, redirecting...')
          router.push('/')
        }
      } catch (error) {
        console.error('Error validating invite:', error)
        router.push('/')
      } finally {
        setIsValidating(false)
      }
    }

    validateInvite()
  }, [searchParams, router])

  if (isValidating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Validating your invitation...</p>
        </div>
      </div>
    )
  }

  if (!isValidInvite) {
    return null // This should not render as router.push('/') should redirect
  }

  return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="flex items-center space-x-2">
                  <div
                      className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-background font-bold text-lg">🌪️</span>
                  </div>
                  <span className="font-bold text-xl text-gradient">Cyclone AI</span>
                </div>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <a href="#features"
                   className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <a href="https://github.com/ThomasPokorny/cyclone-ai" target="_blank" rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                  <Github className="w-4 h-4"/>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </nav>


        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-2xl">🌪️</span>
                </div>
                <span className="font-bold text-2xl text-gradient">Cyclone AI</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome to Cyclone AI!</h1>
              <p className="text-muted-foreground">
                You've been selected from our waitlist to join the future of AI-powered code reviews.
              </p>
            </div>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Sign in with GitHub to activate your early access account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex w-full">
                  <div className="mx-auto">
                    <SignInButton redirectTo="/dashboard" className="size-sm"/>
                  </div>
                </div>


                <div className="text-center text-sm text-muted-foreground">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">🎉 You're in early access!</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Connect your GitHub repositories</li>
                  <li>✓ Experience cutting-edge AI code reviews</li>
                  <li>✓ Help shape the future of Cyclone AI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}