import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria = '';
  juegos: any[] = [];

  private datos: any = {
    deportes: [
      { titulo: 'FIFA', imagen: 'assets/img/fifa.png', precio: 29990 },
      { titulo: 'TENIS', imagen: 'assets/img/tenis.png', precio: 19990 }
    ],
    aventura: [
      { titulo: 'Zelda', imagen: 'assets/img/zelda.png', precio: 39990 },
      { titulo: 'Mario', imagen: 'assets/img/mario.png', precio: 29990 }
    ],
    disparos: [
      { titulo: 'Fortnite', imagen: 'assets/img/fortnite.png', precio: 0 },
      { titulo: 'Gta V', imagen: 'assets/img/gta.png', precio: 59990 }
    ]
  };

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }


  sesion: any = null;

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    this.route.params.subscribe(params => {
      this.categoria = params['nombre'];
      this.juegos = this.datos[this.categoria] || [];
    });
  }


  agregarAlCarrito(juego: any) {
    const sesionStr = localStorage.getItem('sesion');
    const sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (!sesion || sesion.tipo !== 'usuario') {
      alert('Debes iniciar sesión como usuario para agregar al carrito.');
      return;
    }

    const claveCarrito = 'carrito_' + sesion.email;
    const carritoStr = localStorage.getItem(claveCarrito);
    const carrito = carritoStr ? JSON.parse(carritoStr) : [];

    const index = carrito.findIndex((item: any) => item.nombre === juego.titulo);

    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({
        nombre: juego.titulo,
        categoria: this.categoria,
        precio: 29990,
        cantidad: 1
      });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert('¡Agregado al carrito con éxito!');
  }




}
