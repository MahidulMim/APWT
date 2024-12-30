import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLOrders3TableUpdated1734800864046 implements MigrationInterface {
    name = 'AddTBLOrders3TableUpdated1734800864046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Products" ADD CONSTRAINT "FK_3e5294dc2cb8d41a42c85a3abaf" FOREIGN KEY ("userUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP CONSTRAINT "FK_3e5294dc2cb8d41a42c85a3abaf"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6a4ebad71685a4ed11e89b3e834"`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userUserId"`);
    }

}
