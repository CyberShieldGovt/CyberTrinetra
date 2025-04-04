
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FileText, CheckCircle2, Upload, Edit, BarChart2, Users, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminAnalytics } from '@/services';

export const formatDate = (dateString: string | Date): string => {
  const date = new Date(dateString);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12 for 12 AM
  const formattedHours = hours.toString().padStart(2, '0');
  
  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
};

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [cases, setCases] = useState()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  const getAllComplains = async()=>{
      const res = await getAdminAnalytics()
      if(res?.success){
        setCases(res?.admin)
      }
    }
    useEffect(()=>{
      getAllComplains()
    },[])
    console.log("casews", cases)

  const dashboardItems = [
    {
      title: 'Check Cases',
      description: 'Manage and review reported cases',
      icon: <FileText className="h-10 w-10 text-cyber-blue" />,
      link: '/admin/cases',
      stats: '24 new',
      color: 'bg-blue-50'
    },
    {
      title: 'Fact Checker',
      description: 'Review fact checker requests',
      icon: <CheckCircle2 className="h-10 w-10 text-green-500" />,
      link: '/admin/fact-checker',
      stats: '13 pending',
      color: 'bg-green-50'
    },
    {
      title: 'Gallery Upload',
      description: 'Manage website gallery images',
      icon: <Upload className="h-10 w-10 text-purple-500" />,
      link: '/admin/gallery',
      stats: '67 images',
      color: 'bg-purple-50'
    },
    {
      title: 'Write Blog',
      description: 'Create and edit blog posts',
      icon: <Edit className="h-10 w-10 text-yellow-500" />,
      link: '/admin/blogs',
      stats: '8 drafts',
      color: 'bg-yellow-50'
    },
    {
       title: 'User Management',
       description: 'View and manage system users',
       icon: <Users className="h-10 w-10 text-red-500" />,
       link: '/admin/users',
       stats: '5 users',
       color: 'bg-red-50'
     }
  ];
  
  // Mock statistics data
  const statsData = [
    { title: 'Total Cases', value: cases?.totalCases??0, icon: <FileText className="h-5 w-5" />, change: `${cases?.percentageOfTotalCasesLastMonth} from last month` },
    { title: 'Resolved Cases', value: cases?.totalResolvedCases, icon: <CheckCircle2 className="h-5 w-5" />, change: `${cases?.percentageOfTotalCasesLastMonth} from last month` },
    { title: 'Total Users', value: cases?.totalUsers, icon: <Users className="h-5 w-5" />, change: `${cases?.percentageOfTotalCasesLastMonth} from last month` },
    { title: 'Pending Facts', value: '27', icon: <Clock className="h-5 w-5" />, change: '-3% from last month' }
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-cyber-dark-blue">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage and monitor all aspects of CyberShield platform.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Reports
                </Button>
                <Button size="sm">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Alerts
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium text-gray-500">{stat.title}</CardTitle>
                    <div className="p-2 rounded-full bg-gray-100">
                      {stat.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Admin Actions */}
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
                  <CardHeader className={`${item.color} rounded-t-xl relative overflow-hidden`}>
                    <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-cyber-dark-blue">
                      {item.stats}
                    </div>
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

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-soft p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-cyber-dark-blue mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { time: '2 hours ago', action: 'New case reported', description: 'Financial fraud case #CS12789 was submitted' },
              { time: '5 hours ago', action: 'Case status updated', description: 'Case #CS12345 status changed to "In Progress"' },
              { time: '1 day ago', action: 'Fact checker request', description: 'New verification request #FC34567 received' },
              { time: '2 days ago', action: 'New blog published', description: 'Blog post "Protecting Your Online Identity" has been published' },
              { time: '3 days ago', action: 'New user registered', description: 'User ID #U7890 created a new account' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="h-4 w-4 text-cyber-blue" />
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <h4 className="text-sm font-semibold text-cyber-dark-blue">{activity.action}</h4>
                    <span className="text-xs text-gray-500 ml-2">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
