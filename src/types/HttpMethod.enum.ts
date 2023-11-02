export type HttpMethod =
  | "connect"
  | "options"
  | "delete"
  | "patch"
  | "trace"
  | "head"
  | "post"
  | "get"
  | "put";

export const HTTP_METHODS: { [key in HttpMethod]: HttpMethod } = {
  connect: "connect",
  options: "options",
  delete: "delete",
  patch: "patch",
  trace: "trace",
  head: "head",
  post: "post",
  get: "get",
  put: "put",
};
