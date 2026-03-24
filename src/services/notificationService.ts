// Notification Service
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Book Overdue',
    message: 'The Hobbit is overdue by Michael Johnson',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '2',
    title: 'New Member',
    message: 'David Wilson has joined the library',
    type: 'success',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '3',
    title: 'Book Returned',
    message: 'The Great Gatsby has been returned by David Wilson',
    type: 'info',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '4',
    title: 'Low Stock Alert',
    message: 'Fiction category has only 2 available books',
    type: 'warning',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '5',
    title: 'System Update',
    message: 'Readora updated successfully',
    type: 'success',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];
