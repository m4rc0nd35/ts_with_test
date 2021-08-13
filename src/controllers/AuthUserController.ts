import { Request, Response } from 'express';
import { AuthUserService } from '../services/AuthUserService';

class AuthUserController {

	async handle(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			const user = new AuthUserService();
			const token = await user.execute({
				email,
				password
			});

			res.status(201).send({ token: token });
		} catch (e) {
			res.status(401).send({ message: e.message })
		}
	}
}

export { AuthUserController }