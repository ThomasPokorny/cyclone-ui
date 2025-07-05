"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface ConnectGitHubButtonProps {
  className?: string
}

export default function ConnectGitHubButton({ className }: ConnectGitHubButtonProps) {
  const handleInstallApp = () => {
    const installUrl = `https://github.com/apps/cycloneai/installations/new`
    window.location.href = installUrl
  }

  return (
    <Button 
      onClick={handleInstallApp}
      className={className}
      variant="outline"
    >
      <Github className="w-4 h-4 mr-2" />
      Install GitHub App
    </Button>
  )
}