import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const style = {
  success: {
    bg: 'bg-[#EAF4E1]',
    border: 'border-[#A1C374]',
    icon: <FiCheckCircle className="text-[#A1C374] w-5 h-5 shrink-0" />,
  },
  error: {
    bg: 'bg-[#FDEBEC]',
    border: 'border-[#F45E62]',
    icon: <FiXCircle className="text-[#F45E62] w-5 h-5 shrink-0" />,
  },
};

export default function Toast({ type, message }: { type: 'success' | 'error'; message: string }) {
  return (
    <div
      className={`${style[type].bg} ${style[type].border} border-l-4 rounded-lg shadow-lg px-4 py-3 flex gap-3 animate-toast-in max-w-xs`}
    >
      {style[type].icon}
      <span className="text-sm text-gray-800 break-words">{message}</span>
    </div>
  );
}