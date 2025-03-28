import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Upload, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import FactCheckerIntro from '@/components/FactCheckerIntro';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FactChecker = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    suspectDetails: '',
    suspiciousLink: '',
    description: '',
  });
  const [ackNumber, setAckNumber] = useState('');
  const [statusResult, setStatusResult] = useState<null | {
    ackNumber: string;
    title: string;
    suspectDetails: string;
    uploadedDetails: string;
    status: string;
  }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileClick = () => {
    // Trigger the hidden file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const file = e.target.files[0];
      setFileName(file.name);

      // Simulate upload process
      setTimeout(() => {
        setUploading(false);
        setFileUploaded(true);
        toast({
          title: "File uploaded",
          description: `Your file "${file.name}" has been uploaded successfully.`,
        });
      }, 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Generate random acknowledgment number
      const newAckNumber = 'FC' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      toast({
        title: "Request submitted",
        description: `Your fact check request has been submitted. Your acknowledgment number is ${newAckNumber}.`,
      });
      // Reset form
      setFormData({
        title: '',
        suspectDetails: '',
        suspiciousLink: '',
        description: '',
      });
      setFileUploaded(false);
      setFileName('');
    }, 2000);
  };

  const handleStatusCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate status check
    setTimeout(() => {
      setSubmitting(false);
      // Simulate status result
      setStatusResult({
        ackNumber: ackNumber,
        title: "Suspicious Job Offer",
        suspectDetails: "+91 9876543210",
        uploadedDetails: "JobOffer_WhatsApp_Screenshot.pdf",
        status: "This appears to be a fraudulent job offer. The company does not request payment for training. Please do not share any financial information."
      });
      setAckNumber('');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Fact Checker Introduction Component */}
        <FactCheckerIntro />

        {/* Verify and Status Tabs */}
        <Tabs defaultValue="verify" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 w-full">
            <TabsTrigger value="verify">Verify with Fact Checker</TabsTrigger>
            <TabsTrigger value="status">Know Status of Fact Checker</TabsTrigger>
          </TabsList>

          <TabsContent value="verify">
            <Card>
              <CardHeader>
                <CardTitle>Verify with Fact Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Complaint Title <span className="text-red-500">*</span></Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Provide a Title Here"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="suspectDetails">Share the suspect Details</Label>
                    <Input
                      id="suspectDetails"
                      name="suspectDetails"
                      placeholder="Suspect number"
                      value={formData.suspectDetails}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="suspiciousLink">Share the Suspicious Link <span className="text-red-500">*</span></Label>
                    <Input
                      id="suspiciousLink"
                      name="suspiciousLink"
                      placeholder="Any links if you got from Scammers, Application links"
                      value={formData.suspiciousLink}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Brief the Incident & Why you Wanna Check <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="If you felt something is unsafe, brief us here what you felt, why and what you need to check."
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Please Upload Details <span className="text-red-500">*</span></Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                        fileUploaded ? "border-green-500" : "border-gray-300"
                      }`}
                      onClick={handleFileClick}
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <FileText className={fileUploaded ? "text-green-500" : "text-cyber-blue"} size={32} />
                        <p className="text-sm font-medium">
                          {fileUploaded ? `File uploaded: ${fileName}` : "Click to upload documents"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Any file, application or Screenshots in PDF format
                        </p>
                      </div>
                      {/* Hidden file input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting || !fileUploaded}
                    className="w-full"
                  >
                    {submitting ? "Submitting..." : "Submit for verification"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Know Status of Fact Checker</CardTitle>
              </CardHeader>
              <CardContent>
                {!statusResult ? (
                  <form onSubmit={handleStatusCheck} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="ackNumber">Acknowledgement Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="ackNumber"
                        placeholder="Enter Ack number"
                        value={ackNumber}
                        onChange={(e) => setAckNumber(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full"
                    >
                      {submitting ? "Checking..." : "SUBMIT FOR VERIFICATION"}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ack Number</TableHead>
                          <TableHead>Complaint Title</TableHead>
                          <TableHead>Suspect Details</TableHead>
                          <TableHead>Uploaded Details</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{statusResult.ackNumber}</TableCell>
                          <TableCell>{statusResult.title}</TableCell>
                          <TableCell>{statusResult.suspectDetails}</TableCell>
                          <TableCell>{statusResult.uploadedDetails}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Status By CYBERSHIELD Team:</h3>
                      <p className="text-gray-700">{statusResult.status}</p>
                    </div>

                    <Button onClick={() => setStatusResult(null)} className="w-full">
                      Check Another Status
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FactChecker;