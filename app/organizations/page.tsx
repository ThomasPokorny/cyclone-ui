'use client'

import { useState } from "react";
import { Plus, Building2, Users, Calendar, MoreHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import AddOrganizationModal from "@/components/AddOrganizationModal";

interface Organization {
  id: string;
  name: string;
  description: string;
  members: number;
  createdAt: string;
  status: "active" | "pending";
}

export default function Organizations() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "1",
      name: "TechCorp Inc.",
      description: "Main development team for enterprise applications",
      members: 12,
      createdAt: "2024-01-15",
      status: "active"
    },
    {
      id: "2", 
      name: "StartupLabs",
      description: "Innovation lab for experimental projects",
      members: 5,
      createdAt: "2024-02-20",
      status: "active"
    },
    {
      id: "3",
      name: "Mobile Team",
      description: "Cross-platform mobile development unit",
      members: 8,
      createdAt: "2024-03-10",
      status: "pending"
    }
  ]);

  const handleAddOrganization = (name: string, description: string) => {
    const newOrg: Organization = {
      id: Date.now().toString(),
      name,
      description,
      members: 1,
      createdAt: new Date().toISOString().split('T')[0],
      status: "active"
    };
    setOrganizations([...organizations, newOrg]);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Organizations</h1>
            <p className="text-muted-foreground mt-2">
              Manage your organizations and teams using Cyclone AI
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organizations.length}</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizations.reduce((sum, org) => sum + org.members, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                +3 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Organizations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizations.filter(org => org.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Organizations List</CardTitle>
            <CardDescription>
              View and manage all your organizations in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">{org.name}</TableCell>
                    <TableCell className="text-muted-foreground">{org.description}</TableCell>
                    <TableCell>{org.members}</TableCell>
                    <TableCell>{org.createdAt}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        org.status === "active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}>
                        {org.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/organizations/${org.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AddOrganizationModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddOrganization={handleAddOrganization}
      />
    </div>
  );
}