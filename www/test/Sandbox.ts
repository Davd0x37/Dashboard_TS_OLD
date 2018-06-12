interface IXD {
    [key: string]: (parent: any, args: any, context: {}, info: any) => any
}

const names: IXD = {
    Lol: (parent: any, args: any, context: {}, info: any) => {
        return 'xd'
    }
}