import { createUserClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import OrganizationDetailClient from "./components/OrganizationDetailClient";

interface OrganizationDetailProps {
  params: {
    id: string;
  };
}

export default async function OrganizationDetail({ params }: OrganizationDetailProps) {
  const supabase = await createUserClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header supabaseUser={user} />
      <OrganizationDetailClient organizationId={params.id} />
    </div>
  );
}