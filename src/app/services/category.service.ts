import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories = [
    {
      title: 'TV series',
      movies: ['The office', 'Game of thrones', 'Severance', 'The Haunting of Hill House', 'The expanse', 'Ted Lasso', 'Silo']
    },
    {
      title: 'Drama',
      movies: ['This is us', 'YellowJackets', 'Oldboy', 'Sound of freedom', 'life is beautiful', 'Sound of Metal', 'Spotlight']
    },
    {
      title: 'Comedy',
      movies: ['Ted Lasso', 'Barry', 'Abbott Elementary', 'Airplane!', 'Mr. Bean', 'Jury Duty', 'Beef', 'Tropic Thunder', 'Ace Ventura: Pet Detective', 'The 40 Year Old Virgin', 'Date Night']
    },
    {
      title: 'Classic',
      movies: ['The Breakfast Club', 'Small Soldiers', 'Alien', 'The Terminator', 'Requiem for a Dream', 'Patch Adams', 'Police Academy', 'A Night at the Roxbury', 'The Mask', 'Dirty Dancing', 'Ghost', 'Dinosaurs', 'The Nutty Professor', 'Beetlejuice']
    },
    {
      title: 'Anime',
      movies: ['One Piece', 'Pluto', 'Attack on titan', 'Fullmetal Alchemist: Brotherhood', 'Vinland Saga', 'Demon Slayer: Kimetsu no Yaiba', 'Puella Magi Madoka Magica', 'Cowboy Bebop', 'Erased', 'Ajin', 'Boku no hîrô akademia', 'Jujutsu Kaisen', 'Spirited Away', 'Yu yu hakusho' ,'Howl`s Moving Castle', 'Tokyo Revengers', 'Spy x Family', 'Your name.', 'Totoro', 'Chainsaw Man']
    },
    {
      title: 'Dorama',
      movies: ['Mr. Sunshine', 'Bulgasal', 'Hometown Cha-Cha-Cha', 'Sweet home', 'All of Us Are Dead']
    },
    {
      title: 'Reality Show',
      movies: ['Physical: 100', 'Love Village', 'Single`s inferno', 'School of Chocolate', 'The Curious Creations of Christine McConnell']
    },
    {
      title: 'Cosmic horror',
      movies: ['Annihilation', 'The Endless', 'Color out of space', 'Underwater', 'Cloverfield']
    },
    {
      title: 'Cults',
      movies: ['Hereditary', 'Midsommar', 'The invitation', 'The Village', 'Resolution', 'The Endless']
    },
    {
      title: 'Apocalypse',
      movies: ['Knock at the Cabin', 'Knowing', 'Signs', '2012', 'Train to Busan', 'The Happening', 'War of the Worlds']
    },
    {
      title: 'Time Travel',
      movies: ['Interstellar', 'Predestination', 'Deja Vu', 'Edge of Tomorrow', 'Source Code', 'Coherence', 'The Butterfly Effect', 'The Terminator']
    },
    {
      title: 'Terror',
      movies: ['The Witch', 'Gerald\'s Game', 'Us', 'Hellraiser', 'Split', 'Nope', 'Get out', 'The Black Phone', 'when evil lurks','The Visit', 'Hellraiser', 'The Fly']
    },
  ];
}
