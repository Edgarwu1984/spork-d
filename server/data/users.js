import bcrypt from 'bcryptjs';
const users = [
  {
    username: 'admin',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    picture: 'https://randomuser.me/api/portraits/women/29.jpg',
    isAdmin: true,
  },
  {
    username: 'Hunter Wu',
    email: 'hunter@test.com',
    password: bcrypt.hashSync('123456', 10),
    picture: 'https://randomuser.me/api/portraits/men/95.jpg',
    isAdmin: false,
  },
  {
    username: 'Claire James',
    email: 'claire@test.com',
    password: bcrypt.hashSync('123456', 10),
    picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    isAdmin: false,
  },
];

export default users;
