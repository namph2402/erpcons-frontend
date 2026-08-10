import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import './Field.css'

export interface FieldProps {
  label: ReactNode
  /** Gắn dấu * đỏ theo 05.3 (* Required field) */
  required?: boolean
  /** Dòng gợi ý dưới ô nhập — 05.6 Helper Text */
  hint?: ReactNode
  /** Thông báo lỗi — thay chỗ hint và đổi màu viền */
  error?: ReactNode
  htmlFor?: string
  className?: string
  children: ReactNode
}

/** 05.3 · DATA ENTRY FORM — khối label + control + helper dùng chung */
export default function Field({
  label,
  required = false,
  hint,
  error,
  htmlFor,
  className = '',
  children,
}: FieldProps) {
  return (
    <div className={`field${error ? ' is-error' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={htmlFor}>
        {label}
        {required && <span className="field__req">*</span>}
      </label>
      {children}
      {(error || hint) && (
        <p className={error ? 'field__error' : 'field__hint'}>{error ?? hint}</p>
      )}
    </div>
  )
}

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>

/** 05.4 · INPUT TYPES — ô nhập chuẩn (text / number / date / datetime-local) */
export function TextInput({ className = '', ...rest }: TextInputProps) {
  return <input className={`input ${className}`.trim()} {...rest} />
}

/** 05.4 · INPUT TYPES — Textarea */
export function TextArea({
  className = '',
  rows = 3,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`input input--area ${className}`.trim()} rows={rows} {...rest} />
}
