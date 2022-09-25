export async function sleep(miliseconds: number): Promise<unknown> {
    return new Promise((resolve) => {
        setTimeout(resolve, miliseconds);
    });
}

export type MenuItem = {
    title: string;
    route: string;
    class: string;
}
