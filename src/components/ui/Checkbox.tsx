import type { InputHTMLAttributes, ReactNode } from 'react'
import './Checkbox.css'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

/** 05.11 · CHECKBOX */
export default function Checkbox({
  label,
  className = '',
  ...rest
}: CheckboxProps) {
  return (
    <label className={`checkbox ${className}`.trim()}>
      <input type="checkbox" {...rest} />
      <span className="checkbox__box" aria-hidden="true" />
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  )
}
