import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Videojuego } from './VideoJuegos';

@Entity()
export class Genero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Videojuego, videojuego => videojuego.genero)
  videojuegos: Videojuego[];
}
