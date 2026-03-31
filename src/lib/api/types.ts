export type Result<T> =
  | {
      success: true
      data: T
    }
  | { success: false; data: null }
