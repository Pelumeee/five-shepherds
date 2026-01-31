import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarIcon } from "../sidebar-icon/sidebar-icon";

interface NavItem {
  label: string;
  route: string;
  icon: 'dashboard' | 'inventory' | 'orders' | 'analytics';
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, SidebarIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/', icon: 'dashboard' },
    { label: 'Inventory', route: '/inventory', icon: 'inventory' },
    { label: 'Orders', route: '/order', icon: 'orders' },
    { label: 'Analytics', route: '/analytics', icon: 'analytics' },
  ];
}
