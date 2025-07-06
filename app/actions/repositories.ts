"use server"

import { getAdminClient, createUserClient } from "@/utils/supabase/server"
import { getOrganizations } from "./organization"
import { getInstallationByUserId } from "./github"

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

export async function deleteRepository(repositoryId: string) {
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

    console.log("✅ User has access, deleting repository:", repositoryId)

    // Delete the repository
    const { error } = await supabase
      .from("repository")
      .delete()
      .eq("id", repositoryId)

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to delete repository",
      }
    }

    console.log("✅ Repository deleted successfully:", repositoryId)

    return {
      success: true,
      message: "Repository deleted successfully!",
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
          precision: 'minor'
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

export async function getAvailableGitHubRepositories(organizationId: string) {
  try {
    const authSupabase = await createUserClient()
    
    // Get current user
    const { data: { user }, error: userError } = await authSupabase.auth.getUser()
    
    if (userError || !user) {
      console.error("Failed to get user:", userError)
      return {
        success: false,
        error: "User not authenticated",
      }
    }

    // Get user's installation to get the GitHub installation ID
    const installationResult = await getInstallationByUserId()
    
    if (!installationResult.success || !installationResult.data) {
      console.error("No installation found for user:", user.id)
      return {
        success: false,
        error: "No GitHub installation found.",
      }
    }

    const installationId = installationResult.data.installation_id

    console.log("🔍 Fetching GitHub repositories for installation:", installationId)

    // Get GitHub App credentials
    const githubAppId = process.env.GITHUB_APP_ID
    const githubPrivateKey = process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, '\n')
    
    if (!githubAppId || !githubPrivateKey) {
      console.error("GitHub App credentials not configured")
      return {
        success: false,
        error: "GitHub integration not configured. Please contact support.",
      }
    }

    // Create JWT token for GitHub App authentication
    const jwt = await createGitHubAppJWT(githubAppId, githubPrivateKey)
    
    // Get installation access token
    const installationToken = await getInstallationAccessToken(installationId, jwt)
    
    if (!installationToken) {
      return {
        success: false,
        error: "Failed to authenticate with GitHub",
      }
    }

    // Fetch repositories from GitHub API
    const githubRepos = await fetchGitHubRepositories(installationToken)
    
    if (!githubRepos) {
      return {
        success: false,
        error: "Failed to fetch repositories from GitHub",
      }
    }

    // Get already linked repositories to filter them out
    const linkedRepos = await getRepositoriesByOrganizationId(organizationId)
    const linkedRepoNames = linkedRepos.success ? linkedRepos.data.map((repo: any) => repo.name) : []

    // Filter out already linked repositories
    const availableRepos = githubRepos.filter((repo: any) => !linkedRepoNames.includes(repo.name))

    console.log("✅ Available GitHub repositories:", availableRepos.length, "of", githubRepos.length, "total")

    return {
      success: true,
      data: availableRepos,
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

async function createGitHubAppJWT(appId: string, privateKey: string) {
  // Create JWT for GitHub App
  const jose = await import('jose')
  const { SignJWT } = jose
  
  const now = Math.floor(Date.now() / 1000)
  
  const payload = {
    iat: now - 60, // Issued 60 seconds in the past to allow for clock drift
    exp: now + (10 * 60), // Expires 10 minutes from now
    iss: appId, // GitHub App ID
  }

  const privateKeyObject = await jose.importPKCS8(privateKey, 'RS256')
  
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256' })
    .sign(privateKeyObject)
    
  return jwt
}

async function getInstallationAccessToken(installationId: string, jwt: string) {
  try {
    const response = await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Cyclone-AI-App',
      },
    })

    if (!response.ok) {
      console.error('Failed to get installation token:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    return data.token
  } catch (error) {
    console.error('Error getting installation token:', error)
    return null
  }
}

async function fetchGitHubRepositories(token: string) {
  try {
    const response = await fetch('https://api.github.com/installation/repositories', {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Cyclone-AI-App',
      },
    })

    if (!response.ok) {
      console.error('Failed to fetch repositories:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    
    // Return simplified repository objects
    return data.repositories.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      html_url: repo.html_url,
    }))
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return null
  }
}