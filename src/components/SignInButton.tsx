"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

interface SignInButtonProps {
  redirectTo?: string
  className?: string
  installApp?: boolean
  children?: React.ReactNode
}

export default function SignInButton({ redirectTo = "/", className, installApp = false, children }: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSignIn = async () => {
    setIsLoading(true)
    
    try {
      const callbackUrl = `${window.location.origin}/auth/callback?next=${redirectTo}${installApp ? '&install_app=true' : ''}`
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: callbackUrl,
          scopes: "read:user user:email",
        },
      })

      if (error) {
        console.error("Error signing in:", error.message)
      }
    } catch (error) {
      console.error("Unexpected error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      onClick={handleSignIn}
      disabled={isLoading}
      className={className}
      variant="outline"
    >
      {children || (
        <>
          <Github className="w-4 h-4 mr-2" />
          {isLoading ? "Signing in..." : "Sign in with GitHub"}
        </>
      )}
    </Button>
  )
}