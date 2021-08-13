import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

// case changed: yarn typeorm schema:sync
@Entity("Users")
export class Users {

	@PrimaryGeneratedColumn({zerofill: true})
	readonly id: number;

	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	admin: boolean;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	update_at: Date;

	// constructor() {
	// 	if (!this.id)
	// 		this.id = uuid();
	// }
}
