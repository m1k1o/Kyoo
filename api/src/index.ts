import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "./db";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { movies } from "./controllers/movies";
import jwt from "@elysiajs/jwt";

await migrate(db, { migrationsSchema: "kyoo", migrationsFolder: "./drizzle" });

if (process.env.SEED) {
}

let secret = process.env.JWT_SECRET;
if (!secret) {
	const auth = process.env.AUTH_SERVER ?? "http://auth:4568";
	try {
		const ret = await fetch(`${auth}/info`);
		const info = await ret.json();
		secret = info.publicKey;
	} catch (error) {
		console.error(`Can't access auth server at ${auth}:\n${error}`);
	}
}

if (!secret) {
	console.error("Missing jwt secret or auth server. exiting");
	process.exit(1);
}

const app = new Elysia()
	.use(jwt({ secret }))
	.use(swagger())
	.get("/", () => "Hello Elysia")
	.use(movies)
	.listen(3000);

console.log(`Api running at ${app.server?.hostname}:${app.server?.port}`);
