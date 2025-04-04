
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

type UserType = {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  isAdmin?: boolean;
};

const AdminUsers = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchUsers();
  }, []);

  // Mock function to fetch users
  const fetchUsers = () => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', mobile: '9876543210' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', mobile: '8765432109' },
        { id: '3', name: 'Admin User', email: 'admin@cybertrinetri.com', mobile: '7654321098', isAdmin: true },
        { id: '4', name: 'Alice Johnson', email: 'alice@example.com', mobile: '6543210987' },
        { id: '5', name: 'Bob Williams', email: 'bob@example.com', mobile: '5432109876' }
      ];
      // Filter out admin users
      const regularUsers = mockUsers.filter(user => !user.isAdmin);
      setUsers(regularUsers);
      setLoading(false);
    }, 1000);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would be an API call
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "User has been successfully removed from the system",
    });
    setConfirmDelete(null);
  };

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <h1 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue">
                    User Management
                  </h1>
                </div>
                <p className="text-gray-600 mt-2">
                  View and manage registered users.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-6 md:p-8"
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyber-blue"></div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-cyber-dark-blue mb-6 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Registered Users ({users.length})
              </h2>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobile || 'N/A'}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setConfirmDelete(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm User Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => confirmDelete && handleDeleteUser(confirmDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
