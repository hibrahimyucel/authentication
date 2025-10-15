import sql from "mssql";
import { sendEmail } from "../email";
import { hashSync } from "bcrypt-ts";

const mmbisConn = await sql.connect(`${process.env.MMBISDATABASE}`);

type signUpData = {
  username: string;
  email: string;
  password: string;
};

export async function checkeMail(value: string) {
  const sqlSelectUser: string = `select * from auth_user where email = @email`;

  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  request.input("email", sql.VarChar(100), value.trim());
  const result = await request.query(sqlSelectUser);

  return result.recordset.length > 0;
}
export async function sendPassword(email: string) {
  const sqlGetPassword = `select cast (round(rand()*1000000,6) as varchar(6)) as value`;
  const sqlUpdatePassword = `update auth_user set password = @password WHERE email = @email`;
  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  const resPwd = await request.query(sqlGetPassword);
  const password = hashSync(resPwd.recordset[0].value);

  request.input("email", sql.VarChar(100), email.trim());
  request.input("password", sql.VarChar(100), password.trim());
  await request.query(sqlUpdatePassword);

  const success = await sendEmail({
    name: "",
    email: email,
    subject: "Muhasip e-posta onay kodu",
    description: `Muhasip kayıt-şifre işleminizi tamamlamak için onay kodunuz : <b> ${resPwd.recordset[0].value}<b>`,
  });

  return success;
}
export async function sendeMailVerify(value: string) {
  const sqlDeleteVerify: string = `DELETE auth_verify WHERE expiresAt<=GETDATE() or email = @email`;
  const sqlInsertVerify = `INSERT auth_verify
select @email as email, cast (round(rand()*1000000,6) as varchar(6)) as value,
DATEADD(minute,5, GETDATE()) as expiresAt`;
  const sqlSelectVerify: string = `select value from auth_verify WHERE expiresAt>=GETDATE() and email = @email`;
  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  request.input("email", sql.VarChar(100), value.trim());
  await request.query(sqlDeleteVerify);
  await request.query(sqlInsertVerify);
  const result = await request.query(sqlSelectVerify);

  const success = await sendEmail({
    name: "",
    email: value,
    subject: "Muhasip e-posta onay kodu",
    description: `Muhasip kayıt-şifre işleminizi tamamlamak için onay kodunuz : <b> ${result.recordset[0].value}<b>`,
  });

  return success;
}

export async function checkeMailVerify(email: string, value: string) {
  const sqlSelectVerify: string = `select * from auth_verify WHERE expiresAt>=GETDATE() and email = @email and value = @value`;

  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  request.input("email", sql.VarChar(100), email.trim());
  request.input("value", sql.VarChar(100), value.trim());

  const result = await request.query(sqlSelectVerify);

  return result.rowsAffected[0] > 0;
}
export async function signUpDB(value: signUpData) {
  const sqlInsertUser: string = `INSERT INTO auth_user (name,email,password) VALUES (@name,@email,@password)`;

  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  request.input("name", sql.VarChar(100), value.username.trim());
  request.input("email", sql.VarChar(100), value.email.trim());
  request.input("password", sql.VarChar(100), value.password);
  const result = await request.query(sqlInsertUser);

  return result;
}

export async function signInDB(value: signUpData) {
  const sqlSelectUser: string = `SELECT * FROM auth_user where email = @email`;

  if (!mmbisConn.connected) await mmbisConn.connect();
  const request = mmbisConn.request();

  request.input("email", sql.VarChar(100), value.email);

  const result = await request.query(sqlSelectUser);

  return result.recordset;
}
