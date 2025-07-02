'use client'

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Plus, GitBranch, Calendar, Settings, ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddRepositoryModal from "@/components/AddRepositoryModal";

interface Repository {
  id: string;
  name: string;
  reviewStrength: string;
  customPrompt: string;
  lastActivity: string;
  status: "active" | "inactive";
}

export default function OrganizationDetail() {
  const params = useParams();
  const id = params.id;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([
    {
      id: "1",
      name: "frontend-app",
      reviewStrength: "thorough",
      customPrompt: "Focus on React best practices and accessibility",
      lastActivity: "2024-01-20",
      status: "active"
    },
    {
      id: "2", 
      name: "api-backend",
      reviewStrength: "strict",
      customPrompt: "Emphasize security and performance",
      lastActivity: "2024-01-18",
      status: "active"
    },
    {
      id: "3",
      name: "mobile-client",
      reviewStrength: "balanced",
      customPrompt: "",
      lastActivity: "2024-01-15",
      status: "inactive"
    }
  ]);

  // Mock organization data - in real app would fetch based on id
  const organization = {
    name: "TechCorp Inc.",
    description: "Main development team for enterprise applications",
    members: 12
  };

  const handleAddRepository = (name: string, reviewStrength: string, customPrompt: string) => {
    const newRepo: Repository = {
      id: Date.now().toString(),
      name,
      reviewStrength,
      customPrompt,
      lastActivity: new Date().toISOString().split('T')[0],
      status: "active"
    };
    setRepositories([...repositories, newRepo]);
  };

  const getReviewStrengthColor = (strength: string) => {
    switch (strength) {
      case "balanced":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "thorough":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "strict":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/organizations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Organizations
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
              Add Repository
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
              <GitBranch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repositories.length}</div>
              <p className="text-xs text-muted-foreground">
                {repositories.filter(repo => repo.status === "active").length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Reviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                2 pending approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organization.members}</div>
              <p className="text-xs text-muted-foreground">
                All with access
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
                    <TableHead>Review Strength</TableHead>
                    <TableHead>Custom Prompt</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {repositories.map((repo) => (
                    <TableRow key={repo.id}>
                      <TableCell className="font-medium">{repo.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getReviewStrengthColor(repo.reviewStrength)}`}>
                          {repo.reviewStrength}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {repo.customPrompt || "None"}
                      </TableCell>
                      <TableCell>{repo.lastActivity}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          repo.status === "active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                        }`}>
                          {repo.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
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
        onAddRepository={handleAddRepository}
      />
    </div>
  );
}