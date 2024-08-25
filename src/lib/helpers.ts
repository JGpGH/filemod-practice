export function symbolicToNumeric(symbolic: string): string {
    const segments = symbolic.match(/.{1,3}/g) || []; // Split into groups of three
    return segments.map(segment => {
        let value = 0;
        if (segment.includes('r')) value += 4;
        if (segment.includes('w')) value += 2;
        if (segment.includes('x')) value += 1;
        return value;
    }).join('');
}

export function numericToSymbolic(numeric: string): string {
    return numeric.split('').map(digit => {
        const value = parseInt(digit);
        return (value & 4 ? 'r' : '-') +
                (value & 2 ? 'w' : '-') +
                (value & 1 ? 'x' : '-');
    }).join('');
}