import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from '../config';
import { navigate, A } from 'hookrouter';

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
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function LoginPage() {
	const classes = useStyles();

	const handleLogin = async (e) => {
		e.preventDefault();
		const req = await fetch(`${config.server}/login`, {
			method: 'post',
			body: JSON.stringify({
				username: e.target.username.value,
				password: e.target.password.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const users = await req.json();
		sessionStorage.setItem('user', JSON.stringify(users[0]));
		if (users[0].isAdmin) {
			navigate('/admin');
		} else {
			navigate('/');
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
        		</Typography>
				<form className={classes.form} onSubmit={handleLogin}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
        			</Button>
					<Grid container>
						<Grid item>
							<A href="/register">
								{"Don't have an account? Sign Up"}
							</A>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}