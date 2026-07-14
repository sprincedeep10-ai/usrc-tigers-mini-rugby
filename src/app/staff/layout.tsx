import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Panel | USRC Tigers Mini Rugby",
  robots: { index: false, follow: false },
};

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
