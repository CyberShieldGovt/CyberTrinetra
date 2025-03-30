
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Save } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { getUserById, updateUserById } from '@/services';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchUser = async()=>{
    const res = await getUserById()
    if(res?.success){
      const user = res?.user
      setName(user?.name)
      setEmail(user?.email)
      setMobile(user?.phone)
    }
    else{
      toast.error("Error fetching user details!")
    }
  }
  useEffect(()=>{
    fetchUser()
  },[])

  // useEffect(() => {
  //   window.scrollTo(0, 0);
    
  //   // Initialize form with user data
  //   if (user) {
  //     setName(user.name || '');
  //     setEmail(user.email || '');
  //     setMobile(user.mobile || '9876543210'); // Default for demo
  //   }
  // }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSave = async() => {
    setIsSaving(true)
    try{
      const res = await updateUserById({name, email, phone:mobile})
      if(res?.success){
        toast.success("Successfully updated data!")
        setIsSaving(false)
        setIsEditing(false)
        fetchUser()
      }
    }catch(error: any){
      setIsSaving(false)
      toast.error("Error updating data!")
    }finally{
      setIsSaving(false)
    }
  };

  return (
    <div className="min-h-screen bg-cyber-light-gray py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-cyber-dark-blue mb-4">
              User Profile
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage your personal information and account settings
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Edit your information below and save changes" 
                    : "Your personal details are shown below"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile">
                      Mobile Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="pl-10"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  {isEditing ? (
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center"
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
