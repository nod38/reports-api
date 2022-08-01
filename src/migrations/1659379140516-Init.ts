import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1659379140516 implements MigrationInterface {
    name = 'Init1659379140516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answer" ("answer_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying(300) NOT NULL, "timestamp" integer NOT NULL, "report_id" uuid, CONSTRAINT "PK_26e548d2b73776a764f14c2d107" PRIMARY KEY ("answer_id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("report_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(300) NOT NULL, "lastName" character varying(300) NOT NULL, "upload_finished" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_1bdd9ab86f1a920d365961cb28c" PRIMARY KEY ("report_id"))`);
        await queryRunner.query(`CREATE TABLE "attachment" ("attachment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file" character varying(300) NOT NULL, "timestamp" integer NOT NULL, "report_id" uuid, CONSTRAINT "PK_31d5367aee6b3ad16c69cce1cde" PRIMARY KEY ("attachment_id"))`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_7bf383744d722c5d0455053d00b" FOREIGN KEY ("report_id") REFERENCES "report"("report_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_8a8a70f50ea6b610687c880a750" FOREIGN KEY ("report_id") REFERENCES "report"("report_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_8a8a70f50ea6b610687c880a750"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_7bf383744d722c5d0455053d00b"`);
        await queryRunner.query(`DROP TABLE "attachment"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "answer"`);
    }

}
