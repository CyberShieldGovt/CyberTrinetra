
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Search, Download, FileText, Clock, Tag, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';

type CaseStatus = {
  caseNumber: string;
  category: string;
  dateTime: string;
  firCopy: string;
  briefing: string;
  status: string;
  comments: string;
} | null;

const CaseStatus = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [caseStatus, setCaseStatus] = useState<CaseStatus>(null);
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caseNumber.trim()) {
      setError('Please enter a case number');
      return;
    }
    
    setError('');
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock data for demonstration
      if (caseNumber === 'CS12345') {
        setCaseStatus({
          caseNumber: 'CS12345',
          category: 'Financial Fraud',
          dateTime: '2023-06-15 10:30 AM',
          firCopy: 'FIR_CS12345.pdf',
          briefing: 'Unauthorized transaction of ₹25,000 from credit card on June 15, 2023.',
          status: 'In Progress',
          comments: 'Investigation ongoing. Bank statements being verified. Will contact you for more details soon.'
        });
        toast.success('Case found!');
      } else {
        setCaseStatus(null);
        toast.error('No case found with that number');
      }
      
      setIsSearching(false);
    }, 1500);
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
            <h1 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue mb-2">
              Check Case Status
            </h1>
            <p className="text-gray-600 mb-6">
              Enter your case number to track the current status of your complaint.
            </p>
            
            <form onSubmit={handleSearch} className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-2">
                <Label htmlFor="caseNumber">
                  Enter Case Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="caseNumber"
                    placeholder="e.g., CS12345"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    className={`pl-10 ${error ? 'border-red-500' : ''}`}
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                <p className="text-xs text-gray-500">Demo: Try searching for "CS12345"</p>
              </div>
              
              <div className="flex justify-center">
                <Button type="submit" disabled={isSearching}>
                  <Search className="mr-2 h-4 w-4" />
                  {isSearching ? 'Searching...' : 'Check Case Status'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Case Results */}
        {caseStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-soft p-6 md:p-8"
          >
            <h2 className="text-xl md:text-2xl font-bold text-cyber-dark-blue mb-4">
              Case Details
            </h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Field</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-cyber-blue" />
                      Case Number
                    </TableCell>
                    <TableCell>{caseStatus.caseNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium flex items-center">
                      <Tag className="mr-2 h-4 w-4 text-cyber-blue" />
                      Case Category
                    </TableCell>
                    <TableCell>{caseStatus.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-cyber-blue" />
                      Date/Time
                    </TableCell>
                    <TableCell>{caseStatus.dateTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-cyber-blue" />
                      FIR Uploaded Copy
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-cyber-blue" />
                      Case Briefing
                    </TableCell>
                    <TableCell>{caseStatus.briefing}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium flex items-center">
                      <Tag className="mr-2 h-4 w-4 text-cyber-blue" />
                      Case Status
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {caseStatus.status}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium flex items-center">
                      <MessageCircle className="mr-2 h-4 w-4 text-cyber-blue" />
                      Admin Comments
                    </TableCell>
                    <TableCell>{caseStatus.comments}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CaseStatus;
