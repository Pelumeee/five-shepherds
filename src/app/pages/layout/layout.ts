import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Sidebar } from "../../shared/components/sidebar/sidebar";
import { Header } from "../../shared/components/header/header";

@Component({
  selector: 'app-layout',
  imports: [Sidebar, Header, RouterOutlet],
  templateUrl: './layout.html',
})

export class Layout {

}
