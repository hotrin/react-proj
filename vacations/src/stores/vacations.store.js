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

export const deleteVacationEffect = createEffect('deletes a vacaction', {
	handler: async (id) => {
		await fetch(`${config.server}/vacations/${id}`, {
			method: 'delete',
		});
		return id;
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
vacationStore.on(fetchVacationsEffect.done, (state, results) => {
	console.log(results);
	return results.result
});
vacationStore.on(deleteVacationEffect.done, (state, { result }) => {
	const newState = state.splice(0);
	let index = newState.findIndex(vacation => vacation.id === result);
	newState.splice(index, 1);
	return newState;
});
