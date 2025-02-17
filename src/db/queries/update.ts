import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { humanLanguagesUsersTable, InsertHumanLanguagesToUsers, InsertTechnologiesToUsers, InsertUser, technologiesUsersTable, usersTable } from "../schema";

export async function updateUser(
  user: Partial<InsertUser>,
  technologies: InsertTechnologiesToUsers[],
  humanLanguages: InsertHumanLanguagesToUsers[]) {
  await db.transaction(async (tx) => {
    if (user.firstname && user.surname && user.city) {
      await tx.update(usersTable)
        .set({
          firstname: user.firstname,
          surname: user.surname,
          city: user.city,
        })
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
    // await Promise.allSettled(technologies
    //   .map(async (tech) => {
    //     console.log("New tech", tech);
    //     await tx.insert(technologiesUsersTable)
    //       .values({ userId: user.id!, ...tech })
    //       .onConflictDoUpdate({
    //         target: [technologiesUsersTable.userId, technologiesUsersTable.name],
    //         set: { experience: tech.experience }
    //       });
    //   }));
    //
    // await Promise.allSettled(humanLanguages
    //   .map(async (lang) => {
    //     console.log("New lang", lang);
    //     await tx.insert(humanLanguagesUsersTable)
    //       .values({ userId: user.id!, ...lang })
    //       .onConflictDoUpdate({
    //         target: [humanLanguagesUsersTable.userId, humanLanguagesUsersTable.name],
    //         set: { level: lang.level }
    //       });
    //   }));
  })
}
