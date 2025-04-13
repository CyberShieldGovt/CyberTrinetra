
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Shield, Lock, User,Eye, EyeOff  } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { sendOtpForAdmin, verifyOtpToRegister } from '@/services';

const AdminLogin = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  // Authentication flow states
  const [adminId, setAdminId] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Authentication step states
  const [step, setStep] = useState(1); // 1: Admin ID, 2: OTP Verification, 3: Password
  
  
  const [verifyingId, setVerifyingId] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  // If already authenticated, redirect to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const handleVerifyAdminId = async () => {
    if (!adminId.trim()) {
      toast.error('Please enter your Admin ID');
      return;
    }
    
    setVerifyingId(true);
    
    try {
           
        setSendingOtp(true);
        try {
          const res =await sendOtpForAdmin({email: adminId});
          if(res?.success){
            toast.success('OTP sent to your registered email');
            setStep(2);
          }
        } catch (error) {
          console.error('Error sending OTP:', error);
          toast.error('Enter valid Admin ID');
        } finally {
          setSendingOtp(false);
        }
    } catch (error) {
      console.error('Error verifying Admin ID:', error);
      toast.error('Failed to verify Admin ID');
    } finally {
      setVerifyingId(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }
    
    setVerifyingOtp(true);
    
    try {
      // Mock OTP verification 
      const res = await verifyOtpToRegister({email: adminId, otp: Number(otp)});
      if (res?.success) {
        toast.success('OTP verified successfully');
        setStep(3); 
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('OTP verification failed');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!password.trim()) {
      toast.error('Please enter your password');
      return;
    }
    
    setLoggingIn(true);
    
    try {
      await login(adminId, password);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setLoggingIn(false);
    }
    };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-soft p-8"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-cyber-dark-blue p-3 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-cyber-dark-blue mb-2">Admin Portal</h1>
            <p className="text-gray-600">Secure login for administrators</p>
          </div>
          
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminId">Admin ID</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="adminId"
                      type="text"
                      placeholder="Enter your Admin ID"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  className="w-full"
                  onClick={handleVerifyAdminId}
                  disabled={verifyingId || sendingOtp}
                >
                  {verifyingId ? 'Verifying...' : sendingOtp ? 'Sending OTP...' : 'Verify & Send OTP'}
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <p className="text-sm text-gray-500">
                    Enter the 6-digit code sent to your registered email
                  </p>
                  
                  <div className="flex justify-center py-4">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={handleVerifyOTP}
                    disabled={verifyingOtp}
                  >
                    {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-sm"
                    onClick={() => {
                      setStep(1);
                      setOtp('');
                    }}
                  >
                    Back to Admin ID
                  </Button>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-md bg-green-50 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        OTP Verified
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Please enter your password to continue</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                       type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="button" 
                  className="w-full"
                  onClick={handleAdminLogin}
                  disabled={loggingIn}
                >
                  {loggingIn ? 'Logging in...' : 'Login to Admin Panel'}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-sm"
                  onClick={() => {
                    setStep(2);
                    setPassword('');
                  }}
                >
                  Back to OTP Verification
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
