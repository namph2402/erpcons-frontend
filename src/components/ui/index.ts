/** Barrel export cho toàn bộ UI primitives của ERPCons Design System */
export { default as Icon } from './Icon'
export type { IconProps, IconSize } from './Icon'

export { default as Button } from './Button'
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button'

export { default as Card } from './Card'
export type { CardProps } from './Card'

export { default as Badge } from './Badge'
export type { BadgeProps, BadgeTone } from './Badge'
export { STATUS_TONE } from './statusTone'

export { default as StatCard } from './StatCard'
export type { StatCardProps, StatTone, TrendDirection } from './StatCard'

export { default as BarChart } from './BarChart'
export type { BarChartProps, BarSeries } from './BarChart'

export { default as GaugeChart } from './GaugeChart'
export type { GaugeChartProps, GaugeSegment } from './GaugeChart'

export { default as WordCloud } from './WordCloud'
export type { WordCloudProps, CloudWord } from './WordCloud'

export { default as ProgressBar } from './ProgressBar'
export type { ProgressBarProps } from './ProgressBar'

export { default as Avatar } from './Avatar'
export type { AvatarProps } from './Avatar'
export { initialsOf, avatarColorOf } from '../../utils/name'

export { default as AvatarGroup } from './AvatarGroup'
export type { AvatarGroupProps } from './AvatarGroup'

export { default as Tabs } from './Tabs'
export type { TabsProps, TabItem } from './Tabs'

export { default as DataTable } from './DataTable'
export type { DataTableProps, Column } from './DataTable'

export { default as SearchInput } from './SearchInput'
export type { SearchInputProps } from './SearchInput'

export { default as DonutChart } from './DonutChart'
export type { DonutChartProps, DonutSlice } from './DonutChart'

export { default as LineChart } from './LineChart'
export type { LineChartProps, LineSeries } from './LineChart'

export { default as Checkbox } from './Checkbox'
export type { CheckboxProps } from './Checkbox'

export { default as Select } from './Select'
export type { SelectProps, SelectOption } from './Select'

export { default as EmptyState } from './EmptyState'
export type { EmptyStateProps } from './EmptyState'

export { default as Modal } from './Modal'
export type { ModalProps, ModalSize } from './Modal'

export { default as Field, TextInput, TextArea } from './Field'
export type { FieldProps, TextInputProps } from './Field'

export { default as Rating } from './Rating'
export type { RatingProps } from './Rating'
