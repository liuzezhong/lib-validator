export default function Validate(option: any): any {
    return function(target: any, name: any, descriptor: any): any {
        // @ts-ignore
        const original: any = descriptor.value;
        descriptor.value = async function(...args: any[]): Promise<any> {
            console.log('start to check.');
            const returnRes: any = await original.apply(this, args);
            return returnRes;
        };
    };
}
