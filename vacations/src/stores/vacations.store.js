import { createStore, createEffect } from 'effector';
import config from '../config';

export const vacationStore = createStore([]);

export const fetchVacationsEffect = createEffect('get the vacations', {
	handler: async () => {
		const req = await fetch(`${config.server}/vacations`);
		return req.json();
	}
});

export const addVacationEffect = createEffect('add a vacation', {
	handler: async (data) => {
		const req = await fetch(`${config.server}/vacations`, {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return req.json();
	}
});

export const editVacationEffect = createEffect('add a vacation', {
	handler: async (data) => {
		const req = await fetch(`${config.server}/vacations/${data.id}`, {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return req.json();
	}
});

addVacationEffect.done.watch(res => console.log(res));

vacationStore.on(fetchVacationsEffect.done, (state, results) => {
	console.log(results);
	return results.result
});
