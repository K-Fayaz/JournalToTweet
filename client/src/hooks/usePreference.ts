import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BASE_URL from '../config';
import axios from 'axios';
import { useToast } from '../contexts/ToastContext';

const usePreference = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
  
    // Custom prompt state
    const [defaultPrompt, setDefaultPrompt] = useState('');
    const [customPrompt, setCustomPrompt] = useState(
        "Generate engaging tweets that reflect my personality as a developer. Focus on being authentic, helpful, and relatable. Include relevant hashtags and emojis when appropriate. Keep the tone professional but approachable."
    );
    
    // Tone selection state
    const [defaultTones,setDefaultTones] = useState<string[]>([]);
    const [selectedTones, setSelectedTones] = useState<string[]>([]);
    
    // Time slots state (max 5 selections)
    const [defaultSlots,setDefaultSlots] = useState<string[]>([]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
    const [lockedTimeSlots, setLockedTimeSlots] = useState<string[]>([]);
    const [userTimeZone, setUserTimeZone] = useState<string>('UTC');
    const [isSaving, setIsSaving] = useState(false);

    // Available tones
    const availableTones = [
        { id: 'Professional', label: 'Professional', color: 'bg-blue-500' },
        { id: 'Casual', label: 'Casual', color: 'bg-green-500' },
        { id: 'Humorous', label: 'Humorous', color: 'bg-yellow-500' },
        { id: 'GenZ', label: 'Genz', color: 'bg-lime-500' },
        { id: 'Inspiring', label: 'Inspiring', color: 'bg-purple-500' },
        { id: 'Technical', label: 'Technical', color: 'bg-indigo-500' },
        { id: 'Helpful', label: 'Helpful', color: 'bg-cyan-500' },
        { id: 'Authentic', label: 'Authentic', color: 'bg-pink-500' },
        { id: 'Storytelling', label: 'Storytelling', color: 'bg-orange-500' }
    ];

    const handleToneToggle = (toneId: string) => {
        setSelectedTones(prev => 
        prev.includes(toneId)
            ? prev.filter(id => id !== toneId)
            : [...prev, toneId]
        );
    };

    const handleTimeSlotToggle = (timeSlot: string) => {
        // Don't allow toggling locked time slots
        if (lockedTimeSlots.includes(timeSlot)) {
            return;
        }

        setSelectedTimeSlots(prev => {
            if (prev.includes(timeSlot)) {
                return prev.filter(slot => slot !== timeSlot);
            } else if (prev.length < 5) {
                return [...prev, timeSlot].sort();
            }
            return prev; // Don't add if already at max (5)
        });
    };

    const handleSave = () => {
        setIsSaving(true);
        let url = `${BASE_URL}/api/preferences/update`;

        axios({
            method:"PUT",
            url,
            data: {
                customPrompt,
                selectedTones,
                selectedTimeSlots
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            console.log(response);
            showToast('Preferences saved successfully!', 'success');
        })
        .catch((err) => {
            console.log(err);
            showToast('Failed to save preferences. Please try again.', 'error');
        })
        .finally(() => {
            setIsSaving(false);
        });
    };

    useEffect(() => {
        let url = `${BASE_URL}/api/preferences/get`;

        axios({
            url,
            method:"GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            let preferences = response.data?.data;
            
            // Provide default values if preferences or its properties are undefined
            const timeSlots = preferences?.selectedTimeSlots || [];
            const tones = preferences?.selectedTones || [];
            const prompt = preferences?.customPrompt || customPrompt;
            const available = preferences?.availableTimeSlots || [];
            const locked = preferences?.lockedTimeSlots || [];
            const timeZone = preferences?.timeZone || 'UTC';
            
            setDefaultSlots(timeSlots);
            setSelectedTimeSlots(timeSlots);
            setAvailableTimeSlots(available);
            setLockedTimeSlots(locked);
            setUserTimeZone(timeZone);

            setDefaultTones(tones);
            setSelectedTones(tones);

            setDefaultPrompt(prompt);
            setCustomPrompt(prompt);
        })
        .catch((err) => {
            console.log(err);
            
            if (err.status == 401) {
                navigate('/login');
            }
            setDefaultSlots([]);
            setSelectedTimeSlots([]);
            setDefaultTones([]);
            setSelectedTones([]);
            setDefaultPrompt(customPrompt);
            setAvailableTimeSlots([]);
            setLockedTimeSlots([]);
        })
    },[]);

    const handleReset = () => {
        setCustomPrompt(defaultPrompt);
        setSelectedTones(defaultTones);
        setSelectedTimeSlots(defaultSlots);
    };

    // Helper to check if a time slot is in the past (relative to user's timezone)
    const isTimeSlotInPast = (timeSlot: string) => {
        try {
        // Get current time in user's timezone
        const now = new Date();
        // Convert to user's timezone offset
        const userOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Create a date for today at the given timeSlot in user's timezone
        const [hours, minutes] = timeSlot.split(":").map(Number);
        const today = new Date(now);
        today.setHours(hours, minutes, 0, 0);
        // Use Intl to get the time in user's timezone
        const todayInUserTZ = new Date(
            today.toLocaleString("en-US", { timeZone: userTimeZone })
        );
        const nowInUserTZ = new Date(
            now.toLocaleString("en-US", { timeZone: userTimeZone })
        );
        return todayInUserTZ < nowInUserTZ;
        } catch (e) {
        // Fallback: never disable
        return false;
        }
    };

    return {
        navigate,
        isTimeSlotInPast,
        handleReset,
        handleSave,
        handleTimeSlotToggle,
        handleToneToggle,
        availableTones,
        availableTimeSlots,
        selectedTimeSlots,
        selectedTones,
        lockedTimeSlots,
        isSaving,
    }
};

export default usePreference;