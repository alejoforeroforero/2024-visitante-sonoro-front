import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Author from './models/Author.js';
import Recording from './models/Recording.js';

dotenv.config();

const categories = [
  { name: 'Paisajes Sonoros', slug: 'paisajes-sonoros', description: 'Grabaciones de ambientes naturales y urbanos' },
  { name: 'Entrevistas', slug: 'entrevistas', description: 'Conversaciones con artistas y comunidades' },
  { name: 'Música', slug: 'musica', description: 'Grabaciones musicales y composiciones' },
  { name: 'Historias', slug: 'historias', description: 'Relatos y narrativas orales' }
];

const authors = [
  {
    name: 'María González',
    bio: 'Artista sonora y antropóloga. Explora la relación entre sonido y memoria colectiva en comunidades rurales.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'
  },
  {
    name: 'Carlos Mendoza',
    bio: 'Músico y productor. Documenta sonidos tradicionales de comunidades campesinas del eje cafetero.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'
  },
  {
    name: 'Ana Ruiz',
    bio: 'Investigadora de paisajes sonoros rurales y tradiciones orales del Tolima.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400'
  },
  {
    name: 'Jorge Betancur',
    bio: 'Etnomusicólogo especializado en músicas del Caribe colombiano. Documenta ritmos de cumbia y porro.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    name: 'Luisa Fernanda Torres',
    bio: 'Productora de radio comunitaria. Recoge historias y testimonios de comunidades afrodescendientes del Chocó.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    name: 'Pedro Martínez',
    bio: 'Biólogo acústico que estudia los ecosistemas sonoros de los Llanos Orientales.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  },
  {
    name: 'Daniela Vargas',
    bio: 'Artista sonora experimental. Trabaja con grabaciones de campo en espacios urbanos de Medellín.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  },
  {
    name: 'Hernán Ospina',
    bio: 'Historiador oral que preserva relatos campesinos del Huila y Caquetá.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  }
];

const audios = [
  'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a9/Tromboon-sample.ogg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6e/Micronesia_National_Anthem.ogg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5b/Ludwig_van_Beethoven_-_Symphonie_5_c-moll_-_1._Allegro_con_brio.ogg',
  'https://upload.wikimedia.org/wikipedia/commons/5/5d/%22Into_the_Oceans_and_the_Air%22.ogg',
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/%22six-seven%22.ogg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d2/Himno_a_Manab%C3%AD.ogg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3d/Explanatory_Fauna_Extraction_Theme_Music.ogg'
];

const recordings = [
  {
    title: 'Amanecer en el páramo',
    description: 'Grabación del amanecer en el páramo de Sumapaz. Se escuchan aves endémicas y el viento característico de la zona.',
    audio: audios[0],
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800',
    duration: 180,
    location: { lat: 4.0251, lng: -74.1310 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'María González'
  },
  {
    title: 'Mercado campesino de Silvia',
    description: 'Los sonidos del mercado indígena Guambiano en Silvia, Cauca. Vendedores, compradores y el bullicio de la mañana.',
    audio: audios[1],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    duration: 240,
    location: { lat: 2.6125, lng: -76.3781 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Ana Ruiz'
  },
  {
    title: 'Don Pedro cuenta su historia',
    description: 'Entrevista con Don Pedro, campesino cafetero de 85 años que recuerda cómo era la vida en el campo hace décadas.',
    audio: audios[2],
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800',
    duration: 420,
    location: { lat: 5.0689, lng: -75.5174 },
    categoryName: 'Entrevistas',
    authorName: 'Carlos Mendoza'
  },
  {
    title: 'Tambores del Pacífico',
    description: 'Sesión de tambores tradicionales grabada en Tumaco. Ritmos ancestrales del currulao y la marimba de chonta.',
    audio: audios[3],
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800',
    duration: 300,
    location: { lat: 1.8064, lng: -78.7644 },
    categoryName: 'Música',
    authorName: 'Carlos Mendoza'
  },
  {
    title: 'La leyenda del Mohán',
    description: 'Relato tradicional del Mohán contado por una abuela del Tolima. Historia de la tradición oral colombiana junto al río Magdalena.',
    audio: audios[4],
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800',
    duration: 360,
    location: { lat: 4.4389, lng: -75.2322 },
    categoryName: 'Historias',
    authorName: 'María González'
  },
  {
    title: 'Noche de ranas en la selva',
    description: 'Grabación nocturna en el Amazonas colombiano. El coro de ranas y los sonidos de la selva tropical cerca de Leticia.',
    audio: audios[5],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    duration: 200,
    location: { lat: -4.2153, lng: -69.9406 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Ana Ruiz'
  },
  {
    title: 'Gaitas en San Jacinto',
    description: 'Sesión de gaitas tradicionales en San Jacinto, Bolívar. Músicos locales interpretan ritmos ancestrales.',
    audio: audios[6],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    duration: 280,
    location: { lat: 9.8306, lng: -75.1247 },
    categoryName: 'Música',
    authorName: 'Jorge Betancur'
  },
  {
    title: 'Amanecer en el río Atrato',
    description: 'Paisaje sonoro del amanecer en el río Atrato, Chocó. Aves, agua y el despertar de la selva chocoana.',
    audio: audios[7],
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800',
    duration: 320,
    location: { lat: 5.6919, lng: -76.6583 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Luisa Fernanda Torres'
  },
  {
    title: 'Cantos de trabajo en el Chocó',
    description: 'Mujeres cantando cantos de boga mientras trabajan en Quibdó. Tradición oral afrodescendiente.',
    audio: audios[4],
    image: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?w=800',
    duration: 240,
    location: { lat: 5.6947, lng: -76.6611 },
    categoryName: 'Música',
    authorName: 'Luisa Fernanda Torres'
  },
  {
    title: 'Llanos al atardecer',
    description: 'Grabación del atardecer en los Llanos Orientales cerca de Villavicencio. Chicharras, pájaros y ganado.',
    audio: audios[5],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    duration: 260,
    location: { lat: 4.1420, lng: -73.6266 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Pedro Martínez'
  },
  {
    title: 'Joropo en Arauca',
    description: 'Parranderos tocando joropo en una finca de Arauca. Arpa, cuatro y maracas en su máxima expresión.',
    audio: audios[6],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    duration: 340,
    location: { lat: 7.0847, lng: -70.7592 },
    categoryName: 'Música',
    authorName: 'Pedro Martínez'
  },
  {
    title: 'Metro de Medellín',
    description: 'Paisaje sonoro del sistema Metro de Medellín. Voces, trenes y la vida urbana paisa.',
    audio: audios[7],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    duration: 180,
    location: { lat: 6.2518, lng: -75.5636 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Daniela Vargas'
  },
  {
    title: 'Historias de Comuna 13',
    description: 'Testimonios de habitantes de la Comuna 13 sobre la transformación de su barrio.',
    audio: audios[2],
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
    duration: 480,
    location: { lat: 6.2469, lng: -75.6167 },
    categoryName: 'Historias',
    authorName: 'Daniela Vargas'
  },
  {
    title: 'Cumbia en Barranquilla',
    description: 'Ensayo de una agrupación de cumbia tradicional en el barrio Rebolo de Barranquilla.',
    audio: audios[3],
    image: 'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=800',
    duration: 300,
    location: { lat: 10.9639, lng: -74.7964 },
    categoryName: 'Música',
    authorName: 'Jorge Betancur'
  },
  {
    title: 'Carnaval de Barranquilla',
    description: 'Sonidos del desfile de la Batalla de Flores. Papayeras, comparsas y el fervor del carnaval.',
    audio: audios[0],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    duration: 420,
    location: { lat: 10.9878, lng: -74.7889 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Jorge Betancur'
  },
  {
    title: 'Relatos del Caquetá',
    description: 'Historias de colonización y vida campesina contadas por abuelos en Florencia.',
    audio: audios[1],
    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=800',
    duration: 540,
    location: { lat: 1.6144, lng: -75.6062 },
    categoryName: 'Historias',
    authorName: 'Hernán Ospina'
  },
  {
    title: 'Desierto de la Tatacoa',
    description: 'Grabación nocturna en el desierto de la Tatacoa. Silencio, viento y cielo estrellado.',
    audio: audios[3],
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800',
    duration: 220,
    location: { lat: 3.2319, lng: -75.1711 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Hernán Ospina'
  },
  {
    title: 'Sanjuanero en Neiva',
    description: 'Festival del Bambuco en Neiva. Parejas bailando sanjuanero y música de rajaleña.',
    audio: audios[0],
    image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800',
    duration: 280,
    location: { lat: 2.9273, lng: -75.2819 },
    categoryName: 'Música',
    authorName: 'Hernán Ospina'
  },
  {
    title: 'Costa de Santa Marta',
    description: 'Olas y brisa marina en Taganga. El sonido del mar Caribe colombiano.',
    audio: audios[1],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    duration: 200,
    location: { lat: 11.2683, lng: -74.1914 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Jorge Betancur'
  },
  {
    title: 'Alabaos del Pacífico',
    description: 'Cantos fúnebres tradicionales grabados en Buenaventura. Voces que honran a los ancestros.',
    audio: audios[2],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    duration: 360,
    location: { lat: 3.8801, lng: -77.0311 },
    categoryName: 'Música',
    authorName: 'Luisa Fernanda Torres'
  },
  {
    title: 'Café de la mañana en Armenia',
    description: 'Sonidos de una finca cafetera al amanecer. Pájaros, trabajo rural y el aroma del café.',
    audio: audios[3],
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
    duration: 240,
    location: { lat: 4.5339, lng: -75.6811 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Carlos Mendoza'
  },
  {
    title: 'La abuela cuenta del Sombrerón',
    description: 'Leyenda tradicional del Sombrerón contada en una vereda de Boyacá.',
    audio: audios[0],
    image: 'https://images.unsplash.com/photo-1516822003754-cca485356ecb?w=800',
    duration: 400,
    location: { lat: 5.5353, lng: -73.3678 },
    categoryName: 'Historias',
    authorName: 'María González'
  },
  {
    title: 'Procesión de Semana Santa en Popayán',
    description: 'Grabación de las procesiones nocturnas de Semana Santa. Sahumadoras, música sacra y pasos.',
    audio: audios[1],
    image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800',
    duration: 320,
    location: { lat: 2.4419, lng: -76.6061 },
    categoryName: 'Paisajes Sonoros',
    authorName: 'Ana Ruiz'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    await Category.deleteMany({});
    await Author.deleteMany({});
    await Recording.deleteMany({});
    console.log('Datos anteriores eliminados');

    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categorías creadas`);

    const createdAuthors = await Author.insertMany(authors);
    console.log(`${createdAuthors.length} autores creados`);

    const categoryMap = {};
    createdCategories.forEach(c => categoryMap[c.name] = c._id);

    const authorMap = {};
    createdAuthors.forEach(a => authorMap[a.name] = a._id);

    const recordingsToInsert = recordings.map(r => ({
      title: r.title,
      description: r.description,
      audio: r.audio,
      image: r.image,
      duration: r.duration,
      location: r.location,
      category: categoryMap[r.categoryName],
      author: r.authorName,
      author_id: authorMap[r.authorName]
    }));

    const createdRecordings = await Recording.insertMany(recordingsToInsert);
    console.log(`${createdRecordings.length} grabaciones creadas`);

    for (const author of createdAuthors) {
      const authorRecordings = createdRecordings.filter(
        r => r.author_id.toString() === author._id.toString()
      );
      author.recordings = authorRecordings.map(r => r._id);
      await author.save();
    }
    console.log('Referencias de grabaciones actualizadas en autores');

    console.log('\nSeed completado exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('Error en seed:', error);
    process.exit(1);
  }
}

seed();
