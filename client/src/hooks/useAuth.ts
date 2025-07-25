import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";

const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);

    // Map server error codes/messages to user-friendly messages
    const errorMessageMap: Record<string, string> = {
        'invalid_callback': 'Invalid callback from X. Please try logging in again.',
        'invalid_state': 'Session expired or invalid state. Please try again.',
        'user_exists': 'An account with this X account already exists. Please log in.',
        'user_not_found': 'No account found for this X account. Please sign up first.',
        'oauth_failed': 'X login failed. Please try again.',
        'login_failed': 'Google login failed. Please try again.',
        'signup_failed': 'Google signup failed. Please try again.',
        // Add more mappings as needed
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get('status');
        const message = params.get('message');
        const token = params.get('token');
        const success = params.get('success');
        const id = params.get('id');
        const email = params.get('email');
        
        // Handle Google OAuth success callback
        if (success === 'true' && token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', id || '');
            localStorage.setItem('email', email || '');
            localStorage.setItem('isEmailVerified', 'true');
            navigate('/journal');
            return;
        }
        
        // Handle error messages
        if (status === 'false' && message) {
            const friendly = errorMessageMap[message] || 'Login failed. Please try again.';
            setError(friendly);
        }
    }, [location.search, navigate]);

    const handleToggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let payload;
        let url;

        setError(null); // Clear previous errors

        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
        }

        if (isLogin) {
            payload = {
                email: formData.email,
                password: formData.password
            }
            url = `${BASE_URL}/api/auth/login`;
        } else {
            // Auto-detect timezone for new users
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
            
            payload = { 
                name: formData.name,
                email: formData.email,
                password: formData.password,
                timeZone: userTimezone
            }
            url = `${BASE_URL}/api/auth/signup`;
        }

        console.log(payload);

        axios({
            method: "POST",
            url: url,
            data: payload
        }).then((res)=>{
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                let token = res?.data?.token;
                let userId = res?.data?.id;
                let email = res?.data?.email;

                localStorage.setItem('token',token);
                localStorage.setItem('user',userId);
                localStorage.setItem('email',email);
                if (!isLogin) {
                    // Signup: start tour and go to preferences
                    localStorage.setItem('tourStep', '1');
                    localStorage.setItem('isEmailVerified', false);
                    navigate('/email-verification')
                    // navigate('/preferences');
                } else {
                    // Login: go to dashboard
                    navigate('/journal');
                }
            }
        }).catch((err)=>{
            console.log(err);

            if (err.status == 400) {
                let message = err?.response?.data?.message || "Something went wrong";
                setError(message);
            }
        })
    };

    const handleSocialLogin = () => {
        // console.log("is login: ", isLogin);
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

        // Determine the correct endpoint based on login/signup mode
        const endpoint = isLogin ? 'login' : `signup?timezone=${userTimezone}`;
        let url = `${BASE_URL}/auth/google/${endpoint}`;

        // For Google OAuth, we redirect directly to the Google auth URL
        window.location.href = url;
    };
    
    return {
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleToggleMode,
        handleInputChange,
        handleSubmit,
        handleSocialLogin,
        formData,
        setFormData,
        isLogin,
        setIsLogin,
        error,
        setError
    }
}

export default useAuth;