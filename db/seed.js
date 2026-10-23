import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const employee = {
      name: faker.person.firstName() + " " + faker.person.lastName(),
      birthday: faker.date.past(),
      salary: faker.number.int({ min: 22000, max: 160000 }),
    };
    await createEmployee(employee);
  }
}
