import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';

const RESEND_COOLDOWN = 60; // seconds
const RESEND_TIMESTAMP_KEY = 'email_verification_resend_ts';

const useEmailVerification = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email] = useState(localStorage.getItem('email') || '');
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // Initialize countdown from localStorage
  useEffect(() => {
    const lastResendTimestamp = localStorage.getItem(RESEND_TIMESTAMP_KEY);
    if (lastResendTimestamp) {
      const timeElapsed = Math.floor((Date.now() - parseInt(lastResendTimestamp)) / 1000);
      const remainingTime = Math.max(0, RESEND_COOLDOWN - timeElapsed);
      if (remainingTime > 0) {
        setCountdown(remainingTime);
        setCanResend(false);
      } else {
        setCanResend(true);
        setCountdown(0);
      }
    } else {
      setCanResend(true);
      setCountdown(0);
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios({
        url: `${BASE_URL}/api/auth/email-verification`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ email, code })
      });
      if (res.data.success) {
        localStorage.removeItem('isEmailVerified');
        navigate('/preferences');
      } else {
        let message = res.data.message || 'Verification failed.';
        setError(message);
      }
    } catch (err: any) {
      console.log('err: ', err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!canResend || resendLoading) return;
    setResendLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios({
        url: `${BASE_URL}/api/auth/resend-verification`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ email })
      });
      if (res.data.success) {
        setSuccess('Verification code resent successfully!');
        setCanResend(false);
        setCountdown(RESEND_COOLDOWN);
        localStorage.setItem(RESEND_TIMESTAMP_KEY, Date.now().toString());
      } else {
        setError(res.data.message || 'Failed to resend code');
      }
    } catch (err: any) {
      console.log('err: ', err);
      setError(err.response?.data?.message || 'Failed to resend code');
    }
    setResendLoading(false);
  };

  return {
    code,
    setCode,
    handleSubmit,
    handleResend,
    error,
    success,
    loading,
    resendLoading,
    canResend,
    countdown,
    email
  };
};

export default useEmailVerification; 