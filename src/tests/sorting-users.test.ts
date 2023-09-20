import { test, describe, jest, afterEach } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { User } from '../types';
import { sortUsersByRegistrationDate } from '../sorting';


describe('sorting users by registration date', () => {
    const string2020: User = { firstName: 'Jim', registeredAt: '2020-06-01T08:07:20.410Z' } as User;
    const string2022: User = { firstName: 'Pam', registeredAt: '2022-06-01T08:07:20.410Z' } as User;
    const string2024: User = { firstName: 'Michael', registeredAt: '2024-06-01T08:07:20.410Z' } as User;

    const numeric2021: User = { firstName: 'Dwight', registeredAt: 1609459200 } as User;
    const numeric2023: User = { firstName: 'Ryan', registeredAt: 1672531200 } as User;
    const numeric2025: User = { firstName: 'Andy', registeredAt: 1735689600 } as User;


    test('users with Unix timestamps are sorted in correct order', () => {
        const unordered = [numeric2025, numeric2021, numeric2023];

        let sorted = sortUsersByRegistrationDate(unordered);

        assert.deepEqual(sorted, [numeric2021, numeric2023, numeric2025]);
    });

    test('users with ISO dates are sorted in correct order', () => {
        const unordered = [string2024, string2020, string2022];

        let sorted = sortUsersByRegistrationDate(unordered);

        assert.deepEqual(sorted, [string2020, string2022, string2024]);
    });

    test('users with both numeric and string dates are sorted in correct order', () => {
        const unordered = [string2024, numeric2025, string2020, numeric2023, string2022, numeric2021];

        let sorted = sortUsersByRegistrationDate(unordered);

        assert.deepEqual(sorted, [string2020, numeric2021, string2022, numeric2023, string2024, numeric2025]);
    });

    test('sorting handles posts with identical dates without errors', () => {
        let sameUserTwice = [string2020, string2020];
        let sorted = sortUsersByRegistrationDate(sameUserTwice);

        assert.deepEqual(sorted, [string2020, string2020]);
    });

    test('sorting an empty array must not throw exceptions', () => {
        let sorted = sortUsersByRegistrationDate([]);

        assert.deepEqual(sorted, []);
    });

    test('sorting must not modify the users', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
        const original = [Object.freeze(string2022), Object.freeze(numeric2021)];

        let sorted = sortUsersByRegistrationDate(original);

        assert.deepEqual(sorted, [numeric2021, string2022]);
    });

    test('sorting must not modify the original array', () => {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
        const original = Object.freeze([string2022, string2020]) as User[];

        sortUsersByRegistrationDate(original);

        assert.deepEqual(original, [string2022, string2020]);
    });
});
