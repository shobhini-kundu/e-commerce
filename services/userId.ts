// services/userId.ts
export function getUserId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("userId");
  if (!id) {
    // id = crypto.randomUUID();
    id = "a21164af-97d2-4bd5-ab35-bc602125f722";
    localStorage.setItem("userId", id);
  }
  return id;
}