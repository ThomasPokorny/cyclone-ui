"use server"

import { getAdminClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function validateAndClaimInvitation(inviteKey: string) {
  try {
    const supabase = getAdminClient()
    
    console.log("🔍 Checking invitation key:", inviteKey)
    
    // Check if invitation exists and is not claimed
    const { data: invitation, error: fetchError } = await supabase
      .from("invitation")
      .select("*")
      .eq("invitation_key", inviteKey)
      .single()

    if (fetchError || !invitation) {
      console.log("❌ Invitation key not found:", inviteKey)
      redirect("/")
    }

    console.log("✅ Invitation found:", invitation)

    // Check if invitation is already claimed
    if (invitation.is_claimed) {
      console.log("❌ Invitation already claimed:", inviteKey)
      redirect("/")
    }

    console.log("🎉 Invitation is valid and unclaimed, claiming it now...")

    // Claim the invitation by setting is_claimed to true
    const { error: updateError } = await supabase
      .from("invitation")
      .update({ is_claimed: true })
      .eq("invitation_key", inviteKey)

    if (updateError) {
      console.error("Failed to claim invitation:", updateError)
      return {
        success: false,
        error: "Failed to claim invitation",
      }
    }

    console.log("✅ Invitation successfully claimed:", inviteKey)

    return {
      success: true,
      invitation: invitation,
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}