"use server"

import { getAdminClient, createUserClient } from "@/utils/supabase/server"
import { getInstallationByUserId } from "./github"

export async function createOrganization(name: string, description: string) {
  try {
    const authSupabase = await createUserClient()
    const supabase = getAdminClient()
    
    // Get current user
    const { data: { user }, error: userError } = await authSupabase.auth.getUser()
    
    if (userError || !user) {
      console.error("Failed to get user:", userError)
      return {
        success: false,
        error: "User not authenticated",
      }
    }

    // Get user's installation
    const installationResult = await getInstallationByUserId()
    
    if (!installationResult.success || !installationResult.data) {
      console.error("No installation found for user:", user.id)
      return {
        success: false,
        error: "No GitHub installation found. Please install the GitHub App first.",
      }
    }

    console.log("💾 Creating organization:", name, "for user:", user.id)

    const { data, error } = await supabase
      .from("organization")
      .insert([
        {
          name: name,
          description: description,
          installation_id: installationResult.data.id,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to create organization. Please try again.",
      }
    }

    console.log("✅ Organization created successfully:", data)

    return {
      success: true,
      data: data[0],
      message: "Organization created successfully!",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getOrganizations() {
  try {
    const authSupabase = await createUserClient()
    const supabase = getAdminClient()
    
    // Get current user
    const { data: { user }, error: userError } = await authSupabase.auth.getUser()
    
    if (userError || !user) {
      console.error("Failed to get user:", userError)
      return {
        success: false,
        error: "User not authenticated",
      }
    }

    // Get user's installation
    const installationResult = await getInstallationByUserId()
    
    if (!installationResult.success || !installationResult.data) {
      console.error("No installation found for user:", user.id)
      return {
        success: false,
        error: "No GitHub installation found.",
      }
    }

    console.log("🔍 Getting organizations for installation:", installationResult.data.id)

    const { data, error } = await supabase
      .from("organization")
      .select("*")
      .eq("installation_id", installationResult.data.id)

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to get organizations",
      }
    }

    console.log("✅ Organizations found:", data)

    return {
      success: true,
      data: data,
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function getOrganizationById(organizationId: string) {
  try {
    const authSupabase = await createUserClient()
    const supabase = getAdminClient()
    
    // Get current user
    const { data: { user }, error: userError } = await authSupabase.auth.getUser()
    
    if (userError || !user) {
      console.error("Failed to get user:", userError)
      return {
        success: false,
        error: "User not authenticated",
      }
    }

    // Get user's installation first to ensure they have access
    const installationResult = await getInstallationByUserId()
    
    if (!installationResult.success || !installationResult.data) {
      console.error("No installation found for user:", user.id)
      return {
        success: false,
        error: "No GitHub installation found.",
      }
    }

    console.log("🔍 Getting organization:", organizationId, "for installation:", installationResult.data.id)

    const { data, error } = await supabase
      .from("organization")
      .select("*")
      .eq("id", organizationId)
      .eq("installation_id", installationResult.data.id)
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Organization not found or access denied",
      }
    }

    console.log("✅ Organization found:", data)

    return {
      success: true,
      data: data,
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}