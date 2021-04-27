import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumnDate1619540948636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn('book', 'date', 'startDate');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.renameColumn('book', 'startDate', 'date');
    }

}
