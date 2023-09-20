import { test, describe, jest, afterEach } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { Post } from '../types';
import { sortPostsByPublishedDate } from '../sorting';


describe('sorting posts by publishedAt', () => {
    const first: Post = { publishedAt: '2022-06-01T08:07:20.410Z', title: 'Posted January 2022' } as Post;
    const second: Post = { publishedAt: '2023-06-01T08:07:20.410Z', title: 'Posted January 2023' } as Post;
    const third: Post = { publishedAt: '2023-12-01T08:07:20.410Z', title: 'Posted December 2023' } as Post;

    const unordered = [third, first, second];

    afterEach(() => {
        jest.resetAllMocks(); // reset mocks to restore original behaviour of Array.sort
    });

    test('post are returned in correct order', () => {
        let sorted = sortPostsByPublishedDate(unordered);

        assert.deepEqual(sorted, [first, second, third]);
    });

    test('sorting handles posts with identical dates correctly', () => {
        let samePostsTwice = [...unordered, ...unordered];
        let sorted = sortPostsByPublishedDate(samePostsTwice);

        assert.deepEqual(sorted, [first, first, second, second, third, third]);
    });

    test('sorting an empty array should not throw exceptions', () => {
        let sorted = sortPostsByPublishedDate([]);

        assert.deepEqual(sorted, []);
    });

    test('sorting should not modify the original array', () => {
        sortPostsByPublishedDate(unordered);

        assert.deepEqual(unordered, [third, first, second]);
    });

    test('sorting posts must not utilize Array.sort', () => {
        // this function will replace `Array.sort` and throw an exception if called:
        let notAllowed = (compareFn?: ((a: any, b: any) => number)): any[] => {
            throw new Error('Using Array.sort is not allowed in the exercise!');
        };

        // if Array.sort is called inside the function, an error will be thrown
        jest.spyOn(Array.prototype, 'sort').mockImplementation(notAllowed);

        sortPostsByPublishedDate(unordered);

        assert.ok(true, 'Array.sort was not called');
    });
});
