import { Elysia, t } from "elysia";
import { db } from "./db/index";
import { usersTable } from "./db/schema";

const app = new Elysia()
  // GET: Fetch all users
  .get("/users", async () => {
    return await db.select().from(usersTable);
  })

  // POST: Create a new user (Replacing your main() function)
  .post("/users", async ({ body }) => {
    const newUser = await db.insert(usersTable).values(body).returning();
    return {
      message: "User created successfully!",
      user: newUser[0]
    };
  }, {
    // Optional: Validation to ensure name, age, and email are present
    body: t.Object({
      name: t.String(),
      age: t.Number(),
      email: t.String({ format: 'email' })
    })
  })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);