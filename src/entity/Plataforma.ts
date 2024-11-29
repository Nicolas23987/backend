import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Videojuego } from './VideoJuegos';

@Entity()
export class Plataforma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Videojuego, videojuego => videojuego.plataforma)
  videojuegos: Videojuego[];
}
