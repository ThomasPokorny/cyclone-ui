import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import * as console from "node:console";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"
  const installApp = searchParams.get("install_app") === "true"


  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // If user should install the GitHub app after auth
      if (installApp) {
        const githubAppName = process.env.GITHUB_APP_NAME
        //const installUrl = `https://github.com/apps/${githubAppName}/installations/new`
        const installUrl = `https://github.com/apps/cycloneai/installations/new`

        console.log("=== GitHub App Installation Debug ===")
        console.log("App Name:", githubAppName)
        console.log("Install URL:", installUrl)
        console.log("Redirecting to GitHub App installation...")
        
        return NextResponse.redirect(installUrl)
      }

      const forwardedHost = request.headers.get("x-forwarded-host")
      const isLocalEnv = process.env.NODE_ENV === "development"
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}