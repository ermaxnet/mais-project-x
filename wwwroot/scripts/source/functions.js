export const svgIcon = name => {
    return `
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/icons.svg#${name}"></use>`;
};

export const groupBy = (array, func) => {
    const groups = new Map();
    if(array instanceof Array) {
        array.forEach(item => {
            const key = func(item);
            groups.has(key)
                ? groups.get(key).push(item)
                : groups.set(key, [ item ]);
        });
    }
    return groups;
};