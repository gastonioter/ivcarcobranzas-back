import { shallowEqual } from "shallow-equal-object";

export class CategoriaPago {
  private nombre: string;
  private precio: number;
  private descripcion: string;

  constructor(nombre: string, precio: number, descripcion: string) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
  }

  static new(
    nombre: string,
    precio: number,
    description?: string,
  ): CategoriaPago {
    if (!nombre.trim()) {
      throw new Error("El nombre de la categoría no puede estar vacío.");
    }
    if (precio <= 0) {
      throw new Error("El precio no puede ser negativo ni 0.");
    }

    return new CategoriaPago(nombre, precio, description || "sin descripción");
  }

  public cambiarPrecio(nuevoPrecio: number): void {
    if (nuevoPrecio <= 0) {
      throw new Error("El precio no puede ser negativo.");
    }
    this.precio = nuevoPrecio;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getPrecio(): number {
    return this.precio;
  }
  public getDescripcion(): string {
    return this.descripcion;
  }

  public equals(otra: CategoriaPago): boolean {
    return shallowEqual(this, otra);
  }
}
