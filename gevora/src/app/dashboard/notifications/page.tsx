import { BellRing, TrendingDown, MessageSquare, CalendarClock } from "lucide-react";

const notifications = [
  {
    icon: TrendingDown,
    title: "Price drop",
    detail: "House in Nugegoda dropped from Rs 32 Mn to Rs 29.5 Mn",
    time: "2 hours ago",
  },
  {
    icon: MessageSquare,
    title: "New message",
    detail: "Nadeesha Perera replied to your enquiry about a Rajagiriya apartment",
    time: "5 hours ago",
  },
  {
    icon: CalendarClock,
    title: "Viewing reminder",
    detail: "Your scheduled viewing in Battaramulla is tomorrow at 10:00 AM",
    time: "1 day ago",
  },
  {
    icon: BellRing,
    title: "New property",
    detail: "3 new listings match your saved search \"Apartments in Colombo 05\"",
    time: "2 days ago",
  },
];

export default function NotificationsPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Notifications</h1>
      <p className="mt-1 text-ink/60">Price drops, new matches, and messages from agents.</p>

      <div className="mt-6 space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-3 rounded-xl border border-mist bg-paper p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
              <n.icon size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{n.title}</p>
              <p className="text-sm text-ink/65">{n.detail}</p>
              <p className="mt-1 text-xs text-ink/40">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
