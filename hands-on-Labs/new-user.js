const UserManager = require('../hands-on-Labs/user-manager');

const userManager = new UserManager('Usuarios.json');

const newUser = {
  Nombre: 'John',
  Apellido: 'Doe',
  Edad: 25,
  Curso: 'Programación',
};

userManager.createUser(newUser);

const users = userManager.consultUsers();
