
<?php

    interface darDatos{
        public function darDatos();
    }
    class Producto implements JsonSerializable{
        private $precio;
        private $nombre;
        private $descripcion;

        //METODO CONSTRUCTOR
        public function __construct($nombre, $descripcion,$precio){
            $this->nombre = $nombre;
            $this->descripcion = $descripcion;
            $this->precio = $precio;
        }

        public function ponPrecio($nuevoPrecio){
            $this->precio = $nuevoPrecio;
        }

        public function dimePrecio(){
            return $this->precio;
        }

        public function ponNombre($nuevoNombre){
            $this->nombre = $nuevoNombre;
        }

        public function dimeNombre(){
            return $this->nombre;
        }

        public function ponDescripcion($nuevaDescripcion){
            $this->descripcion = $nuevaDescripcion;
        }

        public function dimeDescripcion(){
            return $this->descripcion;
        }

        public function darDatos(){
            return [$this->nombre,$this->descripcion,$this->precio];
        }

        public function jsonSerialize(){
            return ['precio' => $this->precio,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion
        ];
        }
    }


?>