import { useEffect, useState } from 'react';

export default function useAuthHook() {
	const [user, setUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const logout = () => {
		sessionStorage.removeItem('user');
		setIsAuthenticated(false);
		setUser(null);
		setIsAdmin(false);
	}

	useEffect(() => {
		let u = sessionStorage.getItem('user');
		if (!u) {
			setIsAuthenticated(false);
			return;
		} else {
			u = JSON.parse(u); 
			setIsAuthenticated(true);
			setUser(u);
		}
		if (u.isAdmin) {
			setIsAdmin(true);
		} 
	}, []);
	return { isAdmin, isAuthenticated, user, logout };
}