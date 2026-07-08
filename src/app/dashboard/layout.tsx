import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/dashboard/credit-repair", label: "Credit Repair OS" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-white lg:block">
        <div className="border-b border-border px-5 py-4">
          <Link href="/" className="text-sm font-bold text-navy">
            MR.<span className="text-orange">IQ</span>
          </Link>
          <p className="mt-1 text-xs text-muted">Operations Dashboard</p>
        </div>
        <nav className="p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-surface"
            >
              <LayoutDashboard className="h-4 w-4 text-orange" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-white px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] lg:hidden">
          <Link href="/dashboard/credit-repair" className="text-sm font-bold text-navy">
            MR.<span className="text-orange">IQ</span> Dashboard
          </Link>
        </header>
        <div aria-hidden className="h-[calc(3.25rem+env(safe-area-inset-top,0px))] shrink-0 lg:hidden" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
