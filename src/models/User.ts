export interface User {
    id: number;
    want_to_back: boolean;
    user_information: {
        name: string;
        last_name: string | undefined;
    };
}