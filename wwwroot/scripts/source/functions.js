import moment from "moment";

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

export const displayDate = date => {
    if(!date) { return null; }
    date = moment(date, "DD.MM.YYYY", true);
    return date.calendar(null, {
        sameDay: "сегодня",
        lastDay: "вчера",
        lastWeek: "dddd",
        sameElse: "DD.MM.YYYY"
    });
};

const debounce = function (func, timeout = 250) {
    let timer;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timer = null;
        func.apply(context, args);
      };
      clearTimeout(timer);
      timer = setTimeout(later, timeout);
    };
};