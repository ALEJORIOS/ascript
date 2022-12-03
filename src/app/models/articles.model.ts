export interface Coords {
    x: number,
    y: number
}

export interface RightClickSubject {
    name: string,
    coords: {x: number, y: number},
    data: any
}