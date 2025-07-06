import { createUserClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import OrganizationDetailClient from "./components/OrganizationDetailClient";
import { getOrganizationById } from "../../actions/organization";
import { getRepositoriesByOrganizationId } from "../../actions/repositories";

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

  // Fetch organization data
  const organizationResult = await getOrganizationById(params.id);
  
  if (!organizationResult.success || !organizationResult.data) {
    redirect("/dashboard");
  }

  // Fetch repositories for this organization
  const repositoriesResult = await getRepositoriesByOrganizationId(params.id);

  return (
    <div className="min-h-screen bg-background">
      <Header supabaseUser={user} />
      <OrganizationDetailClient 
        organizationId={params.id} 
        organization={organizationResult.data}
        repositories={repositoriesResult.success ? repositoriesResult.data : []}
      />
    </div>
  );
}
