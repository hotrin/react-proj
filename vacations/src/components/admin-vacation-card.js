import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'hookrouter';
import dayjs from 'dayjs';
import { deleteVacationEffect } from '../stores/vacations.store';

const useStyles = makeStyles(theme => ({
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
	}
}));

export default function AdminVacationCard(props) {
	const classes = useStyles();
	const { vacation } = props;

	const handleDelete = async () => {
		await deleteVacationEffect(vacation.id);
	}
	
	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.cardMedia}
				image={vacation.picture ? vacation.picture : "https://source.unsplash.com/random"}
				title={vacation.destination}
			/>
			<CardContent className={classes.cardContent}>
				<Typography gutterBottom variant="h5" component="h2">
					{vacation.destination}
				</Typography>
				<Typography component="div">
					<div>From: {dayjs(vacation.fromDate).format('DD-MM-YYYY')}</div>
					<div>To: {dayjs(vacation.toDate).format('DD-MM-YYYY')}</div>
					<div>Price: ${vacation.price}</div>
					<div>Followers: {vacation.followers}</div>
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={() => navigate(`/admin/vacation/${vacation.id}`)} size="small" color="primary">
					Edit
				</Button>
				<Button onClick={handleDelete} color="secondary">
					Delete
				</Button>
			</CardActions>
		</Card>
	);
}