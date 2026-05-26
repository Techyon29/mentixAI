import Settings from "@/src/components/mentor_panel/settings/Settings";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading settings...</div>}>
      <Settings />
    </Suspense>
  );
}

