import uuid from 'uuid/v4';
import crypto from 'crypto';

import db from 'libs/db';

async function checkEmailExist(email, log) {
	try {
		//Find one email
		const account = 'default';
		return account ? true : false;
	}
	catch (err) {
		log.error(err);
		return 500;
	}
}

export function updateAccount(req, res) {

}

export async function deleteAccount(req, res) {
	try {
		return res.json({
			status: 200,
		});
	}
	catch(err) {
		req.app.get('log').error(err);

		return res.status(500).json({
			status: 500,
			error: 'Something went kaputt.',
		});
	}
}

export async function getAccount(req, res) {
	try {
		const identities = 'local';
		res.json({
			status: 200,
			account: {
				id: req.account.id.toString(),
				email: req.account.email || '',
				createdAt: req.account.createdAt,
				hasPassword: req.account.password,
				keyToken: req.account.keyToken,
				identities,
			},
		});
	} catch (err) {
		req.app.get('log').error(err);

		return res.status(500).json({
			status: 500,
			error: 'Something went kaputt.',
		});
	}
}

export function createAccount(req, res) {
	if(!req.body.username) {
		return res.status(400).json({
			status: 400,
			error: 'Username missing.',
		});
	}

	if(!req.body.email) {
		return res.status(400).json({
			status: 400,
			error: 'Email missing.',
		});
	}

	if(!req.body.password) {
		return res.status(400).json({
			status: 400,
			error: 'Password missing.',
		});
	}

	if(req.body.password !== req.body.passwordConfirm) {
		return res.status(400).json({
			status: 400,
			error: 'None matching passwords.',
		});
	}

	const minimumLength = req.app.get('config').security.passwordSecurity.minimumLength;
	if(req.body.password.length < minimumLength) {
		return res.status(400).json({
			status: 400,
			error: `Password must be at least ${minimumLength} characters long.`,
		});
	}

	const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!req.body.email.match(mailFormat)) {
		return res.status(400).json({
			status: 400,
			error: 'Enter a valid email.',
		});
	}

	db.accounts.findOne({
		where:
		{
			account:
			{
				[db.Op.like]: [req.body.username]
			}
		},
	}).then(account => {
		if(account) {
			return res.status(409).json({
				status: 409,
				error: 'Username already in use.',
			});
		}

		account = db.accounts.findOne({
			where:
			{
				email:
				{
					[db.Op.like]: [req.body.email]
				}
			},
		}).then(email => {
			if(email) {
				return res.status(409).json({
					status: 409,
					error: 'Email already in use.',
				});
			}

			const localAuth = req.app.get('config').authentication.providers.find((obj) => obj.id === 'local');
			const requireActivation = localAuth.activationLink;
			let newAccount;
			let token;

			if(requireActivation) {
				token = crypto.createHmac('sha256', req.app.get('config').protocol.signingSecret);
				token.update(uuid());
			}

			db.accounts.create({
				account: req.body.username,
				email: req.body.email,
				password: req.body.password,
				validationToken: requireActivation ? token.digest('hex') : '',
			}).catch(err => {
				if(err) {
					req.app.get('log').error(err);
					return res.status(500).json({
						status: 500,
						error: 'Windows 10 released an update and thus it crashed, sorry.',
						err: err,
					});
				}
			});

			if(!requireActivation) {
				return res.status(203).json({
					status: 203,
					message: 'Your account was created!',
				});
			}
		}).catch(err => {
			if(err) {
				req.app.get('log').error(err);
				return res.status(500).json({
					status: 500,
					error: 'Oops! Email! Maybe Windows 10 is still alive...',
					err: err,
				});
			}
		});

		return account;

	}).catch(err => {
		if(err) {
			req.app.get('log').error(err);
			return res.status(500).json({
				status: 500,
				error: 'Oops! Username! Maybe Windows 10 is still alive...',
				err: err,
			});
		}
	});
}
