export default class RandomUtil {

    static pickRandomItems = (arr, count) => {
        let items = []
        for (let i = 0; i < count; i++) {
            let index = this.getRandomInt(arr.length);
            let item = arr.splice(index, 1)[0];
            items.push(item);
        }
        return items;
    }

    static getRandomInt = (max) => {
        return this.getRandomIntRange(0, max);
    }

    static getRandomIntRange = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }
}