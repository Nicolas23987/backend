import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Genero } from './Genero';
import { Plataforma } from './Plataforma';

@Entity()
export class Videojuego {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('decimal', { precision: 5, scale: 2 })
  precio: number;

  @ManyToOne(() => Genero, genero => genero.videojuegos)
  genero: Genero;

  @ManyToOne(() => Plataforma, plataforma => plataforma.videojuegos)
  plataforma: Plataforma;

  @Column()
  imagen:string
}
