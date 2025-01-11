import { Compass, Home, Settings, User } from "lucide-react";

export const navLinks = [
  {
    name: "Home",
    route: "/",
    icon: Home,
  },
  {
    name: "Browse",
    route: "/browse",
    icon: Compass,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    route: "/settings",
    icon: Settings,
  },
];
