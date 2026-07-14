import { MaintenancePage } from "@/components/maintenance-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | USRC Tigers Mini Rugby",
  description:
    "USRC Tigers Mini Rugby website is under maintenance. We'll be ready soon!",
  robots: { index: false, follow: false },
};

export default function Maintenance() {
  return <MaintenancePage />;
}
