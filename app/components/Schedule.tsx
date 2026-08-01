"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BubbleContent } from "@/components/ui/bubble";
import { LucideSunrise, Moon, Sun, SunDim, SunIcon, SunriseIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const schedules = [
  {
    name: "Tony",
    dates: [
      { start: 2, end: 4, mode: "Morning", },
      { start: 30, end: 31, mode: "Afternoon", },
    ],
    color: "bg-amber-400",
    link: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ella",
    dates: [
      { start: 20, end: 21, mode: "Morning" },
    ],
    color: "bg-emerald-400",
    link: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfHx8MA%3D%3D 100w",
  },
  {
    name: "Elisa",
    // example of non-contiguous ranges stored as an array of ranges
    dates: [
      { start: 15, end: 15, mode: "Evening" },
      { start: 17, end: 19, mode: "Evening" },
    ],
    link: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfHx8MA%3D%3D 100w",
    color: "bg-violet-400",
  },
];

// normalize schedules into explicit date lists for easy lookup and non-contiguous support
const normalizedSchedules = schedules.map((s) => {
  const datesList = [];
  if (Array.isArray(s.dates)) {
    if (s.dates.length && typeof s.dates[0] === "object") {
      s.dates.forEach((r) => {
        for (let d = r.start; d <= r.end; d++) datesList.push(d);
      });
    } else {
      datesList.push(...s.dates);
    }
  } else {
    const range = s as { start?: number; end?: number };
    if (range.start != null && range.end != null) {
      for (let d = range.start; d <= range.end; d++) datesList.push(d);
    }
  }
  return { ...s, datesList };
});
const dates = Array.from({ length: 31 }, (_, index) => index + 1);

const modeConfig = {
  Morning: { Icon: SunDim, bg: "bg-amber-400", time: "7am - 9am" },
  Afternoon: { Icon: Sun, bg: "bg-amber-800", time: "1pm - 3pm" },
  Evening: { Icon: Moon, bg: "bg-violet-800", time: "6pm - 8pm" },
} as const;

export const Schedule = () => {
  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      <div className="basis-full">
        <span className="text-xs uppercase tracking-wide text-yellow-800">Join available classes</span>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-6 lg:mb-8 font-extrabold">Schedule</h3>
        <p className="text-sm text-gray-600 leading-6">Flexible planning designed for busy professional lives. Our sessions are balanced throughout the day to fit global timezones.</p>
        <p className="mt-2 text-xs text-gray-500 italic lg:hidden">Swipe the calendar sideways to see the full week.</p>
      </div>
      {/* The 7-column grid can't compress below ~700px and stay legible, so on
          small screens it scrolls horizontally inside its own container rather
          than forcing the whole page to scroll. */}
      <div className="basis-full w-full overflow-x-auto overscroll-x-contain">
        <div className="min-w-[700px] p-3 sm:p-6 text-xs shadow-sm rounded-lg place-items-center-safe grid grid-cols-7">
        {days.map((day) => (
          <div key={day} className="font-semibold text-gray-700 mb-8 w-full border-b flex justify-center pb-4">
            {day}
          </div>
        ))}
        {dates.map((date) => {
          const matched = normalizedSchedules.filter((s) => s.datesList.includes(date));
          return (
            <div key={date} className="relative w-full h-12 flex items-start">
              {/* <span className="absolute top-2 left-2 z-20 rounded-full bg-gray-600 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm">
                {date}
              </span> */}
              {matched.map((s, idx) => {
                const isStart = !s.datesList.includes(date - 1);
                const isEnd = !s.datesList.includes(date + 1);
                const leftClass = isStart ? "left-1/4" : "left-0";
                const widthClass = isStart ? "w-3/4" : isEnd ? "w-1/2" : "w-full";
                const roundClass = isStart && isEnd
                  ? "rounded-sm"
                  : isStart
                  ? "rounded-l-sm"
                  : isEnd
                  ? "rounded-r-sm"
                  : "";
                const range = s.dates.find((r) => date >= r.start && date <= r.end);
                const { bg, time } = modeConfig[range?.mode as keyof typeof modeConfig] ?? modeConfig.Morning;
                return (
                  <Fragment key={`slot-${s.name}-${idx}`}>
                    {isStart && (
                      <>
                        <Avatar className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white">
                          <AvatarImage
                            className="shadow-md opacity-90"
                            src={s.link}
                            alt="@shadcn"
                          />
                          <AvatarFallback className="text-xs bg-transparent">{s.name}</AvatarFallback>
                        </Avatar>
                        <BubbleContent className={`absolute z-30 top-[50%] left-[30%] rounded-full px-2 py-1 text-[10px] font-medium leading-none whitespace-nowrap text-white ${bg}`}>
                          {time}
                        </BubbleContent>
                      </>
                    )}
                    <div
                      className={`absolute ${leftClass} z-10 -translate-y-1/2 ${widthClass} ${s.color} h-2 ${roundClass}`}
                      style={{ top: `50%` }}
                    />
                  </Fragment>
                );
              })}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  )
}