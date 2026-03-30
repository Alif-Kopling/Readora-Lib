import { motion, AnimatePresence } from "motion/react";
import { X, AlertCircle, CheckCircle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "success" | "warning";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "info",
}: ConfirmModalProps) {
  const typeStyles = {
    info: {
      icon: AlertCircle,
      color: "text-blue-600",
      bg: "bg-blue-100",
      button: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/30",
    },
    success: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
      button: "from-green-500 to-green-600",
      shadow: "shadow-green-500/30",
    },
    warning: {
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-100",
      button: "from-orange-500 to-orange-600",
      shadow: "shadow-orange-500/30",
    },
  };

  const style = typeStyles[type];
  const Icon = style.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${style.bg} rounded-lg`}>
                    <Icon className={`w-6 h-6 ${style.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">{message}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 p-6 bg-gray-50 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-4 py-3 bg-gradient-to-r ${style.button} text-white font-semibold rounded-xl shadow-lg ${style.shadow} hover:shadow-xl transition-all duration-200`}
                >
                  {confirmText}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
