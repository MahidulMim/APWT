import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLPRODUCTS1734646119400 implements MigrationInterface {
    name = 'AddTBLPRODUCTS1734646119400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Products" ("product_id" SERIAL NOT NULL, "title" character varying NOT NULL, "short_description" character varying NOT NULL, "long_description" character varying NOT NULL, "price" numeric(10,2) NOT NULL DEFAULT '0', "stock" character varying NOT NULL, "images" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addedByUserId" integer, "categoryCategoryId" integer, CONSTRAINT "PK_6f8a5f1d7d708767d6945192758" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_7f211f4a83399038a4f709497d3" FOREIGN KEY ("addedByUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_8211b4790474e39bf9880805b7c" FOREIGN KEY ("categoryCategoryId") REFERENCES "categories"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_8211b4790474e39bf9880805b7c"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_7f211f4a83399038a4f709497d3"`);
        await queryRunner.query(`DROP TABLE "Products"`);
    }

}
