"use server"

import { getAdminClient, createUserClient } from "@/utils/supabase/server"
import { getOrganizations } from "./organization"

export async function getRepositoriesByOrganizationId(organizationId: string) {
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

    // First, verify the user has access to this organization
    console.log("🔐 Checking user access to organization:", organizationId)
    
    const organizationsResult = await getOrganizations()
    
    if (!organizationsResult.success || !organizationsResult.data) {
      console.error("No organizations found for user:", user.id)
      return {
        success: false,
        error: "No organizations found or access denied",
      }
    }

    // Check if the organization ID is in the user's list of organizations
    const hasAccess = organizationsResult.data.some((org: any) => org.id === Number.parseInt(organizationId))
    
    if (!hasAccess) {
      console.error("User does not have access to organization:", organizationId)
      return {
        success: false,
        error: "Access denied to this organization",
      }
    }

    console.log("✅ User has access to organization, fetching repositories")

    // Now fetch repositories for this organization
    const { data, error } = await supabase
      .from("repository")
      .select("id, name, custom_prompt")
      .eq("organization_id", organizationId)

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to fetch repositories",
      }
    }

    console.log("✅ Repositories found:", data?.length || 0)

    return {
      success: true,
      data: data || [],
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function updateRepository(repositoryId: string, name: string, customPrompt: string) {
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

    // First, get the repository to check if it exists and get its organization_id
    const { data: repository, error: fetchError } = await supabase
      .from("repository")
      .select("id, organization_id")
      .eq("id", repositoryId)
      .single()

    if (fetchError || !repository) {
      console.error("Repository not found:", fetchError)
      return {
        success: false,
        error: "Repository not found",
      }
    }

    // Verify the user has access to this repository's organization
    console.log("🔐 Checking user access to repository's organization:", repository.organization_id)
    
    const organizationsResult = await getOrganizations()
    
    if (!organizationsResult.success || !organizationsResult.data) {
      console.error("No organizations found for user:", user.id)
      return {
        success: false,
        error: "No organizations found or access denied",
      }
    }

    // Check if the organization ID is in the user's list of organizations
    const hasAccess = organizationsResult.data.some((org: any) => org.id === Number.parseInt(repository.organization_id))
    
    if (!hasAccess) {
      console.error("User does not have access to repository's organization:", repository.organization_id)
      return {
        success: false,
        error: "Access denied to this repository",
      }
    }

    console.log("✅ User has access, updating repository:", repositoryId)

    // Update the repository
    const { data, error } = await supabase
      .from("repository")
      .update({
        name: name,
        custom_prompt: customPrompt,
      })
      .eq("id", repositoryId)
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to update repository",
      }
    }

    console.log("✅ Repository updated successfully:", data)

    return {
      success: true,
      data: data[0],
      message: "Repository updated successfully!",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function createRepository(organizationId: string, name: string, customPrompt: string) {
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

    // Verify the user has access to this organization
    console.log("🔐 Checking user access to organization:", organizationId)
    
    const organizationsResult = await getOrganizations()
    
    if (!organizationsResult.success || !organizationsResult.data) {
      console.error("No organizations found for user:", user.id)
      return {
        success: false,
        error: "No organizations found or access denied",
      }
    }

    // Check if the organization ID is in the user's list of organizations
    const hasAccess = organizationsResult.data.some((org: any) => org.id === Number.parseInt(organizationId))
    
    if (!hasAccess) {
      console.error("User does not have access to organization:", organizationId)
      return {
        success: false,
        error: "Access denied to this organization",
      }
    }

    console.log("✅ User has access, creating repository in organization:", organizationId)

    // Create the repository
    const { data, error } = await supabase
      .from("repository")
      .insert([
        {
          name: name,
          custom_prompt: customPrompt,
          organization_id: organizationId,
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to create repository",
      }
    }

    console.log("✅ Repository created successfully:", data)

    return {
      success: true,
      data: data[0],
      message: "Repository created successfully!",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}