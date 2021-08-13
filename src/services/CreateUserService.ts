import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
	name: string;
	password: string;
	email: string;
	admin?: boolean;
}

export class CreateUserService {

	async execute({ name, password, email, admin }: IUserRequest) {
		const userRepositories = getCustomRepository(UsersRepositories, "default");

		if (!email)
			throw new Error("Email incorrect!");

		const userAlreadyExests = await userRepositories.findOne({
			email
		});

		if (userAlreadyExests)
			throw new Error("user already exists!")

		const pwdHash = await hash(password, 8);
		const user = userRepositories.create({
			name,
			password: pwdHash,
			email,
			admin
		});

		await userRepositories.save(user);

		return user;
	}
}