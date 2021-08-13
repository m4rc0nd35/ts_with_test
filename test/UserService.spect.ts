import { AuthUserService } from "../src/services/AuthUserService";
import { createConnection } from 'typeorm';
import { CreateUserService } from "../src/services/CreateUserService";

describe("Users Services", () => {
	const objUser = {
		name: "Jean Marcondes",
		email: "engenharia@artmachine.com.br",
		password: "123654",
		admin: false
	}

	let init = false;
	beforeEach(async () => {
		if (!init) {
			await createConnection();
			init = true;
		}
	});

	it("Deve criar um usuário!", async () => {
		const createUserService = new CreateUserService();
		const user = await createUserService.execute(objUser)
		expect(user).toHaveProperty("id");
		expect(user.email).toBe(objUser.email);
		expect(user).toHaveProperty("update_at");
		expect(user).toHaveProperty("created_at");
	});

	it("Não deve criar um usuário existente!", async () => {
		const createUserService = new CreateUserService();
		await expect(createUserService.execute(objUser)).rejects.toEqual(new Error("user already exists!"));
	});

	it("Deve autenticar o usuário!", async () => {
		const authUserService = new AuthUserService();
		const user = await authUserService.execute(objUser);
		expect(user.split('.')).toHaveLength(3)
	});
	
	it("Não deve autenticar o usuário!", async () => {
		const authUserService = new AuthUserService();
		objUser.password = "123";
		await expect(authUserService.execute(objUser)).rejects.toEqual(new Error("Email/Password incorrect!"));
	});
});