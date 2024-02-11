const fs = require('fs').promises;

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async createUser(user) {
    try {
      const users = await this.readUsersFile();
      user.id = users.length + 1;
      users.push(user);
      await this.writeUsersFile(users);
      console.log('Usuario creado con éxito:', user);
    } catch (error) {
      console.error('Error al crear usuario:', error.message);
    }
  }

  async consultUsers() {
    try {
      const users = await this.readUsersFile();
      console.log('Usuarios consultados:', users);
      return users;
    } catch (error) {
      console.error('Error al consultar usuarios:', error.message);
      return [];
    }
  }

  async readUsersFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      if (!data.trim()) {
        return []; // Si el archivo está vacío, devolver un array vacío
      }
      return JSON.parse(data) || [];
    } catch (error) {
      throw new Error(`Error al leer el archivo de usuarios: ${error.message}`);
    }
  }
  

  async writeUsersFile(users) {
    try {
      await fs.writeFile(this.path, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`Error al escribir en el archivo de usuarios: ${error.message}`);
    }
  }
}

module.exports = UserManager;