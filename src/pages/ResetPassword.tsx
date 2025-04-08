
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle, Circle, ScanBarcode } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetPassword } from '@/services';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showChecklist, setShowChecklist] = useState(false);
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!otp.trim()) newErrors.otp = 'OTP is required';
    else if (!/^\d{6}$/.test(otp)) newErrors.otp = 'OTP must be 6 digits';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await forgetPassword({email, password, otp: Number(otp)});
        console.log(res);
        if(res?.success) {
          toast.success("Password reset successfully. You can now log in.");
          navigate("/login");
          setIsLoading(false);
        }else{
          setIsLoading(false);
          toast.error(res?.message || "An error occurred while resetting the password.")
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred while resetting the password.");
        console.error('Registration error:', error);
        setIsLoading(false);
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
            <h1 className="text-3xl font-bold text-cyber-dark-blue mb-2">Reset Your Password</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
                      
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                <ul className="mt-2 space-y-1 text-sm">
                  {renderCheck(validations.minLength, 'At least 12 characters')}
                  {renderCheck(validations.hasUpper, 'At least 1 capital letter')}
                  {renderCheck(validations.hasSpecial, 'At least 1 special character')}
                  {renderCheck(validations.hasNumber, 'At least 1 number')}
                  <p className={`text-xs mt-2 font-medium ${strength < 2 ? 'text-red-500' : strength < 4 ? 'text-yellow-500' : 'text-green-600'}`}>
                    Password strength: {strength < 2 ? 'Weak' : strength < 4 ? 'Moderate' : 'Strong'}
                  </p>
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

            <div className="space-y-2">
              <Label htmlFor="email">OTP</Label>
              <div className="relative">
                <ScanBarcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="otp"
                  type="number"
                  placeholder="Enter your otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Resetting Account...' : 'Reset Password'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Go back to{' '}
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

export default ResetPassword;
