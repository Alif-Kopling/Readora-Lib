import { useState, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { MemberTable } from '../../components/members/MemberTable';
import { MemberModal } from '../../components/members/MemberModal';
import { Plus } from 'lucide-react';
import { mockNotifications } from '../../services/notificationService';
import { NotificationPanel } from '../../components/notifications/NotificationPanel';
import { Member } from '../../types';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import usePerpustakaanStore from '../../stores/perpustakaan';

export function MembersManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const {
    anggota: members,
    loading,
    fetchAnggota,
    addAnggota,
    updateAnggota,
    deleteAnggota,
  } = usePerpustakaanStore();

  // Fetch members on mount
  useEffect(() => {
    fetchAnggota();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success('Notification deleted');
  };

  const handleAddMember = async (memberData: Omit<Member, 'id' | 'joinDate'>) => {
    try {
      await addAnggota({
        ...memberData,
        joinDate: new Date().toISOString().split('T')[0],
      });
      toast.success(`${memberData.name} has been added as a new member!`);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to add member. Please try again.');
    }
  };

  const handleDeleteMember = async (id: string) => {
    const member = members.find((m) => m.id === id);
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteAnggota(id);
        toast.success(`${member?.name} has been removed`);
      } catch (error) {
        toast.error('Failed to delete member. Please try again.');
      }
    }
  };

  return (
    <>
      <Layout
        title="Members Management"
        notificationCount={unreadCount}
        onNotificationClick={() => setIsNotificationOpen(true)}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-gray-600">Manage library members</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus className="h-5 w-5" />
            Add Member
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-600">Total Members</p>
            <p className="text-2xl font-bold text-gray-900">{members.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-600">Active Members</p>
            <p className="text-2xl font-bold text-green-600">
              {members.filter((m) => m.status === 'Active').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-gray-600">Inactive Members</p>
            <p className="text-2xl font-bold text-gray-600">
              {members.filter((m) => m.status === 'Inactive').length}
            </p>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <MemberTable members={members} onDelete={handleDeleteMember} />
        </motion.div>

        {/* Modal */}
        <MemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddMember}
        />
      </Layout>

      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDeleteNotification}
      />
    </>
  );
}