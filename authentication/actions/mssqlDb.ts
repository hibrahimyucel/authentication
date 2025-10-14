import sql from "mssql";

const mmbisConn = await sql.connect(`${process.env.MMBISDATABASE}`);

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

  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  request.input("name", sql.VarChar(100), value.username);
  request.input("email", sql.VarChar(100), value.email);
  request.input("password", sql.VarChar(100), value.password);
  const resultUser = await request.query(sqlInsertUser);

  request.input("fk_user", sql.Int, resultUser.recordset[0].Id);
  const resultAccount = await request.query(sqlInsertAccount);
  return resultAccount;
}

export async function signInDB(value: signUpData) {
  const sqlSelectAccount: string = `SELECT pk_account
      ,fk_user
      ,providerId
      ,accountId
      ,accessToken
      ,refreshToken
      ,accessTokenExpiredAt
      ,refreshTokenExpiredAt
      ,password
  FROM auth_account where accountId = @accountId
`;

  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  request.input("accountId", sql.VarChar(100), value.email);

  const result = await request.query(sqlSelectAccount);
  return result.recordset;
}
