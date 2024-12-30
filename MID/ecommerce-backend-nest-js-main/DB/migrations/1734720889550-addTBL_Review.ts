import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLReview1734720889550 implements MigrationInterface {
    name = 'AddTBLReview1734720889550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" SERIAL NOT NULL, "ratings" integer NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" integer, "productProductId" integer, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_0b1691cd039bba22ef1c12f538a" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_c6b38625b22af78f04fbf423e74" FOREIGN KEY ("productProductId") REFERENCES "Products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_c6b38625b22af78f04fbf423e74"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_0b1691cd039bba22ef1c12f538a"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
