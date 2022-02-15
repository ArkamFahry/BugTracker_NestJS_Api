/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bug" DROP CONSTRAINT "bug_user_id_foreign";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "project_user_id_foreign";

-- DropForeignKey
ALTER TABLE "ProjectUser" DROP CONSTRAINT "projectuser_project_user_foreign";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "tickets_user_id_foreign";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" DATE NOT NULL,
    "update_at" DATE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" INTEGER NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "hashedRt" TEXT,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_unique" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_hash_unique" ON "users"("hash");

-- CreateIndex
CREATE INDEX "user_name_email_phone_index" ON "users"("name", "email", "phone");

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "bug_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "project_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectUser" ADD CONSTRAINT "projectuser_project_user_foreign" FOREIGN KEY ("project_user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "tickets_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
