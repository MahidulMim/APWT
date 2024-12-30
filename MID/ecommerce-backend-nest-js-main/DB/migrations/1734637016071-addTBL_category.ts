import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLCategory1734637016071 implements MigrationInterface {
    name = 'AddTBLCategory1734637016071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("category_id" SERIAL NOT NULL, "title" character varying NOT NULL, "short_description" character varying NOT NULL, "long_description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addedByUserId" integer, CONSTRAINT "PK_51615bef2cea22812d0dcab6e18" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_a694f5d21bd805e0431292a5a5b" FOREIGN KEY ("addedByUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_a694f5d21bd805e0431292a5a5b"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
