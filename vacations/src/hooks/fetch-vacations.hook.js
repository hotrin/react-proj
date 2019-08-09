import { useEffect, useState } from 'react';
import { fetchVacationsEffect } from '../stores/vacations.store';

export default function useFetchVacations() {
	const [loading, setLoading] = useState(true);
	useEffect(() => { 
		const fetchVacations = async () => {
			await fetchVacationsEffect();
		}
		fetchVacationsEffect.done.watch(() => setLoading(false));
		fetchVacations();
	}, []);
	return [loading];
}