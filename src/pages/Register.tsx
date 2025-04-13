import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, Circle, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { Progress } from "@/components/ui/progress";
import { sendOtp, sendOtpToRegister, verifyOtpToRegister } from '@/services';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showChecklist, setShowChecklist] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [step, setStep] = useState(1); 
  
  const { register, loading } = useAuth();

  const validateEmail = () => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return '';
  };

  const sendOtpFunc = async () => {
    const emailError = validateEmail();
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      return;
    }

    setSendingOtp(true);
    try {
      const res = await sendOtpToRegister({email});
      if(res?.success) {
        toast.success("Verification code has been sent to your email.");
        setSendingOtp(false);
        setOtpSent(true);
        setErrors(prev => ({ ...prev, email: '' }));
        setStep(2); 

      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred while sending the reset code.");
      console.error('Reset password error:', error);
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    setVerifyingOtp(true);
    try {
      const res = await verifyOtpToRegister({email, otp: Number(otp)});
      if(res?.success) {
        setOtpVerified(true);
        setErrors(prev => ({ ...prev, otp: '' }));
        setStep(3);
        toast.success("Email verified successfully.");
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, otp: 'Invalid OTP' }));
    } finally {
      setVerifyingOtp(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!otpVerified) {
      newErrors.email = 'Email verification is required';
      return false;
    }
    
    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Mobile number must be 10 digits';
    
    if (!password) newErrors.password = 'Password is required';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await register(name, email, mobile, password);
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  // Password validations
  const validations = {
    minLength: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()\-_=+{}[\]:;"'<>,.?/]/.test(password),
  };

  const strength = Object.values(validations).filter(Boolean).length;

  const renderCheck = (valid: boolean, label: string) => (
    <li className={`flex items-center text-sm ${valid ? 'text-green-600 line-through' : 'text-gray-600'}`}>
      {valid ? <CheckCircle className="w-4 h-4 mr-2" /> : <Circle className="w-4 h-4 mr-2" />}
      {label}
    </li>
  );
  
  const getProgressValue = () => {
    if (step === 1) return 33;
    if (step === 2) return otpVerified ? 66 : 33;
    return 100;
  };

  const renderStepIndicator = () => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className={`text-xs font-medium ${step >= 1 ? 'text-cyber-blue' : 'text-gray-400'}`}>Basic Info</span>
        <span className={`text-xs font-medium ${step >= 2 ? 'text-cyber-blue' : 'text-gray-400'}`}>Email Verification</span>
        <span className={`text-xs font-medium ${step >= 3 ? 'text-cyber-blue' : 'text-gray-400'}`}>Set Password</span>
      </div>
      <Progress value={getProgressValue()} className="h-2" />
    </div>
  );

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
            <h1 className="text-3xl font-bold text-cyber-dark-blue mb-2">Create an Account</h1>
            <p className="text-gray-600">Join CyberTrinetra to report and track cyber crimes</p>
          </div>
          
          {renderStepIndicator()}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="email">Email Address</Label>
                {otpVerified && <span className="text-xs flex items-center text-green-600"><Check className="w-3 h-3 mr-1" /> Verified</span>}
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    disabled={otpSent}
                  />
                </div>
                <Button 
                  type="button" 
                  onClick={sendOtpFunc} 
                  disabled={sendingOtp || otpVerified || !email} 
                  className="whitespace-nowrap"
                  variant={otpVerified ? "outline" : "default"}
                >
                  {sendingOtp ? 'Sending...' : otpVerified ? <Check className="h-4 w-4" /> : 'Send OTP'}
                </Button>
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Step 2: Email Verification */}
            {otpSent && !otpVerified && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 p-4 border border-dashed border-blue-300 rounded-lg bg-blue-50"
              >
                <div className="flex items-center space-x-2 text-cyber-blue">
                  <Mail className="h-5 w-5" />
                  <h3 className="font-medium">Verify Your Email</h3>
                </div>
                
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code sent to <span className="font-medium">{email}</span>
                </p>
                
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                
                {errors.otp && (
                  <div className="flex items-center text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.otp}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={sendOtpFunc}
                    disabled={sendingOtp}
                  >
                    Resend OTP
                  </Button>
                  <Button
                    type="button"
                    onClick={verifyOtp}
                    disabled={otp.length !== 6 || verifyingOtp}
                    size="sm"
                    className="ml-2"
                  >
                    {verifyingOtp ? 'Verifying...' : 'Verify Email'}
                    {!verifyingOtp && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`pl-10 ${errors.mobile ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>

            {/* Step 3: Password Setup */}
            {otpVerified && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 mt-6"
              >
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <div className="flex items-center text-green-700 mb-2">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Email Verified Successfully</h3>
                  </div>
                  <p className="text-sm text-green-600">Please create a strong password to complete your registration.</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setShowChecklist(true)}
                      onBlur={() => password.length === 0 && setShowChecklist(false)}
                      className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                  {/* Live Password Checklist */}
                  {showChecklist && (
                    <ul className="mt-2 space-y-1 text-sm bg-gray-50 p-3 rounded-lg">
                      {renderCheck(validations.minLength, 'At least 12 characters')}
                      {renderCheck(validations.hasUpper, 'At least 1 capital letter')}
                      {renderCheck(validations.hasSpecial, 'At least 1 special character')}
                      {renderCheck(validations.hasNumber, 'At least 1 number')}
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <p className={`text-xs font-medium ${strength < 2 ? 'text-red-500' : strength < 4 ? 'text-yellow-500' : 'text-green-600'}`}>
                            Password strength: {strength < 2 ? 'Weak' : strength < 4 ? 'Moderate' : 'Strong'}
                          </p>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${strength < 2 ? 'bg-red-500' : strength < 4 ? 'bg-yellow-500' : 'bg-green-600'}`}
                            style={{ width: `${(strength / 4) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </ul>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </motion.div>  
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !otpVerified || !password || !confirmPassword }
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-cyber-blue hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
