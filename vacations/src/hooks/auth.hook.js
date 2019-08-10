import { useEffect, useState } from 'react';

export default function useAuthHook() {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const logout = () => {
		sessionStorage.removeItem('user');
		setIsAuthenticated(false);
		setUser(null);
		setIsAdmin(false);
	}

	useEffect(() => {
		let u = sessionStorage.getItem('user');
		if (!u) {
			setIsAdmin(false);
			setIsAuthenticated(false);
			return;
		} else {
			u = JSON.parse(u); 
			setIsAuthenticated(true);
			if (u.following === null) {
				u.following = [];
			}
			setUser(u);
		}
		setIsAdmin(u.isAdmin);
	}, []);
	return { isAdmin, isAuthenticated, user, logout, setUser };
}