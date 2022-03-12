function Order(id,custId,date,price){
    var order_id=id;
    var cust_id=custId;
    var date_time=date;
    var total_price=price;
    

    this.get_order_id = function (){
        return order_id;
    }

    this.set_order_id = function (id){
        order_id=id;
    }
     
    this.get_cust_id = function (){
        return cust_id;
    }

    this.set_cust_id = function (cid){
        cust_id=id;
    }

    
    this.get_date_time = function (){
        return date_time;
    }

    this.set_date_time = function (date){
        date_time=date;
    }
     
    this.get_total_price = function (){
        return total_price;
    }

    this.set_total_price = function (price){
        total_price=price;
    }
}