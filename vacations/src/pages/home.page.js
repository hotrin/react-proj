import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useFetchVacations from '../hooks/fetch-vacations.hook';
import { useStore } from 'effector-react';
import { vacationStore } from '../stores/vacations.store';
import VacationCard from '../components/vacation-card';
import useAuthHook from '../hooks/auth.hook';
import { navigate } from 'hookrouter';

const useStyles = makeStyles(theme => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	}
}));

export default function Album() {
	const classes = useStyles();
	const { isAuthenticated } = useAuthHook();
	const [loading] = useFetchVacations();
	const vacations = useStore(vacationStore);
	
	if (!isAuthenticated) {
		navigate('/login');
	}
	
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar>
					<CameraIcon className={classes.icon} />
					<Typography variant="h6" color="inherit" noWrap>
						Vacation Page
         		 	</Typography>
				</Toolbar>
			</AppBar>
			<main>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{loading && <div>Loading...</div>}
						{!loading && vacations.map(vacation => (
							<Grid item key={vacation.id} xs={12} sm={6} md={4}>
								<VacationCard vacation={vacation} />
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</React.Fragment>
	);
}