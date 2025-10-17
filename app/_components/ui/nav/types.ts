// Navigation-specific types for the Nav component and its children

export interface NavItem {
  id: string;
  name: string;
  icon: string;
  href: string;
}

export interface SettingsNavItem {
  id: string;
  name: string;
  href: string;
}

export interface Navigation {
  mainNav: NavItem[];
  settingsNav: SettingsNavItem[];
}

export interface PageIndicator {
  lg: {
    current: string;
    default: string;
  };
  sm: {
    current: string;
    default: string;
  };
}

export interface User {
  uid: string;
  displayName: string;
  email: string | undefined;
}
