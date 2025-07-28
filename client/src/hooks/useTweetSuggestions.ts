import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface TweetEntry {
    _id: string;
    time: string;
    content: string;
    starred?: boolean;
    liked?: boolean;
    date: String;
}

interface TweetsByTime {
    [key: string]: TweetEntry[];
}

import axios from "axios";
import BASE_URL from "../config";

const useTweetSuggestions = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'journal' | 'trending'>('journal');
    const [showPreviousDays, setShowPreviousDays] = useState(false);
    const [copiedTweetId, setCopiedTweetId] = useState<string | null>(null);
    const [editingTweetId, setEditingTweetId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState('');
    const [aiEditingTweetId, setAiEditingTweetId] = useState<string | null>(null);
    const [aiEditPrompt, setAiEditPrompt] = useState('');
    const [isAiEditing, setIsAiEditing] = useState(false);
    const [isLoadingTweets, setIsLoadingTweets] = useState(true);
    const [todaysJournalTweets, setTodaysJournalTweets] = useState<TweetsByTime>({});
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const [previousDayOffset, setPreviousDayOffset] = useState(1);
    const [previousDaysJournalTweetsByTime, setPreviousDaysJournalTweetsByTime] = useState<Array<{ date: string, tweetsByTime: TweetsByTime }>>([]);
    const [loadingPrevious, setLoadingPrevious] = useState(false);
    const [previousDaysTrendingTweetsByTime, setPreviousDaysTrendingTweetsByTime] = useState<Array<{ date: string, tweetsByTime: TweetsByTime }>>([]);

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
    
        setIsLoadingTweets(true);
        let url = `${BASE_URL}/api/tweets/get?date=${formattedDate}`;
    
        axios({
          url,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setTodaysJournalTweets(response?.data?.data || {});
        })
        .catch((err) => {
          console.log(err);
          if (err.status == 401) {
            navigate('/login');
          }
        })
        .finally(() => {
          setIsLoadingTweets(false);
        });
    }, []);
    
      // Mock time slots from preferences (would come from backend)
    const userTimeSlots = ['09:00', '13:00', '17:00'];
    
      // Real journal-based tweets organized by time slots from backend
    const todayJournalTweetsByTime = todaysJournalTweets;
    
      // Mock trending-based tweets organized by time slots
    const todayTrendingTweetsByTime: TweetsByTime = {
        '09:00': [
          {
            _id: 'mock-1',
            time: '09:00',
            content: "GitHub's new AI features are getting scary good 🤖\n\nJust saw the latest Copilot updates and wow... the code suggestions are almost telepathic\n\nAre we witnessing the future of development? 🚀\n\n#github #ai #copilot #coding",
            date:"2025-07-05"
          }
        ],
        '13:00': [
          {
            _id: 'mock-2',
            time: '13:00',
            content: "Hot take from today's Hacker News discussion 🔥\n\nWeb frameworks are evolving faster than we can learn them\n\nMaybe it's time to focus on fundamentals over the latest shiny tool?\n\n#webdev #frameworks #hackernews",
            date:"2025-07-05"
          },
          {
            _id: 'mock-3',
            time: '13:00',
            content: "New JavaScript runtime just dropped 📦\n\nPromises 50% faster execution than Node.js\n\nThe performance wars are heating up! 🔥\n\n#javascript #performance #runtime",
            date:"2025-07-05"
          }
        ],
        '17:00': [
          {
            _id: 'mock-4',
            time: '17:00',
            content: "Product Hunt's #1 today: Another no-code tool 📈\n\nThe no-code movement is democratizing software creation\n\nBut as developers, where does this leave us? 🤔\n\nAdaptation is key 💪\n\n#nocode #producthunt #future",
            date:"2025-07-05"
          }
        ]
    };
    
      // Previous days data (empty for now)
    // const previousDaysTrendingTweetsByTime: TweetsByTime = {}; // This line is removed

    const getCurrentTweetsByTime = () => {
        return activeTab === 'journal' ? todayJournalTweetsByTime : todayTrendingTweetsByTime;
    };
    
    const getPreviousTweetsByTime = () => {
        // For backward compatibility, return the array for journal
        return activeTab === 'journal' ? previousDaysJournalTweetsByTime : previousDaysTrendingTweetsByTime;
    };
    
    const handleCopyTweet = (content: string, tweetId: string) => {
        navigator.clipboard.writeText(content);
        setCopiedTweetId(tweetId);
        setTimeout(() => setCopiedTweetId(null), 2000);
    };
    
    const handleEditTweet = (tweetId: string, content: string) => {
        console.log(tweetId)
        setEditingTweetId(tweetId);
        setEditingContent(content);
    };
    
    const getEditingTweetDate = (editingTweetId: string) => {
        if (!editingTweetId) return null;
        for (const time in todaysJournalTweets) {
          const tweet = todaysJournalTweets[time].find(t => t._id === editingTweetId);
          if (tweet) {
            return tweet.date; // Assumes each tweet has a 'date' field
          }
        }
        return null;
    };
    
    const handleSaveEdit = (tweetId: string) => {
        setTodaysJournalTweets((prev) => {
          const updated = { ...prev };
          for (const time in updated) {
            updated[time] = updated[time].map(tweet =>
              tweet._id === tweetId ? { ...tweet, content: editingContent } : tweet
            );
          }
          return updated;
        });
    
        let date = getEditingTweetDate(tweetId);
    
        axios({
          url: `${BASE_URL}/api/tweets/edit`,
          method:"PUT",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          data: { date: date, id: tweetId, content: editingContent }
        })
        .then(response => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    
        setEditingTweetId(null);
        setEditingContent('');
    };
    
    const handleCancelEdit = () => {
        setEditingTweetId(null);
        setEditingContent('');
    };
    
    const handleAiEdit = (tweetId: string) => {
        setAiEditingTweetId(tweetId);
        setAiEditPrompt('');
    };
    
    const handleAiEditSubmit = (tweetId: string) => {
        // Here you would send the AI edit request to backend
        console.log('AI editing tweet:', tweetId, 'with prompt:', aiEditPrompt);
    
        setIsAiEditing(true);
        let date = getEditingTweetDate(tweetId);
        console.log(date);
    
        axios({
          method:"PATCH",
          url: `${BASE_URL}/api/tweets/ai-update/${tweetId}`,
          data:{date: date, prompt: aiEditPrompt},
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          let editedTweet = response.data?.data;
          setTodaysJournalTweets((prev) => {
            const updated = { ...prev };
            for (const time in updated) {
              updated[time] = updated[time].map(tweet =>
                tweet._id === tweetId ? { ...tweet, content: editedTweet } : tweet
              );
            }
            return updated;
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setAiEditingTweetId(null);
          setAiEditPrompt('');
          setIsAiEditing(false);
        })
    };
    
    const handleCancelAiEdit = () => {
        setAiEditingTweetId(null);
        setAiEditPrompt('');
    };
    
    const handleLoadPrevious = async () => {
        setShowPreviousDays(true);
        setLoadingPrevious(true);
        try {
            // Calculate the date for the previous day
            const today = new Date();
            const prevDate = new Date(today);
            prevDate.setDate(today.getDate() - previousDayOffset);
            const yyyy = prevDate.getFullYear();
            const mm = String(prevDate.getMonth() + 1).padStart(2, '0');
            const dd = String(prevDate.getDate()).padStart(2, '0');
            const formattedDate = `${yyyy}-${mm}-${dd}`;

            const url = `${BASE_URL}/api/tweets/get?date=${formattedDate}`;
            const response = await axios({
                url,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = response?.data?.data || {};
            // Append the new day's tweets as a new object in the array
            setPreviousDaysJournalTweetsByTime(prev => [
                ...prev,
                { date: formattedDate, tweetsByTime: data }
            ]);
            setPreviousDayOffset(offset => offset + 1);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingPrevious(false);
        }
    };
    
    const formatTimeSlot = (timeSlot: string) => {
        const [hours, minutes] = timeSlot.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const currentTweetsByTime = getCurrentTweetsByTime();
    const previousTweetsByTime = getPreviousTweetsByTime();

    // Count total tweets for badges
    const currentTotalTweets = Object.values(currentTweetsByTime).reduce((total, tweets) => total + tweets.length, 0);
    const todayJournalTotal = Object.values(todayJournalTweetsByTime).reduce((total, tweets) => total + tweets.length, 0);
    const todayTrendingTotal = Object.values(todayTrendingTweetsByTime).reduce((total, tweets) => total + tweets.length, 0);

    const handleDeleteTweet = (tweetId: string) => {
        setTodaysJournalTweets((prev) => {
        const updated = { ...prev };
        for (const time in updated) {
            updated[time] = updated[time].filter(tweet => tweet._id !== tweetId);
        }
        return updated;
        });

        let date = getEditingTweetDate(tweetId);

        axios({
        url: `${BASE_URL}/api/tweets/delete`,
        method:"DELETE",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: { id: tweetId, date: date }
        })
        .then((response) => {
        console.log(response);
        })
        .catch((err) => {
        console.log(err);
        })

        setMenuOpenId(null);
    };

    return {
        navigate,
        handleSaveEdit,
        handleCancelEdit,
        handleLoadPrevious,
        formatTimeSlot,
        previousTweetsByTime,
        currentTotalTweets,
        todayJournalTotal,
        todayTrendingTotal,
        handleDeleteTweet,
        setActiveTab,
        showPreviousDays,
        copiedTweetId,
        editingContent,
        editingTweetId,
        aiEditingTweetId,
        isAiEditing,
        isLoadingTweets,
        menuOpenId,
        setMenuOpenId,
        userTimeSlots,
        todayJournalTweetsByTime,
        todayTrendingTweetsByTime,
        previousDaysJournalTweetsByTime,
        previousDaysTrendingTweetsByTime,
        getCurrentTweetsByTime,
        getPreviousTweetsByTime,
        handleCopyTweet,
        handleEditTweet,
        handleAiEdit,
        handleAiEditSubmit,
        handleCancelAiEdit,
        setEditingContent,
        aiEditPrompt,
        activeTab,
        setAiEditPrompt,
        currentTweetsByTime,
        loadingPrevious,
        previousDayOffset
    }
};

export default useTweetSuggestions;