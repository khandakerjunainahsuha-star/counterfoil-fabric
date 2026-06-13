import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Settings2,
  ShoppingCart,
  Package,
  Tag,
  CreditCard,
  Users,
  BarChart3,
  FileText,
  Layers,
  Plug,
  UserCog,
  Bell,
  Cog,
  LifeBuoy,
  Calendar,
  Clock,
  Trash2,
  ArrowLeft,
  Minus,
  Plus,
  Circle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Counterfoil Go POS — Multi-Sport Venues" },
      {
        name: "description",
        content:
          "Point of sale for multi-sport venues: book turf, padel, cricket nets and more with live availability.",
      },
      { property: "og:title", content: "Counterfoil Go POS — Multi-Sport Venues" },
      {
        property: "og:description",
        content:
          "Point of sale for multi-sport venues: book turf, padel, cricket nets and more with live availability.",
      },
    ],
  }),
  component: POS,
});

/* ---------------- Sidebar ---------------- */

const navOperate = [
  { label: "Operate", icon: Settings2 },
  { label: "POS", icon: ShoppingCart, active: true },
  { label: "Catalog", icon: Package },
  { label: "Promotions", icon: Tag },
  { label: "Payments", icon: CreditCard },
  { label: "Customers", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Reports", icon: FileText },
];

const navGeneral = [
  { label: "Verticals", icon: Layers },
  { label: "Integrations", icon: Plug },
  { label: "Team", icon: UserCog },
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Cog },
  { label: "Support", icon: LifeBuoy },
];

function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-[#F9FAFB] border-r border-gray-200 flex flex-col">
      <div className="px-5 py-5 flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gray-900" />
        <span className="text-base font-semibold text-gray-900 tracking-tight">
          Counterfoil
        </span>
      </div>
      <nav className="px-3 pb-6 overflow-y-auto">
        <NavSection items={navOperate} />
        <div className="text-xs uppercase tracking-wider text-gray-400 mt-6 mb-2 px-3">
          General
        </div>
        <NavSection items={navGeneral} />
      </nav>
    </aside>
  );
}

