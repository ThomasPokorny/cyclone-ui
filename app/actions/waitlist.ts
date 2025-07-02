"use server"


import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

export async function addToWaitlist(formData: FormData) {
  const email = formData.get("email") as string
  const role = formData.get("role") as string

  if (!email || !role) {
    return {
      success: false,
      error: "Email and role are required",
    }
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("waitlist")
      .insert([
        {
          email: email,
          role: role,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to join waitlist. Please try again.",
      }
    }

    revalidatePath("/")

    return {
      success: true,
      message: "Successfully joined the waitlist!",
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}