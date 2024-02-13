import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1701877180526 implements MigrationInterface {
  name = "Initial1701877180526";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body\` text NOT NULL, \`completed\` tinyint NOT NULL DEFAULT 0, \`deleted\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`todo\``);
  }
}
