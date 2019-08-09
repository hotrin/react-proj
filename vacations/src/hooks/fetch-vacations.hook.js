import { useEffect, useState } from 'react';
import { fetchVacationsEffect } from '../stores/vacations.store';

export default function useFetchVacations(okToLoad = true) {
	const [loading, setLoading] = useState(true);
	useEffect(() => { 
		const fetchVacations = async () => {
			await fetchVacationsEffect();
		}
		fetchVacationsEffect.done.watch(() => setLoading(false));
		if (okToLoad) {
			fetchVacations();
		} else {
			setLoading(false);
		}
	}, []);
	return [loading ];
}