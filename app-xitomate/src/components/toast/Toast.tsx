import { FiCheckCircle, FiXCircle } from 'react-icons/fi'

const style = {
  success: {
    bg: 'bg-[#E6F9F3]',
    border: 'border-[#5EBD6C]',
    icon: <FiCheckCircle className="text-[#5EBD6C] w-5 h-5 shrink-0" />,
  },
  error: {
    bg: 'bg-[#FDECEC]',
    border: 'border-[#E74B6D]',
    icon: <FiXCircle className="text-[#E74B6D] w-5 h-5 shrink-0" />,
  },
}

export default function Toast({
  type,
  message,
}: {
  type: 'success' | 'error'
  message: string
}) {
  return (
    <div
      className={`
        ${style[type].bg}
        ${style[type].border}
        border-l-4
        rounded-lg
        shadow-lg
        px-4
        py-3
        flex
        items-center
        gap-3
        animate-toast-in
        max-w-xs
      `}
    >
      {style[type].icon}
      <span className="text-sm text-gray-800 break-words">{message}</span>
    </div>
  )
}