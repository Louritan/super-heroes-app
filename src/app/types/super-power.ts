export interface ISuperPower {
    id: number;
    name: string;
    description: string;
}

export type RegisterSuperPower = Omit<ISuperPower, 'id'>
