export type SalleType = 'grey'|'green'|'red';

export type SalleInfo = {
    class: SalleType;
    time?: Date;
};

export type SalleData = {
    error: string;
    until: number;
    state: boolean;
};
