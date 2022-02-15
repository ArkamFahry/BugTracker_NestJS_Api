-- CreateTable
CREATE TABLE "Bug" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "sevierity" VARCHAR(255) NOT NULL,
    "issue_created" DATE NOT NULL,
    "issue_closed" DATE NOT NULL,

    CONSTRAINT "Bug_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectUser" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "project_user" INTEGER NOT NULL,

    CONSTRAINT "ProjectUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "bug_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created" DATE NOT NULL,
    "closed" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "sevierity" VARCHAR(255) NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created_at" DATE NOT NULL,
    "update_at" DATE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" INTEGER NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "hasshedRt" INTEGER,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bug_Index" ON "Bug"("name", "type", "description", "sevierity", "issue_created", "issue_closed");

-- CreateIndex
CREATE INDEX "project_name_type_description_index" ON "Project"("name", "type", "description");

-- CreateIndex
CREATE INDEX "tickets_Index" ON "Tickets"("created", "closed", "description", "type", "sevierity", "progress");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_unique" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_hash_unique" ON "User"("hash");

-- CreateIndex
CREATE INDEX "user_name_email_phone_index" ON "User"("name", "email", "phone");

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "bug_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bug" ADD CONSTRAINT "bug_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "project_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectUser" ADD CONSTRAINT "projectuser_project_id_foreign" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectUser" ADD CONSTRAINT "projectuser_project_user_foreign" FOREIGN KEY ("project_user") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "tickets_bug_id_foreign" FOREIGN KEY ("bug_id") REFERENCES "Bug"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "tickets_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
