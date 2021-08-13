import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1625785062870 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "Users",
				columns: [
					{
						name: "id",
						type: "int4",
						isNullable: true,
						generationStrategy: "increment",
						isPrimary: true,
						isGenerated: true
					},
					{
						name: "name",
						type: "varchar",
						length: "60"
					},
					{
						name: "email",
						type: "varchar",
						length: "60"
					},
					{
						name: "admin",
						type: "boolean",
						default: false
					},
					{
						name: "password",
						type: "varchar",
						isNullable: true,
						default: "123"
					},
					{
						name: "update_at",
						type: "timestamp",
						default: "now()"
					}
				],
				// foreignKeys: [
				// 	{
				// 		name: "FK_User_Image",
				// 		referencedTableName: "Users",
				// 		referencedColumnNames: ["id"],
				// 		columnNames: ["Images"],
				// 		onDelete:"SET NULL",
				// 		onUpdate: "SET NULL"
				// 	}
				// ]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("Users");
	}

}
