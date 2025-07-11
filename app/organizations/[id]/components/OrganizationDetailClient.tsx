'use client'

import { useState } from "react";
import Link from "next/link";
import {Plus, GitBranch, Calendar, Settings, ArrowLeft, MoreHorizontal, CheckCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddRepositoryModal from "@/components/AddRepositoryModal";
import EditRepositoryModal from "@/components/EditRepositoryModal";

interface Repository {
  id: string;
  name: string;
  custom_prompt: string;
}

interface Organization {
  id: string;
  name: string;
  description: string;
  installation_id: string;
}

interface OrganizationDetailClientProps {
  organizationId: string;
  organization: Organization;
  repositories: Repository[];
}

export default function OrganizationDetailClient({ organizationId, organization, repositories: initialRepositories }: OrganizationDetailClientProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRepository, setEditingRepository] = useState<Repository | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>(initialRepositories);

  // Mock members count - in real app would fetch from database
  const membersCount = 12;

  const handleAddRepository = () => {
    // The modal will handle the refresh via window.location.reload()
  };

  const handleEditRepository = (repository: Repository) => {
    setEditingRepository(repository);
    setIsEditModalOpen(true);
  };

  const handleUpdateRepository = () => {
    // The modal will handle the refresh via window.location.reload()
    setEditingRepository(null);
  };


  return (
    <div className="p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">{organization.name}</h1>
            <p className="text-muted-foreground mt-2">
              {organization.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Link Repository
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repositories.length}</div>
              <p className="text-xs text-muted-foreground">
                Total repositories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Code Reviews</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Ready to start
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Repositories</CardTitle>
            <CardDescription>
              Manage all repositories for this organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            {repositories.length === 0 ? (
              <div className="text-center py-8">
                <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No repositories yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add your first repository to start code reviews
                </p>
                <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Repository
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Custom Prompt</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repositories.map((repo) => (
                    <TableRow key={repo.id}>
                      <TableCell className="font-medium">{repo.name}</TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {repo.custom_prompt || "None"}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRepository(repo);
                          }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AddRepositoryModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        organizationId={organizationId}
        onAddRepository={handleAddRepository}
      />

      <EditRepositoryModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        repository={editingRepository}
        onUpdateRepository={handleUpdateRepository}
      />
    </div>
  );
}
