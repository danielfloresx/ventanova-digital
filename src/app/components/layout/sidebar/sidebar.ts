//Importar componentes y módulos necesarios de Angular
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  // Recibe el estado del menú
  @Input() open = false;
  @Input() collapsed = false;

  // Comunica las acciones al componente principal
  @Output() closeMenu = new EventEmitter<void>();
  @Output() toggleWidth = new EventEmitter<void>();

  // Controla la expansión de las categorías
  catalogoOpen = true;
}
