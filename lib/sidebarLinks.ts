import { LinkType } from "@/types/types";

export const sidebarLinks: LinkType[] = [
  { url: "/", title: "Overview", iconPath: "/overview.svg" },
  { url: "/appointment", title: "Appointment", iconPath: "/appointment.svg" },
  { url: "/my-patients", title: "My Patients", iconPath: "/profile.svg" },
  {
    url: "/schedule-timings",
    title: "Schedule Timings",
    iconPath: "/schedule.svg",
  },
  { url: "/settings", title: "Settings", iconPath: "/settings.svg" },
];
