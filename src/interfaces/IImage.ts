export interface IImage {
  src: string
  alt: string
  className: string
  events?: Record<string, Function>
  key?: number
}
