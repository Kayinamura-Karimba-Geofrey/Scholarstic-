import bcrypt from 'bcryptjs';

export const hashPassword = async (pwd) => {
  return await bcrypt.hash(pwd, 10);
}

export const comparePassword = async (pwd, hashedPassword) => {
  return await bcrypt.compare(pwd, hashedPassword);
}