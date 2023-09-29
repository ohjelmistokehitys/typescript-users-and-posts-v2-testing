import { test, describe, jest, afterEach, expect } from '@jest/globals';
import { strict as assert } from 'node:assert';
import { User } from '../types';
import { sortUsersByRegistrationDate } from '../sorting';

// These should not be used outside of the package except for testing.
// https://stackoverflow.com/a/54116079
import { exportedForTesting } from '../sorting';
const { compareUsers, normalizeTime } = exportedForTesting;


// Test data for testing users that have an ISO formatted registered at time:
const string2020: User = { firstName: 'Jim', registeredAt: '2020-06-01T08:07:20.410Z' } as User;
const string2022: User = { firstName: 'Pam', registeredAt: '2022-06-01T08:07:20.410Z' } as User;
const string2024: User = { firstName: 'Michael', registeredAt: '2024-06-01T08:07:20.410Z' } as User;

// Test data for testing users that have an Unix timestamp as registered at at time:
const numeric2021: User = { firstName: 'Dwight', registeredAt: 1609459200 } as User;
const numeric2023: User = { firstName: 'Ryan', registeredAt: 1672531200 } as User;
const numeric2025: User = { firstName: 'Andy', registeredAt: 1735689600 } as User;

describe('comparing two users with numeric times', () => {
    test('returns negative if u1 < u2', () => {
        let result = compareUsers(numeric2021, numeric2023);
        assert.ok(result < 0);
    });

    test('returns zero if equal', () => {
        let result = compareUsers(numeric2021, numeric2021);
        assert.ok(result === 0);
    });

    test('returns positive if u1 > u2', () => {
        let result = compareUsers(numeric2023, numeric2021);
        assert.ok(result > 0);
    });
});

describe('comparing two users with iso formatted times', () => {
    test('returns negative if u1 < u2', () => {
        let result = compareUsers(string2020, string2022);
        assert.ok(result < 0);
    });

    test('returns zero if equal', () => {
        let result = compareUsers(string2022, string2022);
        assert.ok(result === 0);
    });

    test('returns positive if u1 > u2', () => {
        let result = compareUsers(string2024, string2022);
        assert.ok(result > 0);
    });
});

describe('comparing two users with iso mixed registered at types', () => {
    test('returns negative if u1 < u2', () => {
        assert.ok(compareUsers(string2020, numeric2021) < 0);
        assert.ok(compareUsers(numeric2021, string2022) < 0);
    });

    test('returns zero if equal', () => {
        const isoTime = { registeredAt: '2021-09-21T12:00:00Z' } as User;
        const unixTime = { registeredAt: 1632225600 } as User;

        assert.ok(compareUsers(isoTime, unixTime) === 0);
    });

    test('returns positive if u1 > u2', () => {
        assert.ok(compareUsers(numeric2021, string2020) > 0);
        assert.ok(compareUsers(string2022, numeric2021) > 0);
    });
});

describe('normalizeTime', () => {
    test('converts numbers to exactly same numbers', () => {
        let time = normalizeTime(1609459200);
        assert.equal(time, 1609459200);
    });
    test('converts iso strings to unix time', () => {
        let time = normalizeTime('2021-09-21T12:00:00Z');
        assert.equal(time, 1632225600);
    });
});

describe('sorting users by registration date', () => {

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
