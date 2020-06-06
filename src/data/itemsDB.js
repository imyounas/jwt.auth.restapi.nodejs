
let _items = [
{id:1, name:"cycle", price:30, category:'T'},
{id:2, name:"car", price:9000,category:'T'},
{id:3, name:"computer", price:300,category:'O'},
{id:4, name:"pen", price:3, category:'O'}
];

module.exports = class ItemsDB {
   
    static get items() { return _items; }
}