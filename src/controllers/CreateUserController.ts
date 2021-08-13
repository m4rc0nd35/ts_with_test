import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {

	async handle(req: Request, res: Response) {
		const { name, password, email, admin } = req.body;
		const createUserService = new CreateUserService();

		try {
			const user = await createUserService.execute({ name, password, email, admin });
			return res.status(201).json(user);
		} catch (err) {
			return res.status(400).send({ message: err.message });
		}
	}
}

export { CreateUserController };