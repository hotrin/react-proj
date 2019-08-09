import { useEffect, useState } from 'react';
import config from '../config';

export default function useFetchVacation(id) {
	const [loading, setLoading] = useState(true);
	const [vacation, setVacation] = useState();
	useEffect(() => { 
		const fetchVacations = async () => {
			const req = await fetch(`${config.server}/vacations/${id}`);
			const json = await req.json();
			setVacation(json[0]);
			setLoading(false);
		}
		fetchVacations();
	}, []);
	return [vacation, loading];
}