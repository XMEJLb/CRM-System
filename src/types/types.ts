export interface Todo {
  id: number
  title: string
  created: string
  isDone: boolean
}

export interface Info {
  all: number
  completed: number
  inWork: number
}

export type Filter = 'all' | 'inWork' | 'completed'

export interface MetaResponse<T, N> {
  data: T[]
  info?: N
  meta: {
    totalAmount: number
  }
}
