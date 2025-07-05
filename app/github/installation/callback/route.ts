import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const installationId = searchParams.get("installation_id")
  const setupAction = searchParams.get("setup_action")
  
  console.log("=== GitHub App Installation Callback ===")
  console.log("Installation ID:", installationId)
  console.log("Setup Action:", setupAction)
  console.log("All params:", Object.fromEntries(searchParams.entries()))
  
  if (installationId && setupAction === "install") {
    console.log("✅ GitHub App successfully installed!")
    console.log("Installation ID to store:", installationId)
    
    // TODO: Store installation ID in database associated with user
    // const supabase = await createClient()
    // Store installationId with current user
    
    // Redirect to dashboard or success page
    return NextResponse.redirect(`${origin}/dashboard?installation_success=true`)
  }
  
  if (setupAction === "update") {
    console.log("🔄 GitHub App installation updated")
    return NextResponse.redirect(`${origin}/dashboard?installation_updated=true`)
  }
  
  console.log("❌ Installation failed or cancelled")
  return NextResponse.redirect(`${origin}/dashboard?installation_error=true`)
}