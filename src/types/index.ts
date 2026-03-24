// Type definitions for the Library Management System

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'Available' | 'Borrowed';
}

export interface Member {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export interface Transaction {
  id: string;
  bookId: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  borrowDate: string;
  returnDate: string | null;
  status: 'Borrowed' | 'Returned' | 'Overdue';
}

export interface DashboardStats {
  totalBooks: number;
  availableBooks: number;
  totalMembers: number;
  activeTransactions: number;
}
