import { and, eq } from "drizzle-orm";
import { db } from "..";
import { humanLanguagesUsersTable, InsertHumanLanguagesToUsers, InsertTechnologiesToUsers, InsertUser, technologiesUsersTable, usersTable } from "../schema";

export async function updateUser(
  user: InsertUser,
  technologies: InsertTechnologiesToUsers[],
  humanLanguages: InsertHumanLanguagesToUsers[]) {
  await db.transaction(async (tx) => {
    // first update user
    // then get all tech
    // do JS filter/map
    // then delete/update matches
    //
    // Or insert if they are 
    // not in database
    await tx.update(usersTable)
      .set({
        firstname: user.firstname,
        surname: user.surname,
        city: user.city,
      })
      .where(eq(usersTable.id, user.id!));

    const existingTech = await tx.select()
      .from(technologiesUsersTable)
      .where(eq(technologiesUsersTable.userId, user.id!))

    technologies
      .filter((tech) => !existingTech.some((t) => t.name === tech.name))
      .map(async (tech) => {
        await tx.delete(technologiesUsersTable)
          .where(
            and(
              eq(technologiesUsersTable.userId, user.id!),
              eq(technologiesUsersTable.name, tech.name)
            )
          )
      });
    technologies
      .filter((tech) => existingTech.some((t) => t.name === tech.name))
      .map(async (tech) => {
        await tx.insert(technologiesUsersTable)
          .values({ userId: user.id!, ...tech })
          .onConflictDoUpdate({
            target: technologiesUsersTable.userId,
            set: { experience: tech.experience }
          });
      });

    const existingHumanLanguages = await tx.select()
      .from(humanLanguagesUsersTable)
      .where(eq(humanLanguagesUsersTable.userId, user.id!));

    humanLanguages
      .filter((lang) => !existingHumanLanguages.some((t) => t.name === lang.name))
      .map(async (lang) => {
        await tx.delete(humanLanguagesUsersTable)
          .where(
            and(
              eq(humanLanguagesUsersTable.userId, user.id!),
              eq(humanLanguagesUsersTable.name, lang.name)
            )
          )
      });

    humanLanguages
      .filter((lang) => existingHumanLanguages.some((t) => t.name === lang.name))
      .map(async (lang) => {
        await tx.insert(humanLanguagesUsersTable)
          .values({ userId: user.id!, ...lang })
          .onConflictDoUpdate({
            target: humanLanguagesUsersTable.userId,
            set: { level: lang.level }
          });
      });
  })
}
