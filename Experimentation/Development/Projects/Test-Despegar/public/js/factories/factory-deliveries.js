app.factory('deliveries', function() {
    return {
        items: [
            {
                name: 'Peru World',
                description: 'Restaurante Peruano',
                meals: ['pizza','lasagna','salmón','asado','ceviche']
            },
            {
                name: 'La Guarida',
                description: 'Restaurante Mexicano',
                meals: ['pizza','lasagna','salmón','asado']
            },
            {
                name: 'El asador',
                description: 'Parrilla',
                meals: ['pizza','lasagna','salmón']
            },
            {
                name: 'Italian Village',
                description: 'Comida Italiana',
                meals: ['pizza','lasagna']
            },
            {
                name: 'Greek World',
                description: 'Comida Griega',
                meals: ['pizza']
            },
            {
                name: 'El club de la Milanesa',
                description: 'Solo Milanesas',
                meals: ['milanesas']
            }
        ]
    }
});