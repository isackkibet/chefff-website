import { redirect } from "next/navigation";

// "Experiences" in the nav maps to the private chef service
export default function ExperiencesPage() {
  redirect("/services/private-chef");
}
