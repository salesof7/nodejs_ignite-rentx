import { AppDataSource } from "..";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

async function create() {
  const id = uuidv4();
  const password = await hash("admin", 8);

  await AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
    VALUES (
      '${id}',
      'admin',
      'admin@rentx.com.br',
      '${password}',
      true,
      'now()',
      'XXXXXX'
    )`
  );
}

AppDataSource.initialize().then(async () => {
  await create().then(() => {
    console.log("User admin created!");
    AppDataSource.destroy();
  });
});
