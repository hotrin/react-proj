 import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import config from '../config';
import useAuthHook from '../hooks/auth.hook';
import { navigate } from 'hookrouter';

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

export default function VacationCard(props) {
	const classes = useStyles();
	const { vacation } = props;
	const { isAuthenticated, user, setUser } = useAuthHook();
	
	if (!isAuthenticated) {
		navigate('/login');
	}

	const follow = async () => {
		await fetch(`${config.server}/vacation/${vacation.id}/follow`, {
			method: 'put',
			body: JSON.stringify({
				userId: user.id,
				following: [...new Set([...user.following, vacation.id])]
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let newFollowing = [...new Set([...user.following, vacation.id])]
		user.following = newFollowing;
		setUser({ ...user, following: newFollowing });
		sessionStorage.setItem('user', JSON.stringify(user));
	}

	const unfollow = async () => {
		let following = user.following.splice(0);
		let index = following.findIndex(vid => vid === vacation.id);
		following.splice(index, 1);
		await fetch(`${config.server}/vacation/${vacation.id}/unfollow`, {
			method: 'put',
			body: JSON.stringify({
				userId: user.id,
				following
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		user.following = following;
		setUser({ ...user, following });
		sessionStorage.setItem('user', JSON.stringify(user));
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
				</Typography>
			</CardContent>
			<CardActions>
				{user && !user.following.includes(vacation.id) &&
					<Button onClick={follow} size="small" color="primary">
						Follow
					</Button>
				}
				{user && user.following.includes(vacation.id) &&
					<Button onClick={unfollow} size="small" color="secondary">
						UnFollow
					</Button>
				}
			</CardActions>
		</Card>
	);
}