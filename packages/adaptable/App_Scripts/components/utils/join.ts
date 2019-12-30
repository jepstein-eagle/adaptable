const join = (...args: any[]): string => args.filter(x => !!x).join(' ');

export default join;
