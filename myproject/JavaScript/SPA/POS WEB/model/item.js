function Item(id,name,quantity,price,image){
    var item_id=id;
    var item_name=name;
    var item_quantity=quantity;
    var item_price=price;
    var item_image=image;

    this.get_item_id = function (){
        return item_id;
    }

    this.set_item_id = function (id){
        item_id=id;
    }
     
    this.get_item_name = function (){
        return item_name;
    }

    this.set_item_name = function (name){
        item_name=name;
    }

    
    this.get_item_quantity = function (){
        return item_quantity;
    }

    this.set_item_quantity = function (quantity){
        item_quantity=quantity;
    }
     
    this.get_item_price = function (){
        return item_price;
    }

    this.set_item_price = function (price){
        item_price=price;
    }

    this.get_item_image = function (){
        return item_image;
    }

    this.set_item_image = function (image){
        item_image=image;
    }
}