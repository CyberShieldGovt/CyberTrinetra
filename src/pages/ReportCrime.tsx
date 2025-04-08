
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Upload, Calendar, Info, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { uploadComplain } from '@/services';

const ReportCrime = () => {
  const [category, setCategory] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [firFile, setFirFile] = useState<File | null>(null);
  const [supportingFile, setSupportingFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!category) newErrors.category = 'Please select a category';
    if (!dateTime) newErrors.dateTime = 'Please select a date and time';
    if (!description.trim()) newErrors.description = 'Please provide information about the incident';
    if (!firFile) newErrors.firFile = 'Please upload the FIR copy';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    try{
        if (validateForm()) {
          setIsSubmitting(true);
          const complainData = {
            complain: firFile,
            extraDoc: supportingFile,
            category: category,
            approxDate: dateTime,
            description: description
          }
    
          const res = await uploadComplain(complainData);
          if(res?.success){
            toast.success(`Complain filed successfully with complain id ${res?.complain?.complainId}!`);
            setIsSubmitting(false)
          }else{
            toast.success("Error filing complain!")
            setIsSubmitting(false)
          }
      }
    }catch (error) {
      toast.error("An error occurred while filing the complain.");
      console.error('Error:', error);
      setIsSubmitting(false);
    }
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
            <h1 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue mb-2">
              Report a Cyber Crime
            </h1>
            <p className="text-gray-600 mb-6">
              Please provide accurate information about the incident to help us process your case efficiently.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category of complaint <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="women-child">Women & Child Related</SelectItem>
                    <SelectItem value="financial">Financial Frauds</SelectItem>
                    <SelectItem value="other">Other Cyber Crimes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateTime">
                  Approximate Date & Time <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="dateTime"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className={`pl-10 ${errors.dateTime ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.dateTime && <p className="text-red-500 text-xs mt-1">{errors.dateTime}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">
                  Please provide information about Incident <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Info className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <Textarea
                    id="description"
                    placeholder="Describe the incident in detail..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`pl-10 ${errors.description ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="firFile">
                  Please Upload the FIR Copy <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="firFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => e.target.files && setFirFile(e.target.files[0])}
                    className={`pl-10 ${errors.firFile ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.firFile && <p className="text-red-500 text-xs mt-1">{errors.firFile}</p>}
                <p className="text-xs text-gray-500">Accepted formats: PDF, JPG, PNG. Max size: 10MB</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="supportingFile">
                  Please Upload Other Supporting Documents (Optional)
                </Label>
                <div className="relative">
                  <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="supportingFile"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => e.target.files && setSupportingFile(e.target.files[0])}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500">Accepted formats: PDF, JPG, PNG, DOC. Max size: 10MB</p>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Case'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportCrime;
