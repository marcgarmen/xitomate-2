import { EtiquetaProps } from './Etiqueta.types'

const colorMap = {
  default: 'bg-gray-200 text-black',
  success: 'bg-green-200 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-200 text-red-800',
  info: 'bg-blue-200 text-blue-800',
}

export default function Etiqueta({ text, color = 'default' }: EtiquetaProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colorMap[color]}`}>
      {text}
    </span>
  )
}