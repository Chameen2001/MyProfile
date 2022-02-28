function Customer(c_id,name,address,telephone){
    var cus_id=c_id;
    var cus_name=name;
    var cus_address=address;
    var cus_telephone=telephone;

    this.setCId = function(c_id){
        cus_id=c_id
        cus_name=name;
        cus_address=address;
        cus_telephone=telephone;
    }

    this.getCID = function(){
        return cus_id;
    } 

    this.setName = function(name){
        cus_name=name;
    }

    this.getName = function(){
        return cus_name;
    }

    this.setAddress = function(address){
        cus_address=address;
    }

    this.getAddress = function(){
        return cus_address;
    } 

    this.setTelephone = function(telephone){
        cus_telephone=telephone;
    }

    this.getTelephone = function(){
        return cus_telephone;
    }

}