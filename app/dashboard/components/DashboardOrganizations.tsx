'use client'

import {Building2, Users, Eye, MoreHorizontal, Plus, CheckCircle, Github} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import {useState} from "react";
import {getRandomGreeting} from "@/utils/greetings/greetings";
import AddOrganizationModal from "@/components/AddOrganizationModal";

interface Organization {
  id: string;
  name: string;
  description: string;
}

interface DashboardOrganizationsProps {
  organizations: Organization[];
}

export default function DashboardOrganizations({ organizations }: DashboardOrganizationsProps) {
  const [greeting, setGreeting] = useState(getRandomGreeting());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  return (
    <div className="container mx-auto max-w-6xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gradient">{greeting}</h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your Cyclone AI workspace
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
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizations.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready to be configured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repositories</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Waiting for GitHub App
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
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell className="text-muted-foreground">{org.description}</TableCell>
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

      <AddOrganizationModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onAddOrganization={() => {}}
      />
    </div>
  );
}