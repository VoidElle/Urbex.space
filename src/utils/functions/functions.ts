export function parseSerializable(data: any): any {
    const jsonString: string = JSON.stringify(data);
    return JSON.parse(jsonString);
}