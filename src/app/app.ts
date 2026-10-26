//Importar componentes y módulos necesarios de Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/layout/header/header';
import { Sidebar } from './components/layout/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Controla la apertura del menú lateral
  sidebarOpen = false;

  // Controla la visibilidad del menú lateral en escritorio
  sidebarCollapsed = false;

  // Abre o cierra el menú lateral
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Oculta o muestra el menú lateral en escritorio
  toggleSidebarDesktop(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  // Cierra el menú al seleccionar una opción
  closeSidebar(): void {
    this.sidebarOpen = false;
  }
}