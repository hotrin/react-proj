import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { editVacationEffect } from '../stores/vacations.store';
import { navigate } from 'hookrouter';
import useFetchVacation from '../hooks/fetch-vacation.hook';
import dayjs from 'dayjs';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));


export default function EditVacationPage(props) {
	const classes = useStyles();
	const { id } = props;
	const [vacation, loading] = useFetchVacation(id);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { destination, fromDate, toDate, price, picture } = e.target;
		await editVacationEffect({
			destination: destination.value,
			fromDate: fromDate.value,
			toDate: toDate.value,
			price: price.value,
			picture: picture.value,
			id
		});
		navigate('/admin');
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Vacation
        		</Typography>
				{loading && <div>Loading</div>}
				{!loading &&
					<form onSubmit={handleSubmit} className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<TextField
									autoComplete="destination"
									name="destination"
									variant="outlined"
									required
									defaultValue={vacation.destination} 
									fullWidth
									id="destination"
									label="Destination"
									autoFocus
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									type="date"
									required
									fullWidth
									defaultValue={dayjs(vacation.fromDate).format('YYYY-MM-DD')}
									id="fromDate"
									label="From"
									name="fromDate"
									autoComplete="fromDate"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									variant="outlined"
									type="date"
									required
									fullWidth
									defaultValue={dayjs(vacation.fromDate).format('YYYY-MM-DD')}
									id="toDate"
									label="To"
									name="toDate"
									autoComplete="toDate"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									fullWidth
									defaultValue={vacation.picture}
									name="picture"
									label="Image"
									type="text"
									id="picture"
									autoComplete="picture"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									defaultValue={vacation.price}
									fullWidth
									name="price"
									label="Price"
									type="number"
									id="price"
									autoComplete="price"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Save
          			</Button>
					</form>
				}</div>
		</Container>
	);
}