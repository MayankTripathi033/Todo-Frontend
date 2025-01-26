import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return null; // This will never render as redirect takes control
}
