import sql from "mssql";

const mmbisConn = await sql.connect(`${process.env.MMBISDATABASE}`);
export async function mssqlQuery(query: string) {
  if (!mmbisConn.connected) await mmbisConn.connect();

  const request = mmbisConn.request();
  const result = await request.query(query);
  console.log(query, result.recordset);

  return result.recordset;
}

type signUpData = {
  username: string;
  email: string;
  password: string;
};

export async function signUpDB(value: signUpData) {
  const sqlInsertUser: string = `INSERT INTO auth_user (name, email) VALUES (@name,@email)
  Select SCOPE_IDENTITY() as Id`;
  const sqlInsertAccount: string = `INSERT INTO auth_account 
  (fk_user, providerId, accountId, password)
VALUES (@fk_user,'email',@email,@password)`;

  const Conn = await sql.connect(`${process.env.MMBISDATABASE}`);
  const request = Conn.request();

  request.input("name", sql.VarChar(100), value.username);
  request.input("email", sql.VarChar(100), value.email);
  request.input("password", sql.VarChar(100), value.password);

  const result = await request.query(sqlInsertUser);
  request.input("fk_user", sql.Int, result.recordset[0].Id);
  const resultL = await request.query(sqlInsertAccount);
  console.log(resultL);
}
