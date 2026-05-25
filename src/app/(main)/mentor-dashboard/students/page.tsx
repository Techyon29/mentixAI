import { redirect } from "next/navigation";

export default function StudentsRedirect() {
  redirect("/mentor-dashboard/student-details");
}
