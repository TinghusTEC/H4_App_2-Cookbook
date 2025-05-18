import { getPool } from '../db/Database';
import { CreateUserDto, UserInfo, AuthUserModel } from '../models/AuthUserModel';

export const getUserById = async (id: string): Promise<UserInfo | null> => {
  const pool = getPool();
  const result = await pool.query(
    `
    SELECT id, display_name
    FROM users
    WHERE id = $1;
    `,
    [id]
  );
  return result.rows[0] || null;
};

export const getAllUsers = async (): Promise<UserInfo[]> => {
    const pool = getPool();
    const result = await pool.query(
      `
      SELECT id, display_name
      FROM users
      ORDER BY created_at DESC;
      `
    );
    return result.rows;
  };

  export const getUserByEmail = async (email: string): Promise<UserInfo | null> => {
    const pool = getPool();
    const result = await pool.query(
      `
      SELECT id, display_name
      FROM users
      WHERE normalized_email = $1;
      `,
      [email.toLowerCase()]
    );
    return result.rows[0] || null;
  };

export const createUser = async (user: CreateUserDto): Promise<UserInfo> => {
  const pool = getPool();
  const result = await pool.query(
    `
    INSERT INTO users (email, normalized_email, display_name, normalized_display_name, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, display_name;
    `,
    [
      user.email,
      user.email.toLowerCase(),
      user.displayName,
      user.displayName.toLowerCase(),
      user.password,
    ]
  );
  return result.rows[0];
};

export const updateUser = async (id: string, user: Partial<CreateUserDto>): Promise<UserInfo> => {
  const pool = getPool();
  const fields = [];
  const values = [];
  let index = 1;

  if (user.email) {
    fields.push(`email = $${index}, normalized_email = $${index + 1}`);
    values.push(user.email, user.email.toLowerCase());
    index += 2;
  }
  if (user.displayName) {
    fields.push(`display_name = $${index}, normalized_display_name = $${index + 1}`);
    values.push(user.displayName, user.displayName.toLowerCase());
    index += 2;
  }
  if (user.password) {
    fields.push(`password = $${index}`);
    values.push(user.password);
    index += 1;
  }

  values.push(id);

  const result = await pool.query(
    `
    UPDATE users
    SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $${index}
    RETURNING id, display_name;
    `,
    values
  );
  return result.rows[0];
};

export const deleteUser = async (id: string): Promise<void> => {
  const pool = getPool();
  await pool.query(
    `
    DELETE FROM users
    WHERE id = $1;
    `,
    [id]
  );
};