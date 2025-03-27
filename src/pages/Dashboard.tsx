
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FileText, Search, CheckCircle2, User, AlertCircle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const dashboardItems = [
    {
      title: 'Report a Case',
      description: 'File a new cybercrime complaint',
      icon: <FileText className="h-10 w-10 text-cyber-blue" />,
      link: '/report-crime',
      color: 'bg-blue-50'
    },
    {
      title: 'Check Case Status',
      description: 'Track your complaint status',
      icon: <Search className="h-10 w-10 text-cyber-teal" />,
      link: '/case-status',
      color: 'bg-teal-50'
    },
    {
      title: 'Fact Checker',
      description: 'Verify suspicious communications',
      icon: <CheckCircle2 className="h-10 w-10 text-green-500" />,
      link: '/fact-checker',
      color: 'bg-green-50'
    },
    {
      title: 'User Profile',
      description: 'Manage your account settings',
      icon: <User className="h-10 w-10 text-purple-500" />,
      link: '/profile',
      color: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue mb-4">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              CyberTrinetra is here to assist you in reporting and tracking cyber crimes securely. 
              Your safety is our priority!
            </p>
          </div>
        </motion.div>

        {/* Dashboard Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={item.link} className="block h-full">
                <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardHeader className={`${item.color} rounded-t-xl`}>
                    <div className="flex justify-center">
                      {item.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pt-4">
                    <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-cyber-dark-blue mb-4">
            Quick Instructions
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span>
                <strong>To Report a Case:</strong> Click on "Report a Case" and follow the guided steps.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span>
                <strong>To Track a Case:</strong> Use the "Check Case Status" button to check your complaint status in real time.
              </span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-cyber-blue mr-3 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Pending Payments:</strong> If your case is resolved, please proceed with the service charge payment under the "Pending Payments" section.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Payment Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-soft p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-cyber-dark-blue mb-4">
            Payment Information
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <div className="h-5 w-5 text-cyber-blue mr-3 mt-0.5 flex-shrink-0">🔹</div>
              <span>
                <strong>Women & Children-Related Cases:</strong> These cases are free of cost, but you have the option to support our initiative through a "Buy Me a Coffee" donation modal, where you can contribute any amount at your discretion.
              </span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 text-cyber-blue mr-3 mt-0.5 flex-shrink-0">🔹</div>
              <span>
                <strong>Other Cases:</strong> These are chargeable and require payment upon resolution. Please complete the service charge payment to finalize your case.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Security & Privacy Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-cyber-navy rounded-xl shadow-soft p-6 md:p-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center">
            <Lock className="h-6 w-6 mr-2" /> Security & Privacy Tips
          </h2>
          <div className="text-gray-300 space-y-4">
            <p className="font-semibold">Your CyberTrinetra Account Security:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Never share your password or Case ID with anyone.</li>
              <li>Always logout if using a public/shared device.</li>
              <li>Keep your contact information updated for important case notifications.</li>
              <li>Enable two-factor authentication for additional security.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
