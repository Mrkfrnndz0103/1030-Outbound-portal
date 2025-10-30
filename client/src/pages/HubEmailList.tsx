import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const mockEmails = [
  { id: "1", hub: "North Hub", email: "north.hub@company.com", name: "North Hub Manager" },
  { id: "2", hub: "South Hub", email: "south.hub@company.com", name: "South Hub Manager" },
  { id: "3", hub: "East Hub", email: "east.hub@company.com", name: "East Hub Manager" },
  { id: "4", hub: "West Hub", email: "west.hub@company.com", name: "West Hub Manager" },
];

export default function HubEmailList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState({ hub: "", email: "", name: "" });

  const handleAdd = () => {
    console.log("Add email:", newEmail);
    setIsAddDialogOpen(false);
    setNewEmail({ hub: "", email: "", name: "" });
  };

  const filteredEmails = mockEmails.filter(
    (item) =>
      item.hub.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LM Hub Email List</h1>
          <p className="text-muted-foreground mt-1">
            Manage hub contact emails for dispatch notifications
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-email">
              <Plus className="h-4 w-4" />
              Add Email
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Hub Email</DialogTitle>
              <DialogDescription>
                Add a new contact email for hub notifications
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="hub">Hub Name</Label>
                <Input
                  id="hub"
                  placeholder="e.g., North Hub"
                  value={newEmail.hub}
                  onChange={(e) => setNewEmail({ ...newEmail, hub: e.target.value })}
                  data-testid="input-hub-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hub@company.com"
                  value={newEmail.email}
                  onChange={(e) => setNewEmail({ ...newEmail, email: e.target.value })}
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Contact Name</Label>
                <Input
                  id="name"
                  placeholder="Manager Name"
                  value={newEmail.name}
                  onChange={(e) => setNewEmail({ ...newEmail, name: e.target.value })}
                  data-testid="input-contact-name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} data-testid="button-cancel">
                Cancel
              </Button>
              <Button onClick={handleAdd} data-testid="button-save-email">
                Add Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search hubs, emails, or contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-emails"
            />
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Hub Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead>Contact Name</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                    No emails found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmails.map((item) => (
                  <TableRow key={item.id} data-testid={`row-email-${item.id}`}>
                    <TableCell className="font-medium">{item.hub}</TableCell>
                    <TableCell className="font-mono text-sm">{item.email}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          data-testid={`button-edit-${item.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          data-testid={`button-delete-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
