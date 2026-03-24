export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  coverUrl: string;
  isbn: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
}

export interface BorrowedBook {
  id: string;
  book: Book;
  borrowDate: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'due-soon';
}

export interface StudentStats {
  borrowedBooks: number;
  dueThisWeek: number;
  totalHistory: number;
  overdueBooks: number;
}

export const studentInfo = {
  name: "Alex Johnson",
  id: "STU-2024-1234",
  email: "alex.johnson@university.edu",
};

export const studentStats: StudentStats = {
  borrowedBooks: 3,
  dueThisWeek: 1,
  totalHistory: 24,
  overdueBooks: 0,
};

export const allBooks: Book[] = [
  {
    id: "1",
    title: "The Art of Computer Programming",
    author: "Donald Knuth",
    category: "Computer Science",
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    isbn: "978-0201896831",
    available: true,
    totalCopies: 3,
    availableCopies: 2,
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    isbn: "978-0132350884",
    available: true,
    totalCopies: 5,
    availableCopies: 3,
  },
  {
    id: "3",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    isbn: "978-0262033848",
    available: false,
    totalCopies: 4,
    availableCopies: 0,
  },
  {
    id: "4",
    title: "Design Patterns",
    author: "Gang of Four",
    category: "Software Engineering",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    isbn: "978-0201633610",
    available: true,
    totalCopies: 2,
    availableCopies: 1,
  },
  {
    id: "5",
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Database",
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    isbn: "978-0078022159",
    available: true,
    totalCopies: 3,
    availableCopies: 2,
  },
  {
    id: "6",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell",
    category: "AI & Machine Learning",
    coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
    isbn: "978-0136042594",
    available: true,
    totalCopies: 4,
    availableCopies: 3,
  },
  {
    id: "7",
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    category: "Operating Systems",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    isbn: "978-1118063330",
    available: true,
    totalCopies: 3,
    availableCopies: 1,
  },
  {
    id: "8",
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Networking",
    coverUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop",
    isbn: "978-0132126953",
    available: true,
    totalCopies: 2,
    availableCopies: 2,
  },
  {
    id: "9",
    title: "Compilers: Principles, Techniques, and Tools",
    author: "Alfred V. Aho",
    category: "Computer Science",
    coverUrl: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop",
    isbn: "978-0321486814",
    available: false,
    totalCopies: 2,
    availableCopies: 0,
  },
  {
    id: "10",
    title: "Machine Learning Yearning",
    author: "Andrew Ng",
    category: "AI & Machine Learning",
    coverUrl: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&h=600&fit=crop",
    isbn: "978-0999382906",
    available: true,
    totalCopies: 5,
    availableCopies: 4,
  },
  {
    id: "11",
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    category: "Software Engineering",
    coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    isbn: "978-0135957059",
    available: true,
    totalCopies: 3,
    availableCopies: 2,
  },
  {
    id: "12",
    title: "Head First Design Patterns",
    author: "Eric Freeman",
    category: "Software Engineering",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    isbn: "978-0596007126",
    available: true,
    totalCopies: 4,
    availableCopies: 3,
  },
];

export const borrowedBooks: BorrowedBook[] = [
  {
    id: "b1",
    book: {
      id: "2",
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Software Engineering",
      coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      isbn: "978-0132350884",
      available: false,
      totalCopies: 5,
      availableCopies: 2,
    },
    borrowDate: "2024-03-10",
    dueDate: "2024-04-10",
    status: "active",
  },
  {
    id: "b2",
    book: {
      id: "4",
      title: "Design Patterns",
      author: "Gang of Four",
      category: "Software Engineering",
      coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      isbn: "978-0201633610",
      available: false,
      totalCopies: 2,
      availableCopies: 0,
    },
    borrowDate: "2024-03-15",
    dueDate: "2024-03-28",
    status: "due-soon",
  },
  {
    id: "b3",
    book: {
      id: "6",
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
      category: "AI & Machine Learning",
      coverUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
      isbn: "978-0136042594",
      available: false,
      totalCopies: 4,
      availableCopies: 2,
    },
    borrowDate: "2024-03-05",
    dueDate: "2024-04-05",
    status: "active",
  },
];

export const categories = [
  "All Categories",
  "Computer Science",
  "Software Engineering",
  "Database",
  "AI & Machine Learning",
  "Operating Systems",
  "Networking",
];
