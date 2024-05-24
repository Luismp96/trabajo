<?php

     class Cliente implements JsonSerializable{
        private $nombre;
        private $apellidos;
        private $email;
        private $telefono;
        private $direcciones;

        //METODO CONSTRUCTOR
        public function __construct($nombre,$apellidos,$email,$telefono){
            $this->nombre = $nombre;
            $this->apellidos = $apellidos;
            $this->email = $email;
            $this->telefono = $telefono;
        }

        public function anadirDireccion($nuevaDireccion){
            array_push($this->direcciones,$nuevaDireccion);
        }

        public function jsonSerialize(){
            return ['nombre' => $this->nombre,
            'apellidos' => $this->apellidos,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'direcciones' => $this->direcciones
        ];
        }

    }

?>