import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { v4 as uudi} from "uuid";

interface IUserRequest {
	email: string;
	password: string;
}

export class AuthUserService {

	async execute({ email, password }: IUserRequest) {
		const userRepositorier = getCustomRepository(UsersRepositories, "default");
		const user = await userRepositorier.findOne({
			email
		});

		if (!user)
			throw new Error("Email/Password incorrect!");
			
		const userMatch = await compare(password, user.password);

		if (!userMatch)
			throw new Error("Email/Password incorrect!");

		const token = sign(
			{
				email: user.email,
				name: user.name
			},
			"123456",
			{
				expiresIn: "1m",
				subject: user.id.toString(),
				jwtid: uudi()
			}
		);
		return token;
	}
}