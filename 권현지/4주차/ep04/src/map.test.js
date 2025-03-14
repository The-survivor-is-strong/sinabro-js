import { describe, it, expect } from 'vitest';

describe('map method', () => {
  it('squares the elements', () => {
    const numbers = [1, 2, 3, 4, 5];
    // TODO: do something here
    const squares = [];
    expect(squares).toEqual([1, 4, 9, 16, 25]);
  });

  it('makes strings uppercase', () => {
    const words = ['hello', 'world'];
    // TODO: do something here
    const uppercasedWords = [];
    expect(uppercasedWords).toEqual(['HELLO', 'WORLD']);
  });

  it('extracts user id', () => {
    const users = [
      {
        id: 1,
        name: 'a',
      },
      {
        id: 2,
        name: 'b',
      },
      {
        id: 3,
        name: 'c',
      },
    ];
    // TODO: do something here
    const userIds = [];
    expect(userIds).toEqual([1, 2, 3]);
  });

  it('extracts title and year', () => {
    const movies = [
      {
        title: 'Rent',
        year: 2005,
        genres: ['Musical', 'Drama'],
      },
      {
        title: 'Tick, Tick... Boom!',
        year: 2021,
        genres: ['Drama', 'Biography'],
      },
    ];
    // TODO: do something here
    const titlesAndYears = [];
    expect(titlesAndYears).toEqual([
      {
        title: 'Rent',
        year: 2005,
      },
      {
        title: 'Tick, Tick... Boom!',
        year: 2021,
      },
    ]);
  });

  it('adds genre property without mutating the source data', () => {
    const movies = [
      {
        title: 'Rent',
        year: 2005,
        genres: ['Musical', 'Drama'],
      },
      {
        title: 'Tick, Tick... Boom!',
        year: 2021,
        genres: ['Drama', 'Biography'],
      },
    ];

    // TODO: do something here
    const movies2 = [];
    expect(movies2).toEqual([
      {
        title: 'Rent',
        year: 2005,
        genres: ['Musical', 'Drama'],
        genre: 'Musical / Drama',
      },
      {
        title: 'Tick, Tick... Boom!',
        year: 2021,
        genres: ['Drama', 'Biography'],
        genre: 'Drama / Biography',
      },
    ]);

    expect(movies[0]).not.toHaveProperty('genre');
  });
});
