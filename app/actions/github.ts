"use server"

import { getAdminClient, createUserClient } from "@/utils/supabase/server"

export async function saveInstallation(installationId: string) {
  try {
    const authSupabase = await createUserClient()
    const supabase =  getAdminClient()
    
    // Get current user
    const { data: { user }, error: userError } = await authSupabase.auth.getUser()
    
    if (userError || !user) {
      console.error("Failed to get user:", userError)
      return {
        success: false,
        error: "User not authenticated",
      }
    }

    console.log("💾 Saving installation ID:", installationId, "for user:", user.id)

    const { data, error } = await supabase
      .from("installation")
      .insert([
        {
          installation_id: installationId,
          user_id: user.id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to save installation. Please try again.",
      }
    }

    console.log("✅ Installation saved successfully:", data)

    return {
      success: true,
      message: "Installation saved successfully!",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}