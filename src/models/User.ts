/**
 * Basic TypeScript interface for User model
 * @property {number} id - User's unique identifier
 * @property {boolean} want_to_back - Indicates if user wants to back to main queue
 * @property {object} user_information - Contains user's name and last name
 */

export interface User {
    id: number;
    want_to_back: boolean;
    user_information: {
        name: string;
        last_name: string | undefined;
    };
}