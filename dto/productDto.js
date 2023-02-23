module.exports = class ProductDto {
    title;
    desc;
    price;
    floorArea;
    rooms;
    furniture;
    baths;
    elevator;
    address;
    city;
    region;
    newBuilding;
    floorsCount;
    currentFloor;
    ceilingHeight;
    balcony;
    plotArea;
    buildingType;

    constructor(model) {
        this.title = model.title;
        this.desc = model.desc;
        this.price = model.price;
        this.floorArea = model.floorArea;
        this.rooms = model.rooms;
        this.furniture = model.furniture;
        this.baths = model.baths;
        this.elevator = model.elevator;
        this.address = model.address;
        this.city = model.city;
        this.region = model.region;
        this.newBuilding = model.newBuilding;
        this.floorsCount = model.floorsCount;
        this.currentFloor = model.currentFloor;
        this.ceilingHeight = model.ceilingHeight;
        this.balcony = model.balcony;
        this.plotArea = model.plotArea;
        this.buildingType = model.buildingType;
    }
}