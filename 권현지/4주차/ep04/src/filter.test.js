import { describe, it, expect } from 'vitest';
import { posts } from './data';

describe('filter method - simple', () => {
  it('gets positive numbers', () => {
    const numbers = [1, -2, 3, -4, 5];

    // TODO: do something here
    const positiveNumbers = [];
    expect(positiveNumbers).toEqual([1, 3, 5]);
  });

  it('gets employees in Sales department', () => {
    const employees = [
      { name: 'John', age: 30, department: 'Sales' },
      { name: 'Jane', age: 35, department: 'Development' },
      { name: 'Jim', age: 40, department: 'Sales' },
    ];

    // TODO: do something here
    const salesEmployees = [];
    expect(salesEmployees).toEqual([
      { name: 'John', age: 30, department: 'Sales' },
      { name: 'Jim', age: 40, department: 'Sales' },
    ]);
  });

  it('gets employees over 35 in Marketing department', () => {
    const employees = [
      { name: 'John', age: 30, department: 'Sales' },
      { name: 'Jane', age: 35, department: 'Development' },
      { name: 'Jim', age: 40, department: 'Marketing' },
    ];

    // TODO: do something here
    const salesEmployeesOver35 = [];
    expect(salesEmployeesOver35).toEqual([{ name: 'Jim', age: 40, department: 'Marketing' }]);
  });

  it('gets employees in Sales or Development department', () => {
    const employees = [
      { name: 'John', age: 30, department: 'Sales' },
      { name: 'Jane', age: 35, department: 'Development' },
      { name: 'Jim', age: 40, department: 'Marketing' },
    ];

    const targetDepartments = ['Sales', 'Development'];

    // TODO: do something here
    const salesOrDevEmployees = [];
    expect(salesOrDevEmployees).toEqual([
      { name: 'John', age: 30, department: 'Sales' },
      { name: 'Jane', age: 35, department: 'Development' },
    ]);
  });
});

describe('filter method - real world', () => {
  it('gets posts from this year', () => {
    // TODO: do something here
    const postsThisYear = [];
    expect(postsThisYear.length).toBe(10);
  });

  it('gets posts with "culture" tag', () => {
    // TODO: do something here
    const postsWithCultureTag = [];
    expect(postsWithCultureTag.length).toBe(16);
  });

  it('gets tweets posted after 10pm', () => {
    // hint:
    // new Date('2023-02-03T21:10:00.000Z').toLocaleString('fr-FR')
    //
    // TODO: do something here
    const tweetsPostedAfter10pm = [];
    expect(tweetsPostedAfter10pm.length).toBe(5);
  });
});
