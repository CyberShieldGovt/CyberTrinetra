
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, Search, Filter } from 'lucide-react';
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

// Sample fact checker data
const factCheckerData = [
  {
    id: 'FC12345',
    title: 'Suspicious Job Offer',
    dateTime: '2023-06-15 10:30 AM',
    suspectDetails: '+91 9876543210',
    suspiciousLink: 'https://fakejobs-scam.com/apply',
    description: 'Received a job offer via WhatsApp claiming to be from Microsoft. They are asking for advance payment for training.',
    document: 'JobOffer_WhatsApp_Screenshot.pdf',
    status: 'Pending',
    verdict: ''
  },
  {
    id: 'FC12346',
    title: 'Banking SMS Verification',
    dateTime: '2023-06-14 11:45 AM',
    suspectDetails: '+91 8765432109',
    suspiciousLink: 'https://bank-verify-account.co/login',
    description: 'Received SMS claiming to be from SBI asking to verify account details through the link or account will be suspended.',
    document: 'SMS_Screenshot.pdf',
    status: 'Completed',
    verdict: 'This is a phishing attempt. The link leads to a fake banking portal designed to steal credentials. The sender is not associated with any legitimate bank.'
  },
  {
    id: 'FC12347',
    title: 'Amazon Gift Card Scam',
    dateTime: '2023-06-13 09:15 AM',
    suspectDetails: 'amazon.rewards@gmail.com',
    suspiciousLink: 'https://amzn-gift-cards.net/claim',
    description: 'Email saying I\'ve won Amazon gift cards worth ₹10,000 and need to claim within 24 hours by clicking link and entering details.',
    document: 'Gift_Card_Email.pdf',
    status: 'Completed',
    verdict: 'This is a fraudulent email. Amazon never sends gift card offers from Gmail accounts. The domain in the link is not owned by Amazon.'
  },
  {
    id: 'FC12348',
    title: 'KYC Expiry Warning',
    dateTime: '2023-06-12 03:20 PM',
    suspectDetails: '+91 7654321098',
    suspiciousLink: 'https://kyc-update-wallet.info',
    description: 'SMS claiming my Paytm KYC has expired and account will be blocked if not updated immediately through the given link.',
    document: 'Paytm_KYC_SMS.pdf',
    status: 'Pending',
    verdict: ''
  },
  {
    id: 'FC12349',
    title: 'Income Tax Refund',
    dateTime: '2023-06-11 12:10 PM',
    suspectDetails: 'refunds@incometaxindia.gov.in',
    suspiciousLink: 'https://tax-refund-portal.com/claim',
    description: 'Email claiming I\'m eligible for tax refund and need to fill form at the link with bank details to receive payment.',
    document: 'Tax_Refund_Email.pdf',
    status: 'Completed',
    verdict: 'This is a phishing attempt. The Income Tax Department never asks for bank details via email links. The sender email may look official but is actually spoofed.'
  }
];

type FactCheck = typeof factCheckerData[0];

const AdminFactChecker = () => {
  const [factChecks, setFactChecks] = useState<FactCheck[]>(factCheckerData);
  const [filteredChecks, setFilteredChecks] = useState<FactCheck[]>(factCheckerData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCheck, setSelectedCheck] = useState<FactCheck | null>(null);
  const [verdict, setVerdict] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  // Filter fact checks based on search term and filters
  useEffect(() => {
    let result = [...factChecks];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        fc => 
          fc.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
          fc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(fc => fc.status === statusFilter);
    }
    
    setFilteredChecks(result);
  }, [searchTerm, statusFilter, factChecks]);

  const handleCheckSelect = (check: FactCheck) => {
    setSelectedCheck(check);
    setVerdict(check.verdict);
  };

  const handleUpdateCheck = () => {
    if (!selectedCheck) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update the fact check in the state
      const updatedChecks = factChecks.map(fc => 
        fc.id === selectedCheck.id 
          ? { ...fc, status: 'Completed', verdict: verdict }
          : fc
      );
      
      setFactChecks(updatedChecks);
      setSelectedCheck(null);
      setIsSubmitting(false);
      toast.success('Fact check verdict submitted successfully!');
    }, 1000);
  };

  // Status badge color mapping
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Completed': 'bg-green-100 text-green-800'
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
                  Fact Checker Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Review and respond to user fact check requests.
                </p>
              </div>
            </div>
            
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="search" className="mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="search"
                    placeholder="Search by ID, title, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="status-filter" className="mb-2 block">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Fact Checker Requests Table */}
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>Suspect Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChecks.length > 0 ? (
                    filteredChecks.map((check) => (
                      <TableRow key={check.id}>
                        <TableCell className="font-medium">{check.id}</TableCell>
                        <TableCell>{check.title}</TableCell>
                        <TableCell>{check.dateTime}</TableCell>
                        <TableCell>{check.suspectDetails}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[check.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {check.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleCheckSelect(check)}
                              >
                                {check.status === 'Pending' ? 'Review' : 'View'}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Fact Check Request: {selectedCheck?.id}</DialogTitle>
                                <DialogDescription>
                                  {selectedCheck?.status === 'Pending' 
                                    ? 'Review this request and provide your verdict.' 
                                    : 'View the details and verdict for this request.'}
                                </DialogDescription>
                              </DialogHeader>
                              
                              {selectedCheck && (
                                <div className="mt-4 space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm text-gray-500">Title</Label>
                                      <p className="font-medium">{selectedCheck.title}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm text-gray-500">Date/Time</Label>
                                      <p className="font-medium">{selectedCheck.dateTime}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm text-gray-500">Description</Label>
                                    <p className="font-medium">{selectedCheck.description}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm text-gray-500">Suspect Details</Label>
                                      <p className="font-medium">{selectedCheck.suspectDetails}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm text-gray-500">Suspicious Link</Label>
                                      <p className="font-medium break-all">{selectedCheck.suspiciousLink}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label className="text-sm text-gray-500">Document</Label>
                                    <div className="mt-1">
                                      <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Document
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="verdict">
                                      {selectedCheck.status === 'Pending' ? 'Provide Verdict' : 'Verdict'}
                                    </Label>
                                    <Textarea
                                      id="verdict"
                                      placeholder="Provide your assessment about whether this is a legitimate or fraudulent communication..."
                                      rows={5}
                                      value={verdict}
                                      onChange={(e) => setVerdict(e.target.value)}
                                      className="mt-1"
                                      disabled={selectedCheck.status === 'Completed'}
                                    />
                                  </div>
                                </div>
                              )}
                              
                              <DialogFooter>
                                <Button 
                                  variant="outline" 
                                  onClick={() => setSelectedCheck(null)}
                                >
                                  {selectedCheck?.status === 'Completed' ? 'Close' : 'Cancel'}
                                </Button>
                                
                                {selectedCheck?.status === 'Pending' && (
                                  <Button 
                                    onClick={handleUpdateCheck}
                                    disabled={isSubmitting || !verdict.trim()}
                                  >
                                    {isSubmitting ? 'Submitting...' : 'Submit Verdict'}
                                  </Button>
                                )}
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
                          <CheckCircle2 className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-gray-500">No fact check requests found matching the filters</p>
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

export default AdminFactChecker;
