import { GenericForwardRefInterface } from '../../interfaces'

export interface SectionNavInterface {
  title: string
  key: string
  customNavigate?: Function | undefined | void
}

export interface SectionNavRefInterface
  extends Omit<SectionNavInterface, 'title'> {
  ref: React.RefObject<GenericForwardRefInterface>
  usePinParent?: boolean
  extraHeight?: number
  heightOffsetPercentage?: number
}
