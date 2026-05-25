import TestFlowContainer from "@/src/components/student_panel/assessments/TestFlowContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Assessment | Mentix AI",
  description: "Secure assessment environment for Mentix AI tests.",
};

export default function AssessmentTestPage() {
  return <TestFlowContainer />;
}
