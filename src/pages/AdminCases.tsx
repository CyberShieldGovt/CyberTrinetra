
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Filter, Search, CheckCircle, Clock, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAdminComplains, updateAdminComplains } from '@/services';
import { formatDate } from './AdminDashboard';

// Sample case data
// const casesData = [
//   {
//     id: 'CS12345',
//     category: 'Financial Fraud',
//     dateTime: '2023-06-15 10:30 AM',
//     firCopy: 'FIR_CS12345.pdf',
//     briefing: 'Unauthorized transaction of ₹25,000 from credit card on June 15, 2023.',
//     status: 'In Progress',
//     comments: 'Investigation ongoing. Bank statements being verified. Will contact you for more details soon.'
//   },
//   {
//     id: 'CS12346',
//     category: 'Women & Child',
//     dateTime: '2023-06-14 11:45 AM',
//     firCopy: 'FIR_CS12346.pdf',
//     briefing: 'Online harassment case involving threatening messages on social media platform.',
//     status: 'New',
//     comments: ''
//   },
//   {
//     id: 'CS12347',
//     category: 'Other Cyber Crime',
//     dateTime: '2023-06-13 09:15 AM',
//     firCopy: 'FIR_CS12347.pdf',
//     briefing: 'Website hacking attempt on company portal resulting in temporary downtime.',
//     status: 'Resolved',
//     comments: 'Perpetrator identified. Legal proceedings initiated. Security patches implemented.'
//   },
//   {
//     id: 'CS12348',
//     category: 'Financial Fraud',
//     dateTime: '2023-06-12 03:20 PM',
//     firCopy: 'FIR_CS12348.pdf',
//     briefing: 'Phishing email leading to fraudulent transaction of ₹15,000.',
//     status: 'In Progress',
//     comments: 'Email traced. Working with bank to reverse transaction.'
//   },
//   {
//     id: 'CS12349',
//     category: 'Women & Child',
//     dateTime: '2023-06-11 12:10 PM',
//     firCopy: 'FIR_CS12349.pdf',
//     briefing: 'Cyberbullying case involving a minor on educational platform.',
//     status: 'New',
//     comments: ''
//   },
//   {
//     id: 'CS12350',
//     category: 'Other Cyber Crime',
//     dateTime: '2023-06-10 02:35 PM',
//     firCopy: 'FIR_CS12350.pdf',
//     briefing: 'Ransomware attack on local business encrypting important files.',
//     status: 'Rejected',
//     comments: 'Case jurisdiction falls under specialized cyber cell. Redirected appropriately.'
//   }
// ];

// type Case = typeof casesData[0];

const AdminCases = () => {
  const [cases, setCases] = useState<any>();
  const [filteredCases, setFilteredCases] = useState<any>();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  const getAllComplains = async()=>{
    const res = await getAdminComplains({complainId: searchTerm, status: statusFilter, category: categoryFilter})
    if(res?.success){
      setCases(res?.admin)
      setFilteredCases(res?.admin)
    }
  }
  useEffect(()=>{
    getAllComplains()
  },[])

  useEffect(()=>{
    getAllComplains()
  },[statusFilter, categoryFilter, searchTerm])

  // Filter cases based on search term and filters

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
    setUpdateStatus(caseItem?.status);
    setComments(caseItem?.comment);
  };

  const handleUpdateCase = async() => {
    if (!selectedCase) return;
    
    setIsSubmitting(true);
    const res = await updateAdminComplains({complainId:selectedCase?.complainId, comment:comments, status: updateStatus})
    console.log("rsrs", res)
    if(res?.success){
      setCases(res?.admin);
      setSelectedCase(null);
      setIsSubmitting(false);
      getAllComplains()
      toast.success('Case updated successfully!');
    }
  };

  console.log("gdgd", selectedCase)
  // Status badge color mapping
  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'InProgress': 'bg-yellow-100 text-yellow-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <Link to="/admin" className="flex items-center text-cyber-blue hover:underline mb-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue">
                  Case Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Review and manage user-reported cybercrime cases.
                </p>
              </div>
            </div>
            
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="search" className="mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="search"
                    placeholder="Search by case ID or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category-filter" className="mb-2 block">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="financial">Financial Fraud</SelectItem>
                    <SelectItem value="Women-Child">Women & Child</SelectItem>
                    <SelectItem value="Other">Other Cyber Crime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status-filter" className="mb-2 block">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Cases Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Briefing</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases?.length > 0 ? (
                    filteredCases?.map((caseItem) => (
                      <TableRow key={caseItem?.complainId}>
                        <TableCell className="font-medium">{caseItem?.complainId}</TableCell>
                        <TableCell>{caseItem?.category}</TableCell>
                        <TableCell>{formatDate(caseItem?.approxDate)}</TableCell>
                        <TableCell className="max-w-xs truncate">{caseItem?.description}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[caseItem.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {caseItem.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleCaseSelect(caseItem)}
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Case Details: {selectedCase?.complainId}</DialogTitle>
                                <DialogDescription>
                                  Review and update the status of this case.
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedCase && (
                                <div className="mt-4 space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm text-gray-500">Category</Label>
                                      <p className="font-medium">{selectedCase?.category}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm text-gray-500">Date/Time</Label>
                                      <p className="font-medium">{selectedCase?.approxDate}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm text-gray-500">Case Briefing</Label>
                                    <p className="font-medium">{selectedCase?.description}</p>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm text-gray-500">FIR Document</Label>
                                    <div className="mt-1">
                                      <Button onClick={
                          () => window.open(selectedCase?.firUrl, '_blank')
                        } variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download FIR
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="update-status">Update Status</Label>
                                    <Select value={updateStatus} onValueChange={setUpdateStatus}>
                                      <SelectTrigger id="update-status" className="mt-1">
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Resolved">Resolved</SelectItem>
                                        <SelectItem value="Rejected">Rejected</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="comments">Add Comments</Label>
                                    <Textarea
                                      id="comments"
                                      placeholder="Add your comments or notes about this case"
                                      rows={4}
                                      value={comments}
                                      onChange={(e) => setComments(e.target.value)}
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              )}
                              
                              <DialogFooter>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setSelectedCase(null)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  onClick={handleUpdateCase}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Updating...' : 'Update Case'}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex flex-col items-center">
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-500">No cases found matching the filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCases;
