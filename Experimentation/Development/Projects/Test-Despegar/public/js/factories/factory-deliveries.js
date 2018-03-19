app.factory('deliveries', function() {
    return {
        items: [
            {
                name: 'Peru World',
                description: 'Restaurante Peruano',
                meals: {
                    pizzas: {
                        queso: {
                            name: 'Queso',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        fugazzeta: {
                            name: 'Fugazzeta',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        provolone: {
                            name: 'Provolone',
                            description: 'Distintos tipos de quesos a elección',
                            price: 190
                        },
                        rucula: {
                            name: 'Rúcula',
                            description: 'Distintos tipos de quesos a elección',
                            price: 200
                        },
                        anchoas: {
                            name: 'Anchoas',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        palmito: {
                            name: 'Palmito',
                            description: 'Distintos tipos de quesos a elección',
                            price: 210
                        },
                        tomate: {
                            name: 'Tomate',
                            description: 'Distintos tipos de quesos a elección',
                            price: 170
                        }
                    },
                    sandwiches: {
                        jamonyqueso: {
                            name: 'Jamón y Queso',
                            description: 'Sandwich de jamón y queso',
                            price: 45
                        },
                        bondiola: {
                            name: 'Bondiola',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pollo: {
                            name: 'Pollo',
                            description: 'Sandwich de jamón y queso',
                            price: 50
                        },
                        jamoncrudotomateyqueso: {
                            name: 'Jamon crudo, tomate y queso',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pescado: {
                            name: 'Pescado',
                            description: 'Sandwich de jamón y queso',
                            price: 120
                        }
                    },
                    pastas: {
                        ravioles: {
                            name: 'Ravioles',
                            description: 'Ravioles de Ricota y pollo',
                            price: 60
                        },
                        anolotis: {
                            name: 'Añolotis',
                            description: 'Añolotis de Ricota y pollo',
                            price: 60
                        },
                        noquis: {
                            name: 'Ñoquis',
                            description: 'Ñoquis de papa',
                            price: 60
                        },
                        fideos: {
                            name: 'Fideos',
                            description: 'Fideos',
                            price: 40
                        }
                    },
                    bebidas: {
                        cocacola: {
                            name: 'Coca Cola',
                            description: 'Coca Cola de 1 litro',
                            price: 75
                        },
                        sevenup: {
                            name: 'Seven Up',
                            description: 'Seven Up de 1 litro',
                            price: 60
                        },
                        fanta: {
                            name: 'Fanta',
                            description: 'Fanta de 1 litro',
                            price: 55
                        },
                        vinoblanco: {
                            name: 'Vino Blanco',
                            description: 'Vino Blanco Santa Ana',
                            price: 140
                        },
                        cervezaquilmes: {
                            name: 'Cerveza Quilmes',
                            description: 'Cerveza Quilmes de 2 litros',
                            price: 100
                        },
                        cervezaimperial: {
                            name: 'Cerveza Imperial',
                            description: 'Cerveza Imperial de 2 litros',
                            price: 70
                        }
                    }
                }
            },
            {
                name: 'La Guarida',
                description: 'Restaurante Mexicano',
                meals: {
                    pizzas: {
                        queso: {
                            name: 'Queso',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        fugazzeta: {
                            name: 'Fugazzeta',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        provolone: {
                            name: 'Provolone',
                            description: 'Distintos tipos de quesos a elección',
                            price: 190
                        },
                        rucula: {
                            name: 'Rúcula',
                            description: 'Distintos tipos de quesos a elección',
                            price: 200
                        },
                        anchoas: {
                            name: 'Anchoas',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        palmito: {
                            name: 'Palmito',
                            description: 'Distintos tipos de quesos a elección',
                            price: 210
                        },
                        tomate: {
                            name: 'Tomate',
                            description: 'Distintos tipos de quesos a elección',
                            price: 170
                        }
                    },
                    sandwiches: {
                        jamonyqueso: {
                            name: 'Jamón y Queso',
                            description: 'Sandwich de jamón y queso',
                            price: 45
                        },
                        bondiola: {
                            name: 'Bondiola',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pollo: {
                            name: 'Pollo',
                            description: 'Sandwich de jamón y queso',
                            price: 50
                        },
                        jamoncrudotomateyqueso: {
                            name: 'Jamon crudo, tomate y queso',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pescado: {
                            name: 'Pescado',
                            description: 'Sandwich de jamón y queso',
                            price: 120
                        }
                    },
                    pastas: {
                        ravioles: {
                            name: 'Ravioles',
                            description: 'Ravioles de Ricota y pollo',
                            price: 60
                        },
                        anolotis: {
                            name: 'Añolotis',
                            description: 'Añolotis de Ricota y pollo',
                            price: 60
                        },
                        noquis: {
                            name: 'Ñoquis',
                            description: 'Ñoquis de papa',
                            price: 60
                        },
                        fideos: {
                            name: 'Fideos',
                            description: 'Fideos',
                            price: 40
                        }
                    },
                    bebidas: {
                        cocacola: {
                            name: 'Coca Cola',
                            description: 'Coca Cola de 1 litro',
                            price: 75
                        },
                        sevenup: {
                            name: 'Seven Up',
                            description: 'Seven Up de 1 litro',
                            price: 60
                        },
                        fanta: {
                            name: 'Fanta',
                            description: 'Fanta de 1 litro',
                            price: 55
                        },
                        vinoblanco: {
                            name: 'Vino Blanco',
                            description: 'Vino Blanco Santa Ana',
                            price: 140
                        },
                        cervezaquilmes: {
                            name: 'Cerveza Quilmes',
                            description: 'Cerveza Quilmes de 2 litros',
                            price: 100
                        },
                        cervezaimperial: {
                            name: 'Cerveza Imperial',
                            description: 'Cerveza Imperial de 2 litros',
                            price: 70
                        }
                    }
                }
            },
            {
                name: 'El asador',
                description: 'Parrilla',
                meals: {
                    pizzas: {
                        queso: {
                            name: 'Queso',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        fugazzeta: {
                            name: 'Fugazzeta',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        provolone: {
                            name: 'Provolone',
                            description: 'Distintos tipos de quesos a elección',
                            price: 190
                        },
                        rucula: {
                            name: 'Rúcula',
                            description: 'Distintos tipos de quesos a elección',
                            price: 200
                        },
                        anchoas: {
                            name: 'Anchoas',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        palmito: {
                            name: 'Palmito',
                            description: 'Distintos tipos de quesos a elección',
                            price: 210
                        },
                        tomate: {
                            name: 'Tomate',
                            description: 'Distintos tipos de quesos a elección',
                            price: 170
                        }
                    },
                    sandwiches: {
                        jamonyqueso: {
                            name: 'Jamón y Queso',
                            description: 'Sandwich de jamón y queso',
                            price: 45
                        },
                        bondiola: {
                            name: 'Bondiola',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pollo: {
                            name: 'Pollo',
                            description: 'Sandwich de jamón y queso',
                            price: 50
                        },
                        jamoncrudotomateyqueso: {
                            name: 'Jamon crudo, tomate y queso',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pescado: {
                            name: 'Pescado',
                            description: 'Sandwich de jamón y queso',
                            price: 120
                        }
                    },
                    pastas: {
                        ravioles: {
                            name: 'Ravioles',
                            description: 'Ravioles de Ricota y pollo',
                            price: 60
                        },
                        anolotis: {
                            name: 'Añolotis',
                            description: 'Añolotis de Ricota y pollo',
                            price: 60
                        },
                        noquis: {
                            name: 'Ñoquis',
                            description: 'Ñoquis de papa',
                            price: 60
                        },
                        fideos: {
                            name: 'Fideos',
                            description: 'Fideos',
                            price: 40
                        }
                    },
                    bebidas: {
                        cocacola: {
                            name: 'Coca Cola',
                            description: 'Coca Cola de 1 litro',
                            price: 75
                        },
                        sevenup: {
                            name: 'Seven Up',
                            description: 'Seven Up de 1 litro',
                            price: 60
                        },
                        fanta: {
                            name: 'Fanta',
                            description: 'Fanta de 1 litro',
                            price: 55
                        },
                        vinoblanco: {
                            name: 'Vino Blanco',
                            description: 'Vino Blanco Santa Ana',
                            price: 140
                        },
                        cervezaquilmes: {
                            name: 'Cerveza Quilmes',
                            description: 'Cerveza Quilmes de 2 litros',
                            price: 100
                        },
                        cervezaimperial: {
                            name: 'Cerveza Imperial',
                            description: 'Cerveza Imperial de 2 litros',
                            price: 70
                        }
                    }
                }
            },
            {
                name: 'Italian Village',
                description: 'Comida Italiana',
                meals: {
                    pizzas: {
                        queso: {
                            name: 'Queso',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        fugazzeta: {
                            name: 'Fugazzeta',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        provolone: {
                            name: 'Provolone',
                            description: 'Distintos tipos de quesos a elección',
                            price: 190
                        },
                        rucula: {
                            name: 'Rúcula',
                            description: 'Distintos tipos de quesos a elección',
                            price: 200
                        },
                        anchoas: {
                            name: 'Anchoas',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        palmito: {
                            name: 'Palmito',
                            description: 'Distintos tipos de quesos a elección',
                            price: 210
                        },
                        tomate: {
                            name: 'Tomate',
                            description: 'Distintos tipos de quesos a elección',
                            price: 170
                        }
                    },
                    sandwiches: {
                        jamonyqueso: {
                            name: 'Jamón y Queso',
                            description: 'Sandwich de jamón y queso',
                            price: 45
                        },
                        bondiola: {
                            name: 'Bondiola',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pollo: {
                            name: 'Pollo',
                            description: 'Sandwich de jamón y queso',
                            price: 50
                        },
                        jamoncrudotomateyqueso: {
                            name: 'Jamon crudo, tomate y queso',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pescado: {
                            name: 'Pescado',
                            description: 'Sandwich de jamón y queso',
                            price: 120
                        }
                    },
                    pastas: {
                        ravioles: {
                            name: 'Ravioles',
                            description: 'Ravioles de Ricota y pollo',
                            price: 60
                        },
                        anolotis: {
                            name: 'Añolotis',
                            description: 'Añolotis de Ricota y pollo',
                            price: 75
                        },
                        noquis: {
                            name: 'Ñoquis',
                            description: 'Ñoquis de papa',
                            price: 60
                        },
                        fideos: {
                            name: 'Fideos',
                            description: 'Fideos',
                            price: 40
                        }
                    },
                    bebidas: {
                        cocacola: {
                            name: 'Coca Cola',
                            description: 'Coca Cola de 1 litro',
                            price: 75
                        },
                        sevenup: {
                            name: 'Seven Up',
                            description: 'Seven Up de 1 litro',
                            price: 60
                        },
                        fanta: {
                            name: 'Fanta',
                            description: 'Fanta de 1 litro',
                            price: 55
                        },
                        vinoblanco: {
                            name: 'Vino Blanco',
                            description: 'Vino Blanco Santa Ana',
                            price: 140
                        },
                        cervezaquilmes: {
                            name: 'Cerveza Quilmes',
                            description: 'Cerveza Quilmes de 2 litros',
                            price: 100
                        },
                        cervezaimperial: {
                            name: 'Cerveza Imperial',
                            description: 'Cerveza Imperial de 2 litros',
                            price: 70
                        }
                    }
                }
            },
            {
                name: 'Greek World',
                description: 'Comida Griega',
                meals: {
                    pizzas: {
                        queso: {
                            name: 'Queso',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        fugazzeta: {
                            name: 'Fugazzeta',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        provolone: {
                            name: 'Provolone',
                            description: 'Distintos tipos de quesos a elección',
                            price: 190
                        },
                        rucula: {
                            name: 'Rúcula',
                            description: 'Distintos tipos de quesos a elección',
                            price: 200
                        },
                        anchoas: {
                            name: 'Anchoas',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        palmito: {
                            name: 'Palmito',
                            description: 'Distintos tipos de quesos a elección',
                            price: 210
                        },
                        tomate: {
                            name: 'Tomate',
                            description: 'Distintos tipos de quesos a elección',
                            price: 170
                        }
                    },
                    sandwiches: {
                        jamonyqueso: {
                            name: 'Jamón y Queso',
                            description: 'Sandwich de jamón y queso',
                            price: 45
                        },
                        bondiola: {
                            name: 'Bondiola',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pollo: {
                            name: 'Pollo',
                            description: 'Sandwich de jamón y queso',
                            price: 50
                        },
                        jamoncrudotomateyqueso: {
                            name: 'Jamon crudo, tomate y queso',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pescado: {
                            name: 'Pescado',
                            description: 'Sandwich de jamón y queso',
                            price: 120
                        }
                    },
                    pastas: {
                        ravioles: {
                            name: 'Ravioles',
                            description: 'Ravioles de Ricota y pollo',
                            price: 60
                        },
                        anolotis: {
                            name: 'Añolotis',
                            description: 'Añolotis de Ricota y pollo',
                            price: 60
                        },
                        noquis: {
                            name: 'Ñoquis',
                            description: 'Ñoquis de papa',
                            price: 60
                        },
                        fideos: {
                            name: 'Fideos',
                            description: 'Fideos',
                            price: 40
                        }
                    },
                    bebidas: {
                        cocacola: {
                            name: 'Coca Cola',
                            description: 'Coca Cola de 1 litro',
                            price: 75
                        },
                        sevenup: {
                            name: 'Seven Up',
                            description: 'Seven Up de 1 litro',
                            price: 60
                        },
                        fanta: {
                            name: 'Fanta',
                            description: 'Fanta de 1 litro',
                            price: 55
                        },
                        vinoblanco: {
                            name: 'Vino Blanco',
                            description: 'Vino Blanco Santa Ana',
                            price: 140
                        },
                        cervezaquilmes: {
                            name: 'Cerveza Quilmes',
                            description: 'Cerveza Quilmes de 2 litros',
                            price: 100
                        },
                        cervezaimperial: {
                            name: 'Cerveza Imperial',
                            description: 'Cerveza Imperial de 2 litros',
                            price: 70
                        }
                    }
                }
            },
            {
                name: 'El club de la Milanesa',
                description: 'Solo Milanesas',
                meals: {
                    pizzas: {
                        queso: {
                            name: 'Queso',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        fugazzeta: {
                            name: 'Fugazzeta',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        provolone: {
                            name: 'Provolone',
                            description: 'Distintos tipos de quesos a elección',
                            price: 190
                        },
                        rucula: {
                            name: 'Rúcula',
                            description: 'Distintos tipos de quesos a elección',
                            price: 200
                        },
                        anchoas: {
                            name: 'Anchoas',
                            description: 'Distintos tipos de quesos a elección',
                            price: 150
                        },
                        palmito: {
                            name: 'Palmito',
                            description: 'Distintos tipos de quesos a elección',
                            price: 210
                        },
                        tomate: {
                            name: 'Tomate',
                            description: 'Distintos tipos de quesos a elección',
                            price: 170
                        }
                    },
                    sandwiches: {
                        jamonyqueso: {
                            name: 'Jamón y Queso',
                            description: 'Sandwich de jamón y queso',
                            price: 45
                        },
                        bondiola: {
                            name: 'Bondiola',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pollo: {
                            name: 'Pollo',
                            description: 'Sandwich de jamón y queso',
                            price: 50
                        },
                        jamoncrudotomateyqueso: {
                            name: 'Jamon crudo, tomate y queso',
                            description: 'Sandwich de jamón y queso',
                            price: 70
                        },
                        pescado: {
                            name: 'Pescado',
                            description: 'Sandwich de jamón y queso',
                            price: 120
                        }
                    },
                    pastas: {
                        ravioles: {
                            name: 'Ravioles',
                            description: 'Ravioles de Ricota y pollo',
                            price: 60
                        },
                        anolotis: {
                            name: 'Añolotis',
                            description: 'Añolotis de Ricota y pollo',
                            price: 60
                        },
                        noquis: {
                            name: 'Ñoquis',
                            description: 'Ñoquis de papa',
                            price: 60
                        },
                        fideos: {
                            name: 'Fideos',
                            description: 'Fideos',
                            price: 40
                        }
                    },
                    bebidas: {
                        cocacola: {
                            name: 'Coca Cola',
                            description: 'Coca Cola de 1 litro',
                            price: 75
                        },
                        sevenup: {
                            name: 'Seven Up',
                            description: 'Seven Up de 1 litro',
                            price: 60
                        },
                        fanta: {
                            name: 'Fanta',
                            description: 'Fanta de 1 litro',
                            price: 55
                        },
                        vinoblanco: {
                            name: 'Vino Blanco',
                            description: 'Vino Blanco Santa Ana',
                            price: 140
                        },
                        cervezaquilmes: {
                            name: 'Cerveza Quilmes',
                            description: 'Cerveza Quilmes de 2 litros',
                            price: 100
                        },
                        cervezaimperial: {
                            name: 'Cerveza Imperial',
                            description: 'Cerveza Imperial de 2 litros',
                            price: 70
                        }
                    }
                }
            }
        ]
    }
});