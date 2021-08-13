import 'reflect-metadata';
import request from "supertest";
import { app } from "../src/app";
import { createConnection } from 'typeorm';

describe("Integretion test user", () => {
	let init = false;
	beforeEach(async () => {
		if (!init) {
			await createConnection();
			init = true;
		}
	});
	
	it("Deve criar um usuário", async () => {
		const result = await request(app)
			.post("/user")
			.set('Accept', 'application/json')
			.send({
				name: "Marcos teaeae",
				email: "dev@devcloud.com.br",
				password: "321654",
				admin: true
			})
			.expect('Content-Type', /json/)
			.expect(201)

		expect(result.body).toHaveProperty("id");
		expect(result.body).toHaveProperty("created_at");
		expect(result.body).toHaveProperty("update_at");
	});
	
	it("Não deve criar um usuário 400", async () => {
		const result = await request(app)
			.post("/user")
			.set('Accept', 'application/json')
			.send({
				name: "Marcos teaeae",
				email: "dev@devcloud.com.br",
				password: "321654",
				admin: true
			})
			.expect('Content-Type', /json/)
			.expect(400)

		expect(result.body).not.toHaveProperty("id");
		expect(result.body).not.toHaveProperty("created_at");
		expect(result.body).not.toHaveProperty("update_at");
	});
});