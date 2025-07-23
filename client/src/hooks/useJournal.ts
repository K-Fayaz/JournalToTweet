import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

interface Journal {
    _id:string,
    time:string,
    content:string
}

import axios from "axios";
import BASE_URL from "../config";

const useJournal = () => {
    const { date } = useParams<{ date: string }>();
    const navigate = useNavigate();
    const [journalEntry, setJournalEntry] = useState('');
    const [todaysJournal,setTodaysJournal] = useState<Journal[]>([])
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    // Parse the date from URL
    const selectedDate = date ? new Date(date) : new Date();
    
    // Check if it's today
    const isToday = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);
        return selected.getTime() === today.getTime();
    };

    // Check if it's a past date (before today)
    const isPastDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);
        return selected < today;
    };

    const getJournalsForDate = () => {
        return todaysJournal;
    };

    const handleJournalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!journalEntry.trim()) return;
    
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const id = Date.now().toString();
        
        let url = `${BASE_URL}/api/journal/add`;

        let payload = {
        date: date,
        journal: journalEntry
        }

        axios({
        method:"POST",
        url,
        data: payload,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then((response) => {
        console.log(response);

        let newEntry = {
            _id: response.data?.entry._id,
            time: response.data?.entry.time,
            content: response.data?.entry.content
        }

        setTodaysJournal((prev) => [
            newEntry,
            ...prev
        ]);
        })
        .catch((err) => {
        console.log(err);
        if (err.status == 401) {
            navigate('/login');
        }
        })

        setJournalEntry('');
    };

    useEffect(() => {
        let url = `${BASE_URL}/api/journal/get?date=${date}`;

        axios({
        method:"GET",
        url,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then((response) => {
            let data = response.data?.journal?.entries || [];
            setTodaysJournal(data);
        })
        .catch(err => {
            if (err.status == 401) {
                navigate('/login');
            }
            console.log(err);
        })
    },[]);

    const journals = getJournalsForDate();

    // Edit journal entry
    const handleEdit = (journal: Journal) => {
        setEditId(journal._id);
        setEditContent(journal.content);
        setMenuOpenId(null);
    };

    const handleEditSave = (journal: Journal) => {
        let url = `${BASE_URL}/api/journal/update?date=${date}&id=${journal._id}`

        axios({
        url,
        method:"PATCH",
        data: { content: editContent },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then((response) => {
        console.log(response);
        setTodaysJournal((prev) => prev.map(j => j._id === journal._id ? { ...j, content: editContent } : j));
        setEditId(null);
        setEditContent('');
        })
        .catch((err) => {
        console.log(err);
        })
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditContent('');
    };

    // Delete journal entry
    const handleDelete = (journal: Journal) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        setTodaysJournal((prev) => prev.filter(j => j._id !== journal._id));

        let url = `${BASE_URL}/api/journal/delete?date=${date}&id=${journal._id}`;
        
        axios({
        method:"DELETE",
        url,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        })
        .then((response) => {
        console.log(response);
        })
        .catch((err) => {
        console.log(err);
        })
    };
    return {
        navigate,
        selectedDate,
        setMenuOpenId,
        setJournalEntry,
        setEditContent,
        journalEntry,
        todaysJournal,
        menuOpenId,
        editId,
        editContent,
        isToday,
        isPastDate,
        getJournalsForDate,
        handleJournalSubmit,
        journals,
        handleEdit,
        handleEditSave,
        handleEditCancel,
        handleDelete
    }
}

export default useJournal;