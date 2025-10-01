// Importar dependencias
const fs = require('fs');
const { faker } = require('@faker-js/faker');

const NUM_FEATURED = 50;
const NUM_NORMAL = 50;

const generateHotel = (idSeed) => {
  const hotelId = faker.string.uuid();
  return {
    id: hotelId,
    name: `Hotel ${faker.word.words(2)}`,
    image: `https://picsum.photos/seed/${idSeed}/240/180`,
    address: faker.location.streetAddress(),
    stars: faker.number.int({ min: 1, max: 5 }),
    rate: parseFloat(faker.number.float({ min: 0, max: 5, fractionDigits: 1 })),
    price: faker.number.float({ min: 50, max: 1000, fractionDigits: 2 }),
  };
};

const generateHotels = () => {
  const hotels = [];

  // Hoteles destacados
  for (let i = 0; i < NUM_FEATURED; i++) {
    hotels.push(generateHotel(`featured-${i}`));
  }

  // Hoteles normales
  for (let i = 0; i < NUM_NORMAL; i++) {
    hotels.push(generateHotel(`normal-${i}`));
  }

  return hotels;
};

const generateDb = () => {
  const data = {
    hotels: generateHotels(),
  };

  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
  console.log('db.json generado con éxito');
};

generateDb();
