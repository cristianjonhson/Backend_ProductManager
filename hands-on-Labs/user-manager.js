const fs = require('fs').promises;
const path = require('path');

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async createUser(user) {
    const users = await this.readUsersFile();
    const newUser = {
      id: users.length + 1,
      ...user,
    };

    users.push(newUser);
    await this.writeUsersFile(users);

    return newUser;
  }

  async consultUsers() {
    const users = await this.readUsersFile();
    return users;
  }

  async readUsersFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      if (!data.trim()) {
        return []; // Si el archivo está vacío, devolver un array vacío
      }
      return JSON.parse(data) || [];
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.writeUsersFile([]);
        return [];
      }

      throw new Error(`Error al leer el archivo de usuarios: ${error.message}`);
    }
  }


  async writeUsersFile(users) {
    try {
      await fs.mkdir(path.dirname(this.path), { recursive: true });
      await fs.writeFile(this.path, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`Error al escribir en el archivo de usuarios: ${error.message}`);
    }
  }
}

module.exports = UserManager;
