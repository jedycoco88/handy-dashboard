// Mock data for the Operations Dashboard — mirrors the real GHL board.

export const STAGE_GROUPS = [
  { key: "inquiry",   label: "Inquiry",      color: "var(--stage-inquiry)",   soft: "var(--stage-inquiry-soft)",
    stages: ["New Inquiry", "For Follow Up", "Info Incomplete", "Out of Service Area – Waitlist"] },
  { key: "matching",  label: "Matching",     color: "var(--stage-matching)",  soft: "var(--stage-matching-soft)",
    stages: ["For HP Matching", "Worker options sent", "Worker assigned", "No HP Match"] },
  { key: "quotation", label: "Quotation",    color: "var(--stage-quotation)", soft: "var(--stage-quotation-soft)",
    stages: ["Assessment/Quotation (Cleaning)", "Assessment/Quotation (Skilled)"] },
  { key: "payment",   label: "Payment",      color: "var(--stage-payment)",   soft: "var(--stage-payment-soft)",
    stages: ["FaceCard / For Downpayment", "Downpayment verification", "Full Payment Confirmation"] },
  { key: "confirmed", label: "Confirmed",    color: "var(--stage-confirmed)", soft: "var(--stage-confirmed-soft)",
    stages: ["Confirmed", "Today's Booking"] },
  { key: "progress",  label: "In Progress",  color: "var(--stage-progress)",  soft: "var(--stage-progress-soft)",
    stages: ["Job In Progress"] },
  { key: "completed", label: "Completed",    color: "var(--stage-completed)", soft: "var(--stage-completed-soft)",
    stages: ["Job Completed", "E-Receipt Sent"] },
  { key: "issue",     label: "Issues",       color: "var(--stage-issue)",     soft: "var(--stage-issue-soft)",
    stages: ["Cancelled by Client", "Cancelled by HP", "Complaint_Rework", "For Reschedule", "NCNS"] },
];

export const STAGE_COLOR = {};
STAGE_GROUPS.forEach(g => g.stages.forEach(s => {
  STAGE_COLOR[s] = { color: g.color, soft: g.soft, group: g.key };
}));

export const PIPELINE_COUNTS = [
  ["New Inquiry", 134], ["HP Applications", 445], ["For Follow Up", 672], ["Info Incomplete", 0],
  ["Out of Service Area – Waitlist", 71], ["For HP Matching", 4], ["Worker options sent", 4],
  ["Worker assigned", 0], ["Assessment/Quotation (Cleaning)", 18], ["Assessment/Quotation (Skilled)", 30],
  ["No HP Match", 6], ["FaceCard / For Downpayment", 0], ["Downpayment verification", 0],
  ["Confirmed", 1], ["Today's Booking", 8], ["Job In Progress", 0], ["Full Payment Confirmation", 0],
  ["HP Payment", 0], ["Job Completed", 14], ["E-Receipt Sent", 0], ["Cancelled by Client", 8],
  ["Cancelled by HP", 1], ["Complaint_Rework", 0], ["For Reschedule", 0], ["NCNS", 1], ["Dump", 394],
];

