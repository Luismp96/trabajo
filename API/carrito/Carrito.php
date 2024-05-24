<?php

     class Carrito implements JsonSerializable{
        private $productos;
        private $cliente;
        private $total;

        //METODO CONSTRUCTOR
        public function __construct(){
            $this->productos = [];
        }

        public function anadirProducto($producto){
            array_push($this->productos,$producto);
        }


        public function listarProductos(){
            return $this->productos;
        }

        public function calculaTotal (){
            $total = 0;
            foreach($this->productos as $producto){
                $total += $producto->dimePrecio();
            }
            return $total;
        }

        public function anadirCliente($nuevoCliente){
            $this->cliente = $nuevoCliente;
        }

        public function borrarCarrito(){
            $this->productos = [];
        }

        public function jsonSerialize(){
            return ['productos' => $this->productos,
            'cliente' => $this->cliente,
            'total' => $this->total
        ];
        }

        public function numeroProductos(){
            return count($this->productos);
        }

        public function setTotal($total){
            $this->total = $total;
        }

        public function getTotal(){
            return $this->total;
        }
    }

?>