function NavSection({
  items,
}: {
  items: { label: string; icon: typeof Settings2; active?: boolean }[];
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <li key={it.label}>
            <button
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                it.active
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-600 hover:bg-gray-100/60"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1 text-left">{it.label}</span>
              {it.active && <span className="w-1.5 h-1.5 rounded-full bg-gray-900" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------- BT badge ---------------- */

function BTBadge({ code }: { code: string }) {
  return (
    <span className="bg-violet-100 text-violet-700 text-xs font-medium px-2 py-0.5 rounded-full">
      {code}
    </span>
  );
}

/* ---------------- Data ---------------- */

type Sport = {
  id: string;
  emoji: string;
  name: string;
  resourceCount: number;
  resourceLabel: string;
  price: number;
};

const SPORTS: Sport[] = [
  { id: "football", emoji: "⚽", name: "5-a-side Football", resourceCount: 3, resourceLabel: "pitches", price: 65 },
  { id: "padel", emoji: "🎾", name: "Padel", resourceCount: 2, resourceLabel: "courts", price: 40 },
  { id: "cricket", emoji: "🏏", name: "Cricket Nets", resourceCount: 4, resourceLabel: "lanes", price: 25 },
  { id: "basketball", emoji: "🏀", name: "Basketball", resourceCount: 1, resourceLabel: "court", price: 35 },
  { id: "hockey", emoji: "🏑", name: "Hockey", resourceCount: 2, resourceLabel: "pitches", price: 55 },
  { id: "badminton", emoji: "🏸", name: "Badminton", resourceCount: 3, resourceLabel: "courts", price: 20 },
];

type CourtId = "A" | "B";
const COURTS: {
  id: CourtId;
  name: string;
  type: string;
  price: number;
  status: "available" | "booked";
  statusLabel: string;
}[] = [
  { id: "A", name: "Padel Court A", type: "Outdoor", price: 40, status: "available", statusLabel: "Available now" },
  { id: "B", name: "Padel Court B", type: "Covered", price: 45, status: "booked", statusLabel: "Booked until 3:00 PM" },
];

// Timeline blocks per court (hour floats 8..22)
const BOOKINGS: Record<CourtId, [number, number][]> = {
  A: [
    [8, 10.5],
    [14, 15.5],
  ],
  B: [
    [8, 15],
    [18, 20],
  ],
};

const DAYS = [
  { d: "Thu", n: 12 },
  { d: "Fri", n: 13 },
  { d: "Sat", n: 14 },
  { d: "Sun", n: 15 },
  { d: "Mon", n: 16 },
  { d: "Tue", n: 17 },
  { d: "Wed", n: 18 },
];

/* ---------------- Sport tile ---------------- */

function SportTile({
  sport,
  selected,
  onClick,
}: {
  sport: Sport;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left bg-white border rounded-xl p-5 transition-all ${
        selected
          ? "border-violet-400 bg-violet-50 shadow-sm"
          : "border-gray-200 hover:border-violet-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl leading-none">{sport.emoji}</div>
        <BTBadge code="BT-04" />
      </div>
      <div className="mt-4 text-base font-medium text-gray-900">{sport.name}</div>
      <div className="text-sm text-gray-500 mt-0.5">
        {sport.resourceCount} {sport.resourceLabel}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-sm font-medium text-gray-900">${sport.price}/hr</div>
        <div className="text-xs text-gray-400">
          {selected ? "Selected" : "Tap to book"}
        </div>
      </div>
    </button>
  );
}

/* ---------------- Availability Timeline ---------------- */

function Timeline({
  court,
  startHour,
  duration,
  onChange,
}: {
  court: CourtId;
  startHour: number;
  duration: number;
  onChange: (start: number) => void;
}) {
  const START = 8;
  const END = 22;
  const total = END - START;
  const bookings = BOOKINGS[court];

  const hourMarks = useMemo(
    () => Array.from({ length: total + 1 }, (_, i) => START + i),
    [total]
  );

  const pct = (h: number) => ((h - START) / total) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const hour = START + (x / rect.width) * total;
    // snap to 0.5
    const snapped = Math.round(hour * 2) / 2;
    const clamped = Math.min(END - duration, Math.max(START, snapped));
    // avoid overlapping a booking
    const overlaps = bookings.some(([s, e]) => clamped < e && clamped + duration > s);
    if (!overlaps) onChange(clamped);
  };

  return (
    <div>
      <div
        className="relative h-12 rounded-lg bg-white border border-gray-200 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {/* booked segments */}
        {bookings.map(([s, e], i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 bg-gray-300 flex items-center justify-center"
            style={{ left: `${pct(s)}%`, width: `${pct(e) - pct(s)}%` }}
          >
            <span className="text-[10px] font-medium text-gray-600">Booked</span>
          </div>
        ))}
        {/* selected range */}
        <div
          className="absolute top-0 bottom-0 bg-violet-500 flex items-center justify-between px-1"
          style={{
            left: `${pct(startHour)}%`,
            width: `${pct(startHour + duration) - pct(startHour)}%`,
          }}
        >
          <div className="w-1 h-6 rounded-full bg-white/80" />
          <span className="text-[11px] font-semibold text-white">
            {fmtTime(startHour)}–{fmtTime(startHour + duration)}
          </span>
          <div className="w-1 h-6 rounded-full bg-white/80" />
        </div>
      </div>
      {/* axis */}
      <div className="relative h-5 mt-1">
        {hourMarks
          .filter((_, i) => i % 2 === 0)
          .map((h) => (
            <span
              key={h}
              className="absolute -translate-x-1/2 text-[10px] text-gray-400"
              style={{ left: `${pct(h)}%` }}
            >
              {fmtHour(h)}
            </span>
          ))}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        15 min changeover buffer applied after each booking
      </p>
    </div>
  );
}

function fmtHour(h: number) {
  const hr = Math.floor(h);
  const m = h % 1 === 0 ? "00" : "30";
  const period = hr >= 12 ? "PM" : "AM";
  const display = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
  return `${display}${m === "00" ? "" : ":" + m}${period.toLowerCase()}`;
}

function fmtTime(h: number) {
  const hr = Math.floor(h);
  const m = h % 1 === 0 ? "00" : "30";
  const period = hr >= 12 ? "PM" : "AM";
  const display = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
  return `${display}:${m} ${period}`;
}

function fmtRange(h: number) {
  const hr = Math.floor(h);
  const m = h % 1 === 0 ? "00" : "30";
  return `${String(hr).padStart(2, "0")}:${m}`;
}

/* ---------------- Config Panel ---------------- */

type CartItem = {
  id: string;
  bt?: string;
  name: string;
  vertical?: string;
  price: number;
  qty: number;
  date?: string;
  time?: string;
  meta?: string;
};

function PadelConfig({
  onAdd,
  onBack,
}: {
  onAdd: (items: CartItem[]) => void;
  onBack: () => void;
}) {
  const [court, setCourt] = useState<CourtId>("A");
  const [day, setDay] = useState(2); // Sat
  const [start, setStart] = useState(16); // 4:00 PM
  const [duration, setDuration] = useState(2);
  const [ballHire, setBallHire] = useState(false);
  const [rackets, setRackets] = useState(2);
  const [racketHire, setRacketHire] = useState(true);

  const courtData = COURTS.find((c) => c.id === court)!;
  const basePrice = courtData.price * duration;
  const addons =
    (ballHire ? 5 : 0) + (racketHire ? 8 * rackets : 0);
  const total = basePrice + addons;

  const addToCart = () => {
    const items: CartItem[] = [
      {
        id: crypto.randomUUID(),
        bt: "BT-04",
        name: courtData.name,
        vertical: "Multi-Sport Venues",
        price: basePrice,
        qty: 1,
        date: `2026-06-${String(DAYS[day].n).padStart(2, "0")}`,
        time: `${fmtRange(start)}–${fmtRange(start + duration)} · ${duration} hrs Padel`,
      },
    ];
    if (ballHire) {
      items.push({
        id: crypto.randomUUID(),
        name: "Ball Hire",
        price: 5,
        qty: 1,
      });
    }
    if (racketHire) {
      items.push({
        id: crypto.randomUUID(),
        name: `Racket Hire × ${rackets}`,
        price: 8 * rackets,
        qty: 1,
      });
    }
    onAdd(items);
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <button
        onClick={onBack}
        className="text-sm text-gray-500 inline-flex items-center gap-1 hover:text-gray-900"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Padel</h2>
          <BTBadge code="BT-04" />
          <BTBadge code="BT-05" />
        </div>
        <span className="text-xs text-gray-500">Step 1 of 5</span>
      </div>

      {/* Step 1: Court */}
      <Section title="Resource selection">
        <div className="grid grid-cols-2 gap-3">
          {COURTS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCourt(c.id)}
              className={`text-left border rounded-xl p-4 transition-all ${
                court === c.id
                  ? "border-violet-400 bg-violet-50"
                  : "border-gray-200 hover:border-violet-300"
              }`}
            >
              <div className="text-sm font-medium text-gray-900">{c.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {c.type} · ${c.price}/hr
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <Circle
                  size={8}
                  className={
                    c.status === "available"
                      ? "fill-green-500 text-green-500"
                      : "fill-amber-500 text-amber-500"
                  }
                />
                <span className="text-xs text-gray-600">{c.statusLabel}</span>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Step 2: Date */}
      <Section title="Date">
        <div className="flex gap-2 flex-wrap">
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => setDay(i)}
              className={`px-3 py-2 rounded-lg border text-center min-w-[58px] transition ${
                day === i
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"
              }`}
            >
              <div className="text-[10px] uppercase tracking-wide opacity-80">
                {d.d}
              </div>
              <div className="text-sm font-semibold">{d.n}</div>
            </button>
          ))}
        </div>
      </Section>

      {/* Step 3: Timeline */}
      <Section
        title={`${courtData.name} · Saturday ${DAYS[day].n} June`}
      >
        <Timeline
          court={court}
          startHour={start}
          duration={duration}
          onChange={setStart}
        />
      </Section>

      {/* Step 4: Time inputs */}
      <Section title="Time">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Start">
            <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900">
              {fmtTime(start)}
            </div>
          </Field>
          <Field label="Duration">
            <div className="flex items-center justify-between px-2 py-1.5 border border-gray-200 rounded-lg">
              <button
                onClick={() => setDuration((d) => Math.max(0.5, d - 0.5))}
                className="p-1 text-gray-500 hover:text-gray-900"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm">{duration} hrs</span>
              <button
                onClick={() => setDuration((d) => Math.min(6, d + 0.5))}
                className="p-1 text-gray-500 hover:text-gray-900"
              >
                <Plus size={14} />
              </button>
            </div>
          </Field>
          <Field label="End">
            <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900">
              {fmtTime(start + duration)}
            </div>
          </Field>
        </div>
        <div className="mt-3 text-sm text-gray-700">
          Price: ${courtData.price} × {duration} ={" "}
          <span className="font-semibold">${basePrice.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          BT-04 · Cage A blocked for all activity types {fmtTime(start)}–
          {fmtTime(start + duration)}
        </p>
      </Section>

      {/* Step 5: Add-ons */}
      <Section title="Add-ons">
        <div className="space-y-2">
          <label className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5 cursor-pointer">
            <span className="flex items-center gap-2 text-sm text-gray-900">
              <input
                type="checkbox"
                checked={ballHire}
                onChange={(e) => setBallHire(e.target.checked)}
                className="accent-violet-600"
              />
              Ball hire
            </span>
            <span className="text-sm text-gray-700">$5.00</span>
          </label>
          <label className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5">
            <span className="flex items-center gap-2 text-sm text-gray-900">
              <input
                type="checkbox"
                checked={racketHire}
                onChange={(e) => setRacketHire(e.target.checked)}
                className="accent-violet-600"
              />
              Racket hire (pair)
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setRackets((r) => Math.max(1, r - 1))}
                  className="p-1 text-gray-500 hover:text-gray-900"
                  disabled={!racketHire}
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm w-5 text-center">{rackets}</span>
                <button
                  onClick={() => setRackets((r) => Math.min(8, r + 1))}
                  className="p-1 text-gray-500 hover:text-gray-900"
                  disabled={!racketHire}
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-sm text-gray-700">
                ${(8 * rackets).toFixed(2)}
              </span>
            </div>
          </label>
        </div>
      </Section>

      <button
        onClick={addToCart}
        className="w-full mt-6 bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition"
      >
        Add to Cart · {courtData.name} · {duration} hrs · ${total.toFixed(2)}
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      {children}
    </div>
  );
}