export const BOOKINGS = [
  { id: "HS-2041", client: "Maria Santos", service: "Deep Cleaning", city: "Quezon City", stage: "Confirmed",
    when: "Tue, Jun 9 · 9:00 AM", amount: 2500, channel: "Messenger", hp: "Jomar Reyes", vip: true,
    note: "2BR condo, move-in clean. Pet-friendly products requested." },
  { id: "HS-2044", client: "Carlo Dizon", service: "Aircon Cleaning", city: "Makati", stage: "Today's Booking",
    when: "Today · 1:00 PM", amount: 4800, channel: "Messenger", hp: "Jericho Lim",
    note: "3 split-type units. Building requires gate pass." },
  { id: "HS-2046", client: "Rhea Cruz", service: "Deep Cleaning", city: "Pasig", stage: "New Inquiry",
    when: "Requested: Sat AM", amount: 0, channel: "Messenger", hp: null,
    note: "Asked for quote on 2BR condo deep clean." },
  { id: "HS-2050", client: "Ben Aquino", service: "Plumbing", city: "Mandaluyong", stage: "Assessment/Quotation (Skilled)",
    when: "Assessment: Thu 10 AM", amount: 0, channel: "SMS", hp: "Noel Garcia",
    note: "Leak under kitchen sink + low water pressure." },
  { id: "HS-2052", client: "Grace Lim", service: "Electrical", city: "Taguig (BGC)", stage: "Worker options sent",
    when: "Pending client pick", amount: 0, channel: "Instagram", hp: null,
    note: "Sent 2 HP options for panel/breaker check." },
  { id: "HS-2055", client: "Paolo Reyes", service: "Painting", city: "Manila", stage: "FaceCard / For Downpayment",
    when: "Quoted: Jun 12", amount: 12500, channel: "Messenger", hp: "Arvin Dela Cruz",
    note: "Repaint 1BR unit. Awaiting 50% downpayment." },
  { id: "HS-2058", client: "Jenny Tan", service: "Regular Cleaning", city: "San Juan", stage: "Job In Progress",
    when: "Today · 10:00 AM", amount: 1800, channel: "Viber", hp: "Liza Mendoza",
    note: "Weekly recurring. HP checked in 10:05 AM." },
  { id: "HS-2060", client: "Mark Villanueva", service: "Carpentry", city: "Parañaque", stage: "Job Completed",
    when: "Yesterday · 2:00 PM", amount: 6200, channel: "Messenger", hp: "Dennis Cruz",
    note: "Built 2 shelves. Client rated 5★." },
  { id: "HS-2062", client: "Aileen David", service: "Laundry & Ironing", city: "Quezon City", stage: "Downpayment verification",
    when: "Pickup: Wed 8 AM", amount: 950, channel: "SMS", hp: "Rosa Bautista",
    note: "GCash ref submitted, verifying." },
  { id: "HS-2065", client: "Victor Lopez", service: "Gardening", city: "Makati", stage: "Cancelled by Client",
    when: "Was: Jun 8", amount: 0, channel: "SMS", hp: null,
    note: "Client rescheduled to next month." },
];

export const CONVERSATIONS = [
  { id: "c1", name: "Rhea Cruz", channel: "Messenger", time: "4m", unread: 2, online: true, bookingId: "HS-2046",
    preview: "Hi po, magkano for deep cleaning ng 2BR condo?",
    msgs: [
      { from: "them", t: "10:42 AM", body: "Hi po! Nakita ko ad niyo sa Facebook 🙂" },
      { from: "them", t: "10:42 AM", body: "Magkano po for deep cleaning ng 2BR condo sa Pasig?" },
      { from: "me", t: "10:44 AM", body: "Hi Rhea! Salamat sa message. For a 2BR condo deep clean, the rate starts at ₱2,500 (around 3–4 hrs)." },
      { from: "me", t: "10:44 AM", body: "May preferred date po ba kayo? I can check HP availability." },
      { from: "them", t: "10:46 AM", body: "Pwede po this Saturday morning?" },
    ] },
  { id: "c2", name: "Carlo Dizon", channel: "Messenger", time: "22m", unread: 0, online: true, bookingId: "HS-2044",
    preview: "Sige, see you later at 1pm. Thanks!",
    msgs: [
      { from: "me", t: "9:10 AM", body: "Good morning Carlo! Confirming your aircon cleaning today at 1:00 PM, 3 units. HP: Jericho." },
      { from: "them", t: "9:31 AM", body: "Sige, see you later at 1pm. Thanks!" },
    ] },
  { id: "c3", name: "Ben Aquino", channel: "SMS", time: "1h", unread: 1, online: false, bookingId: "HS-2050",
    preview: "Ok lang ba kung Thursday yung assessment?",
    msgs: [
      { from: "them", t: "8:50 AM", body: "May leak po sa kitchen sink namin, plus mahina yung water pressure." },
      { from: "me", t: "9:02 AM", body: "Noted po. Kailangan namin ng quick assessment muna. Thursday 10 AM ok po ba?" },
      { from: "them", t: "9:40 AM", body: "Ok lang ba kung Thursday yung assessment?" },
    ] },
  { id: "c4", name: "Grace Lim", channel: "Instagram", time: "2h", unread: 0, online: false, bookingId: "HS-2052",
    preview: "I'll check the two options and get back 👍",
    msgs: [
      { from: "me", t: "7:30 AM", body: "Hi Grace! Sent you 2 HP options for the breaker check — both available this week." },
      { from: "them", t: "7:58 AM", body: "I'll check the two options and get back 👍" },
    ] },
  { id: "c5", name: "Jenny Tan", channel: "Viber", time: "3h", unread: 0, online: false, bookingId: "HS-2058",
    preview: "HP is here na, thank you!",
    msgs: [
      { from: "them", t: "10:06 AM", body: "HP is here na, thank you!" },
      { from: "me", t: "10:07 AM", body: "Great! Liza will take care of it. Enjoy your day 🙌" },
    ] },
];

export const peso = (n) => "₱" + n.toLocaleString("en-PH");
