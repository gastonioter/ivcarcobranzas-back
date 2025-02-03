export interface APIResponse<T> {
  data: T;
  message: string;
  status: "error" | "success";
}
