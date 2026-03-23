import { useState } from 'react';
import { Layout } from '../../../components/layout/Layout';
import { MemberTable } from '../../../components/members/MemberTable';
import { MemberModal } from '../../../components/members/MemberModal';
import { Plus } from 'lucide-react';
import { mockMembers as initialMembers } from '../../../services/mockData';
import { Member } from '../../../types';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function AnggotaList() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMember = (memberData: Omit<Member, 'id' | 'joinDate'>) => {
    const newMember: Member = {
      ...memberData,
      id: (members.length + 1).toString(),
      joinDate: new Date().toISOString().split('T')[0],
    };
    setMembers([...members, newMember]);
    toast.success(`${memberData.name} has been added as a new member!`);
  };

  const handleDeleteMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter((member) => member.id !== id));
      toast.success(`${member?.name} has been removed`);
    }
  };

  return (
    <Layout title="Members Management">
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
            className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-glass border border-white/20 dark:border-white/10 p-4 hover:shadow-premium transition-all duration-300"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Members</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{members.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-glass border border-white/20 dark:border-white/10 p-4 hover:shadow-premium transition-all duration-300"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active Members</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {members.filter((m) => m.status === 'Active').length}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/50 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-glass border border-white/20 dark:border-white/10 p-4 hover:shadow-premium transition-all duration-300"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Inactive Members</p>
            <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
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
  );
}
