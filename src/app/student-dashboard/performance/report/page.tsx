import TestReport from "@/src/components/student_panel/performance/TestReport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Report | Mentix AI",
  description: "Detailed performance analysis and test results.",
};

export default function ReportPage() {
  return <TestReport />;
}
