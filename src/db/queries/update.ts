import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { humanLanguagesUsersTable, InsertHumanLanguagesToUsers, InsertTechnologiesToUsers, InsertUser, technologiesUsersTable, usersTable } from "../schema";

export async function updateUser(
  user: Partial<InsertUser>,
  technologies: InsertTechnologiesToUsers[],
  humanLanguages: InsertHumanLanguagesToUsers[]) {
  const updateFields: Partial<InsertUser> = {};
  if (user.firstname) updateFields.firstname = user.firstname;
  if (user.surname) updateFields.surname = user.surname;
  if (user.city) updateFields.city = user.city;

  await db.transaction(async (tx) => {
    if (Object.keys(updateFields).length > 0) {
      await tx.update(usersTable)
        .set(updateFields)
        .where(eq(usersTable.id, user.id!));
    }

    const combinedTechnologies = technologies.map((tech) => ({ userId: user.id!, ...tech }));

    if (technologies.length > 0) {
      await tx.insert(technologiesUsersTable)
        .values([...combinedTechnologies])
        .onConflictDoUpdate({
          target: [technologiesUsersTable.userId, technologiesUsersTable.name],
          set: { experience: sql`EXCLUDED.experience` }
        });
    }

    const combinedHumanLanguages = humanLanguages.map((lang) => ({ userId: user.id!, ...lang }));

    if (humanLanguages.length > 0) {
      await tx.insert(humanLanguagesUsersTable)
        .values([...combinedHumanLanguages])
        .onConflictDoUpdate({
          target: [humanLanguagesUsersTable.userId, humanLanguagesUsersTable.name],
          set: { level: sql`EXCLUDED.level` }
        });
    }
  })
}
