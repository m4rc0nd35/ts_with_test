import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addPassword1626732821327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"Users",
			new TableColumn(	{
				name: 'created_at',
				type: 'timestamp',
				default: "now()"
			})
		)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("Users", "password");
    }
}
