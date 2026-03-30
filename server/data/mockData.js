import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// In-memory database
export const db = {
  users: [],
  books: [],
  loans: [],
};

// Hash password for admin and student accounts
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Initialize mock data
export const initializeData = async () => {
  console.log('📦 Initializing mock database...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  db.users.push({
    id: uuidv4(),
    nama: 'Admin Readora',
    email: 'admin@readora.com',
    password: adminPassword,
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
  });

  // Create student users (with generic usernames for easy login)
  const student1Password = await hashPassword('student123');
  db.users.push({
    id: uuidv4(),
    nama: 'Ahmad Rizki',
    email: 'ahmad@student.com',
    password: student1Password,
    role: 'USER',
    createdAt: new Date().toISOString(),
  });

  const student2Password = await hashPassword('student123');
  db.users.push({
    id: uuidv4(),
    nama: 'Siti Nurhaliza',
    email: 'siti@student.com',
    password: student2Password,
    role: 'USER',
    createdAt: new Date().toISOString(),
  });

  // Generic student account for easy testing
  const genericStudentPassword = await hashPassword('student123');
  db.users.push({
    id: uuidv4(),
    nama: 'Student User',
    email: 'student@student.com',
    password: genericStudentPassword,
    role: 'USER',
    createdAt: new Date().toISOString(),
  });

  // Create sample books
  db.books.push(
    {
      id: uuidv4(),
      judul: 'Belajar JavaScript Modern',
      penulis: 'John Doe',
      stok: 5,
      kategori: 'Programming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      judul: 'Laskar Pelangi',
      penulis: 'Andrea Hirata',
      stok: 3,
      kategori: 'Fiction',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      judul: 'Bumi Manusia',
      penulis: 'Pramoedya Ananta Toer',
      stok: 4,
      kategori: 'Fiction',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      judul: 'Clean Code',
      penulis: 'Robert C. Martin',
      stok: 2,
      kategori: 'Programming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      judul: 'Filosofi Teras',
      penulis: 'Henry Manampiring',
      stok: 6,
      kategori: 'Self Development',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      judul: 'Atomic Habits',
      penulis: 'James Clear',
      stok: 8,
      kategori: 'Self Development',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  );

  console.log(`✓ Created ${db.users.length} users`);
  console.log(`✓ Created ${db.books.length} books`);
  console.log('✅ Mock database initialized successfully!');
  console.log('\n📝 Test Accounts:');
  console.log('   Admin: admin@readora.com / admin123');
  console.log('   Student: student@student.com / student123 (generic)');
  console.log('   Student: ahmad@student.com / student123');
  console.log('   Student: siti@student.com / student123\n');
};

export default db;
