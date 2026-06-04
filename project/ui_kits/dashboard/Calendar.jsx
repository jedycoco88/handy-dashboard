/* global React, Icon, Avatar, Button, STAGE_COLOR */
// Calendar — week view with scheduled jobs.

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const DAYS = [
  { d: "Mon", n: 8 }, { d: "Tue", n: 9, today: true }, { d: "Wed", n: 10 }, { d: "Thu", n: 11 },
  { d: "Fri", n: 12 }, { d: "Sat", n: 13 }, { d: "Sun", n: 14 },
];
// events: dayIndex, startHour, durHours, service, hp, stage, city
const EVENTS = [
  { day: 1, start: 9, dur: 4, service: "Deep Cleaning", hp: "Jomar R.", stage: "Confirmed", city: "QC" },
  { day: 1, start: 13, dur: 2, service: "Aircon Cleaning", hp: "Jericho L.", stage: "Today's Booking", city: "Makati" },
  { day: 1, start: 10, dur: 3, service: "Regular Cleaning", hp: "Liza M.", stage: "Job In Progress", city: "San Juan" },
  { day: 3, start: 10, dur: 2, service: "Plumbing assessment", hp: "Noel G.", stage: "Assessment/Quotation (Skilled)", city: "Mandaluyong" },
  { day: 2, start: 8, dur: 2, service: "Laundry pickup", hp: "Rosa B.", stage: "Downpayment verification", city: "QC" },
  { day: 4, start: 14, dur: 3, service: "Painting", hp: "Arvin D.", stage: "FaceCard / For Downpayment", city: "Manila" },
  { day: 5, start: 9, dur: 4, service: "Carpentry", hp: "Dennis C.", stage: "Confirmed", city: "Parañaque" },
];
const fmtH = (h) => (h % 12 || 12) + (h < 12 ? "AM" : "PM");

function Calendar({ openBooking }) {
  return (
    <div className="hs-cal">
      <div className="hs-cal-bar">
        <div className="hs-cal-nav">
          <button className="hs-iconbtn"><Icon name="chevron-left" size={18} /></button>
          <b>Jun 8 – 14, 2026</b>
          <button className="hs-iconbtn"><Icon name="chevron-right" size={18} /></button>
          <Button variant="ghost">Today</Button>
        </div>
        <div className="hs-segmented">
          <button>Day</button><button className="active">Week</button><button>Month</button>
        </div>
      </div>

      <div className="hs-scroll">
        <div className="hs-calgrid">
          {/* header row */}
          <div className="hs-cal-corner" />
          {DAYS.map(d => (
            <div key={d.d} className={"hs-cal-dayhead" + (d.today ? " today" : "")}>
              <span className="hs-cal-dow">{d.d}</span>
              <span className="hs-cal-dnum">{d.n}</span>
            </div>
          ))}
          {/* time rows */}
          {HOURS.map(h => (
            <React.Fragment key={h}>
              <div className="hs-cal-time">{fmtH(h)}</div>
              {DAYS.map((d, di) => (
                <div key={d.d + h} className="hs-cal-cell">
                  {EVENTS.filter(e => e.day === di && e.start === h).map((e, i) => {
                    const sc = STAGE_COLOR[e.stage] || {};
                    return (
                      <button key={i} className="hs-event" style={{ height: e.dur * 56 - 8, background: sc.soft, borderColor: sc.color }}
                        onClick={() => openBooking({ id: "HS-cal", client: "Scheduled", service: e.service, city: e.city, stage: e.stage, when: `${d.d} ${d.n} · ${fmtH(e.start)}`, amount: 0, channel: "Messenger", hp: e.hp, note: "Scheduled job from calendar." })}>
                        <span className="hs-event-bar" style={{ background: sc.color }} />
                        <b style={{ color: sc.color }}>{e.service}</b>
                        <small>{fmtH(e.start)} · {e.hp}</small>
                        <small className="hs-event-city"><Icon name="map-pin" size={11} />{e.city}</small>
                      </button>
                    );
                  })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Calendar });
