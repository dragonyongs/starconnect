// useFetchUser.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFetchUser = (userId) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {

            // console.log('사용자 정보 로드');
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const updateUser = async (updatedUser) => {
        try {
            const response = await fetch(`/api/users/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Network response was not ok: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            await response.json();
        } catch (error) {
            setError(error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            // console.log('deleteUser', userId);

            const response = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate('/');
        } catch (error) {
            setError(error);
        }
    };

    return { user, loading, error, updateUser, deleteUser, setUser };
};

export default useFetchUser;
