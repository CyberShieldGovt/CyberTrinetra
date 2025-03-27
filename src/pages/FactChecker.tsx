
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Link, Image, FileText, AlertCircle } from 'lucide-react';
import FactCheckerIntro from '@/components/FactCheckerIntro';

const FactChecker = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [result, setResult] = useState<null | { safe: boolean; reason: string }>(null);

  const handleFileUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setFileUploaded(true);
      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
      });
    }, 1500);
  };

  const handleCheck = () => {
    setChecking(true);
    // Simulate check
    setTimeout(() => {
      setChecking(false);
      // Random result for demo purposes
      const isSafe = Math.random() > 0.5;
      setResult({
        safe: isSafe,
        reason: isSafe
          ? "This content appears to be legitimate and safe."
          : "This content shows signs of being fraudulent. We detected suspicious patterns commonly associated with scams."
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fact Checker</h1>

      {/* Add the FactCheckerIntro component here */}
      <FactCheckerIntro />

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="image">Image</TabsTrigger>
          <TabsTrigger value="document">Document</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
        </TabsList>

        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle>Check a URL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Link className="text-cyber-blue" />
                  <Input
                    type="url"
                    placeholder="Enter a URL to check"
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Enter a URL to verify if it leads to a legitimate website or a potentially harmful one.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheck}
                disabled={checking}
                className="w-full"
              >
                {checking ? "Checking..." : "Check URL"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Check an Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                    fileUploaded ? "border-green-500" : "border-gray-300"
                  }`}
                  onClick={handleFileUpload}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Image className={fileUploaded ? "text-green-500" : "text-cyber-blue"} size={32} />
                    <p className="text-sm font-medium">
                      {fileUploaded ? "Image uploaded" : "Click to upload an image"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports JPEG, PNG, GIF
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Upload an image to verify its authenticity and check for signs of manipulation.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheck}
                disabled={checking || !fileUploaded}
                className="w-full"
              >
                {checking ? "Checking..." : "Analyze Image"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="document">
          <Card>
            <CardHeader>
              <CardTitle>Check a Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                    fileUploaded ? "border-green-500" : "border-gray-300"
                  }`}
                  onClick={handleFileUpload}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FileText className={fileUploaded ? "text-green-500" : "text-cyber-blue"} size={32} />
                    <p className="text-sm font-medium">
                      {fileUploaded ? "Document uploaded" : "Click to upload a document"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports PDF, DOC, DOCX, TXT
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Upload a document to verify its authenticity and check for signs of fraud.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheck}
                disabled={checking || !fileUploaded}
                className="w-full"
              >
                {checking ? "Checking..." : "Analyze Document"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Check Text Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  className="w-full border rounded-md p-3 h-40 focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
                  placeholder="Paste the text you want to check for authenticity or signs of fraud..."
                ></textarea>
                <p className="text-sm text-gray-500">
                  Paste text messages, emails, or any other textual content to check for scam indicators.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCheck}
                disabled={checking}
                className="w-full"
              >
                {checking ? "Checking..." : "Analyze Text"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {result && (
        <div className={`mt-8 p-6 rounded-lg border ${
          result.safe ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-start space-x-4">
            <div className={`rounded-full p-2 ${
              result.safe ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}>
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${
                result.safe ? "text-green-700" : "text-red-700"
              }`}>
                {result.safe ? "Content appears to be safe" : "Potential fraud detected"}
              </h3>
              <p className="mt-2 text-gray-600">{result.reason}</p>
              {!result.safe && (
                <div className="mt-4">
                  <h4 className="font-medium text-red-700 mb-2">Recommended Action:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Do not respond to or engage with the content</li>
                    <li>Do not share personal information or financial details</li>
                    <li>Report the content to relevant authorities</li>
                    <li>If you've already engaged, contact your bank or financial institutions</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactChecker;
