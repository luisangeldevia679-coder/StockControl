


export const findAllUsers = async () => {
    const query = await db.query("SELECT * FROM users");
    return query.rows;
}


export const findUserById = async (id) => {
    const query = await db.query("SELECT * FROM users WHERE id ", [id]);
    return query.rows[0];
}

export const createUser = async (user) => {
    const { name, email, password } = user;
    const query = await db.query("INSERT INTO users (name, email, password) ", [name, email, password]);
    return query.rows[0];
}
export const updateUser = async (id, user) => {
    const { name, email, password } = user;
    const query = await db.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);
    return query.rows[0];
}

export const deleteUser = async (id) => {
    const query = await db.query("DELETE FROM users WHERE id *", [id]);
    return query.rows[0];
}       


