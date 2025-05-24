import { BookModel } from "../models/book";

const books = [
  {
    title: "Жизнь взаймы",
    author: "Эрих Мария Ремарк",
    description: "Автор показывает, что смысл романа в восприятии текущей жизни. Лилиан стремилась каждый день проводить с пользой, она наслаждалась жизнью, так как знала, что любая минута может стать последней. Перед смертью девушка поняла, что на самом деле все зависит от нашего отношения к миру.",
    price: 20000,
    photo: "https://images.uzum.uz/cr4ggs7iraat934qo27g/original.jpg"
  },
  {
    title: "Время жить и время умирать",
    author: "Эрих Мария Ремарк",
    description: "Роман о том, как трудно жить в условиях войны. Главный герой, немецкий солдат, возвращается домой после ранения и сталкивается с ужасами войны и ее последствиями. Он пытается найти смысл жизни в мире, где все разрушено.",
    price: 20000,
    photo: "https://images.uzum.uz/co2qb5llqsilsr3lbr70/original.jpg"
  },
  {
    title: "Ночь в Лиссабоне",
    author: "Эрих Мария Ремарк",
    description: "В романе «Ночь в Лиссабоне» Ремарк рассказывает о вечном бегстве эмигрантов, покинувших Германию после прихода к власти фашистов. Спасением для них было попасть на корабль, отплывающий из Европы в Америку: «Каждое судно, покидавшее Европу в эти месяцы 1942 года, было ковчегом.",
    price: 20000,
    photo: "https://static.sello.uz/unsafe/x1600/https://static.sello.uz//fm/20220818/97e68ff5-1e2d-4cc0-8648-2f1a00e9a532.PNG"
  }
];

export const createBook = async () => {
  try {
    for (const book of books) {
      const findExists = await BookModel.findOne({ title: book.title }, "_id");

      if (findExists) {
        continue;
      }

      await BookModel.create({ ...book });
      console.log(`Book ${book.title} created!`);
    }
  } catch (error) {
    console.error(error);
  }
};