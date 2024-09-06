/*
  Warnings:

  - You are about to drop the column `group_Task_id` on the `task` table. All the data in the column will be lost.
  - Added the required column `group_task_id` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_group_Task_id_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "group_Task_id",
ADD COLUMN     "group_task_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_group_task_id_fkey" FOREIGN KEY ("group_task_id") REFERENCES "group_task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
