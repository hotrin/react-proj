import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStore } from 'effector-react';
import { vacationStore } from '../stores/vacations.store';
import useFetchVacations from '../hooks/fetch-vacations.hook';
import AdminVacationCard from '../components/admin-vacation-card';
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
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
}));


export default function AdminHomePage() {
	const classes = useStyles();
	const [loading] = useFetchVacations();
	const vacations = useStore(vacationStore);

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
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							Admin Page
            			</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button onClick={() => navigate('/admin/new-vacation')} variant="contained" color="primary">
										Add Vacation
                  					</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{loading && <div>Loading...</div>}
						{!loading && vacations.map(vacation => (
							<Grid item key={vacation.id} xs={12} sm={6} md={4}>
								<AdminVacationCard vacation={vacation} />
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</React.Fragment>
	);
}