import { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

const useDashboard = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activity, setActivity] = useState<{ [date: string]: number }>({});

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    
    // TODO: Fetch activity data from API and setActivity
    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');

        console.log("Month: ", month);
        console.log("Year: ", year);

        axios({
            method:"GET",
            url:`${BASE_URL}/api/journal/activity?month=${month}&year=${year}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            setActivity(response.data.activity);
        })
        .catch((err) => {
            console.log(err);
            if (err.status == 401) {
                navigate('/login')
            }
        })

    }, [currentDate]);

    const maxActivity = useMemo(() => {
        const values = Object.values(activity);
        return values.length ? Math.max(...values) : 0;
    }, [activity]);

    const getActivityLevel = (date: Date) => {
        const dateKey = formatDateKey(date);
        const value = activity[dateKey] || 0;
        if (maxActivity === 0) return 0;
        return Math.round((value / maxActivity) * 4);
    };

    const formatDateKey = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
      const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const days = [];
        const current = new Date(startDate);
        
        while (current <= lastDay || current.getDay() !== 0) {
          days.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
        
        return days;
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
        setCurrentDate(newDate);
    };

    const isCurrentMonth = (date: Date) => {
        return date.getMonth() === currentDate.getMonth();
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isFutureDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date > today;
    };

    const getActivityColor = (level: number, isZero: boolean) => {
        // New blue palette
        // Background: #0d1117 (dark navy)
        // Level 1: #1e3a5f (subtle blue)
        // Level 2: #2563eb (medium blue)
        // Level 3: #3b82f6 (bright blue)
        // Level 4: #60a5fa (light blue)
        if (isZero) return 'bg-[#1e3a5f]/40'; // Subtle blue for zero activity with opacity
        switch (level) {
          case 1: return 'bg-[#1e3a5f]'; // subtle blue
          case 2: return 'bg-[#2563eb]'; // medium blue
          case 3: return 'bg-[#3b82f6]'; // bright blue
          case 4: return 'bg-[#60a5fa]'; // light blue
          default: return 'bg-[#0d1117]'; // dark navy background
        }
    };

    const handleDateClick = (date: Date) => {
        if (!isCurrentMonth(date) || isFutureDate(date)) return;
        
        const dateString = formatDateKey(date);
        navigate(`/journal/calendar/${dateString}`);
    };

    
    const days = getDaysInMonth(currentDate);

    return {
        days,
        months,
        daysOfWeek,
        currentDate,
        maxActivity,
        getActivityLevel,
        formatDateKey,
        navigateMonth,
        isToday,
        isCurrentMonth,
        isFutureDate,
        getActivityColor,
        handleDateClick,
    }
};

export default useDashboard;