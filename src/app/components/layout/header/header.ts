
import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html'
})
export class Header {
  // Solicita abrir el menú en dispositivos móviles
  @Output() menuToggle = new EventEmitter<void>();

  // Solicita ocultar o mostrar el menú en escritorio
  @Output() sidebarToggle = new EventEmitter<void>();
}