/* ---------------- Cart ---------------- */

function CartPanel({
  items,
  onRemove,
  onQty,
}: {
  items: CartItem[];
  onRemove: (id: string) => void;
  onQty: (id: string, q: number) => void;
}) {
  const [pay, setPay] = useState<"card" | "cash" | "wallet">("card");
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = subtotal + tax;

  return (
    <aside className="w-[380px] shrink-0 bg-white border-l border-gray-200 flex flex-col">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Current order</h2>
        <span className="text-xs text-gray-400">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-gray-400">
            No items yet. Select a sport to start.
          </div>
        )}
        {items.map((it) => (
          <div key={it.id} className="px-5 py-4 border-b border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {it.bt && <BTBadge code={it.bt} />}
                <span className="text-sm font-medium text-gray-900 truncate">
                  {it.name}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                ${(it.price * it.qty).toFixed(2)}
              </span>
            </div>
            {it.vertical && (
              <div className="text-xs text-gray-500 mt-1">{it.vertical}</div>
            )}
            {(it.date || it.time) && (
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                {it.date && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} /> {it.date}
                  </span>
                )}
                {it.time && (
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {it.time}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <button className="text-xs text-violet-600 hover:underline">
                  Edit details
                </button>
                <button
                  onClick={() => onRemove(it.id)}
                  className="text-xs text-gray-400 hover:text-gray-700 inline-flex items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>
              <div className="inline-flex items-center gap-2 text-sm">
                <button
                  onClick={() => onQty(it.id, Math.max(1, it.qty - 1))}
                  className="w-6 h-6 grid place-items-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <Minus size={12} />
                </button>
                <span className="w-5 text-center">{it.qty}</span>
                <button
                  onClick={() => onQty(it.id, it.qty + 1)}
                  className="w-6 h-6 grid place-items-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="border-t border-gray-200 p-5 space-y-3 bg-white">
        <Row label="Subtotal" value={subtotal} />
        <Row label="Tax" value={tax} />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-base font-semibold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2">
          {(["card", "cash", "wallet"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPay(p)}
              className={`rounded-xl py-2 text-sm font-medium capitalize transition ${
                pay === p
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-gray-400"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          disabled={items.length === 0}
          className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Charge ${total.toFixed(2)}
        </button>
      </div>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900">${value.toFixed(2)}</span>
    </div>
  );
}

/* ---------------- Page ---------------- */

function POS() {
  const [selectedSport, setSelectedSport] = useState<string | null>("padel");
  const [configOpen, setConfigOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addItems = (items: CartItem[]) => {
    setCart((c) => [...c, ...items]);
    setConfigOpen(false);
  };

  return (
    <div className="flex h-screen bg-white text-gray-900">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Multi-Sport Venue
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select a sport to view resource availability.
              </p>
            </div>
            <div className="text-xs text-gray-400">
              Vertical 06 · Riverside Sports Complex
            </div>
          </div>

          {!configOpen && (
            <div className="grid grid-cols-3 gap-4 mt-6">
              {SPORTS.map((s) => (
                <SportTile
                  key={s.id}
                  sport={s}
                  selected={selectedSport === s.id}
                  onClick={() => {
                    setSelectedSport(s.id);
                    if (s.id === "padel") setConfigOpen(true);
                  }}
                />
              ))}
            </div>
          )}

          {!configOpen && selectedSport === "padel" && (
            <div className="mt-6">
              <button
                onClick={() => setConfigOpen(true)}
                className="text-sm text-violet-700 font-medium hover:underline"
              >
                Configure Padel booking →
              </button>
            </div>
          )}

          {configOpen && (
            <div className="mt-6">
              <PadelConfig onAdd={addItems} onBack={() => setConfigOpen(false)} />
            </div>
          )}
        </div>
      </main>

      <CartPanel
        items={cart}
        onRemove={(id) => setCart((c) => c.filter((i) => i.id !== id))}
        onQty={(id, q) =>
          setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: q } : i)))
        }
      />
    </div>
  );
}
