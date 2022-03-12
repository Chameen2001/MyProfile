var refresh_customer_cmb = function () {
  
  $("#cust-list").empty();
  $("#cust-list").append(`<li class="cus-option"><img src="" alt=""/><p>None</p></li>`);
  for (let index = 0; index < customers.length; index++) {
    console.log("callded");
    var raw =`<li class="cus-option">
    <img
      src="https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png"
      alt=""
    />
    <p>${customers[index].getName()} (${customers[index].getCID()})</p>
  </li>`;
      
    $("#cust-list").append(raw);
    var cus_option = $(".cus-option");
    

    for (const iterator of cus_option) {
      $(iterator).off();
      $(iterator).on("click", function () {
        $("#selectText").text($(this).text());
        $("#cust-list").toggleClass("cus-hide");
        $("#arrowIcn").toggleClass("rotate");
        let o = $(this);
        set_customer_detail(cus_option.index(o)-1);
      });
    }
  }
};




var refresh_item_cmb = function () {
  $("#item-list").empty();
  $("#item-list").append(`<li class="item-option">
  <img
    src=""
    alt=""
  />
  <p>None</p>
</li>`);
  for (let index = 0; index < items.length; index++) {
    var raw =`<li class="item-option">
    <img
      src="${items[index].get_item_image()}"
      alt=""
    />
    <p>${items[index].get_item_name()} (${items[index].get_item_id()})</p>
    </li>`
     
    $("#item-list").append(raw);
    var item_option = $(".item-option");

    for (const iterator of item_option) {
      $(iterator).off();
      $(iterator).on("click", function () {
        $("#item-selectText").text($(this).text());
        $("#item-list").toggleClass("item-hide");
        $("#item-arrowIcn").toggleClass("rotate");
        var o = $(this);
        set_item_detail(item_option.index(o)-1)
        ;
      });
    }
  }
};





var get_index_number_by_item_id=function(id){
  for (let index = 0; index < items.length; index++) {
    if(id==items[index].get_item_id()){
      return index;
    }
  }
  return undefined;
}

var set_customer_detail = function (index) {
  try {
    $("#txt_ph_cust_name").val(customers[index].getName());
    $("#txt_ph_cust_address").val(customers[index].getAddress());
  } catch (ex) {
    console.log(ex.message);
    $("#txt_ph_cust_name").val("");
    $("#txt_ph_cust_address").val("");
  }
};

var set_item_detail = function (index) {
  try {
    $("#txt_ph_item_name").val(items[index].get_item_name());
    $("#txt_ph_item_stock").val(items[index].get_item_quantity());
    $("#txt_ph_item_unit_price").val(items[index].get_item_price());
  } catch (ex) {
    console.log(ex.message);
    $("#txt_ph_cust_name").val("");
    $("#txt_ph_cust_address").val("");
  }
};

// blur unwanted text field
$("#txt_ph_cust_name").attr("disabled", "true");
$("#txt_ph_cust_address").attr("disabled", "true");
$("#txt_ph_item_name").attr("disabled", "true");
$("#txt_ph_item_stock").attr("disabled", "true");
$("#txt_ph_item_unit_price").attr("disabled", "true");

//border size change
$("#txt_ph_item_qty").focus(function () {
  $("#txt_ph_item_qty").css("border-width", "3px");
});

$("#txt_ph_item_qty").blur(function () {
  $("#txt_ph_item_qty").css("border-width", "1px");
});

// check quantity greater than availble
$("#txt_ph_item_qty").on("keyup", function () {
  if (
    parseInt($("#txt_ph_item_qty").val()) >
    parseInt($("#txt_ph_item_stock").val())
  ) {
    $("#txt_ph_item_qty").css("border-color", "red");
  } else if (parseInt($("#txt_ph_item_qty").val()) == 0) {
    $("#txt_ph_item_qty").css("border-color", "red");
  } else {
    $("#txt_ph_item_qty").css("border-color", "green");
  }
});

//add to cart button
$("#btn_add_cart").on("click", function () {
  add_to_cart();
});

//check wheather is exits or no
var isExist = function (itemId) {
  for (let index = 0; index < cart_ar.length; index++) {
    if (cart_ar[index].itemID == itemId) {
      if (
        cart_ar[index].discount == parseInt($("#txt_ph_item_discount").val())
      ) {
        return index;
      }
    }
  }
  return undefined;
};
let cart_data;
// add to cart function
var add_to_cart = function () {
  cart_data = {};
  
  let result = isExist($("#item-selectText").text().split("(")[1].split(")")[0]);

  if (result != undefined) {
    let qty=parseInt($("#txt_ph_item_qty").val());
    let unitPrice=parseInt($("#txt_ph_item_unit_price").val());
    let dsc=parseInt($("#txt_ph_item_discount").val());

    cart_ar[result].qty += parseInt($("#txt_ph_item_qty").val());
    cart_ar[result].sub_total+= qty*unitPrice;
    cart_ar[result].discount_in_rs+=(qty*unitPrice*dsc)/100;
    cart_ar[result].total+=(qty*unitPrice)-(qty*unitPrice*dsc)/100;
  } else {
    cart_data.itemID = $("#item-selectText").text().split("(")[1].split(")")[0];
    cart_data.itemName = $("#item-selectText").text().split(" ")[0];
    cart_data.qty = parseInt($("#txt_ph_item_qty").val());
    cart_data.discount = parseInt($("#txt_ph_item_discount").val());
    cart_data.unitPrice = parseInt($("#txt_ph_item_unit_price").val());

    cart_ar.push(cart_data);
  }

  refresh_cart_table();
  reduce_quantity(
    parseInt($("#txt_ph_item_qty").val()),
    $("#txt_ph_item_stock").val(),
    get_index_number_by_item_id($("#item-selectText").text().split("(")[1].split(")")[0])
  );
  calculate_total(
    parseInt($("#txt_ph_item_qty").val()),
    parseInt($("#txt_ph_item_unit_price").val()),
    parseInt($("#txt_ph_item_discount").val())
  );
};

// calculate dicount sub total and total
let sub_total = 0.0;
let discount = 0.0;
let total = 0.0;
var calculate_total = function (qty, stk, dsc) {
  sub_total += qty * stk;
  discount += (qty * stk * dsc) / 100;
  total = sub_total - discount;

  cart_data.sub_total = qty * stk;
  cart_data.discount_in_rs = (qty * stk * dsc) / 100;
  cart_data.total = qty * stk - (qty * stk * dsc) / 100;

  $("#lbl_sub_total").text("Rs. " + sub_total + ".00");
  $("#lbl_discount").text("Rs. " + discount + ".00");
  $("#lbl_total").text("Rs. " + total + ".00");
};

var reduce_quantity = function (qty, stk, index) {
  console.log(qty + " " + stk + " " + index);
  let crt = parseInt(stk) - parseInt(qty);
  console.log("ss "+crt);
  items[index].set_item_quantity(crt);
  $("#txt_ph_item_stock").val(crt);
};

var refresh_cart_table = function () {
  $("#tbl_cart").empty();
  for (let index = 0; index < cart_ar.length; index++) {
    let raw = `<tr>
    <th scope="row">${cart_ar[index].itemID}</th>
    <td>${cart_ar[index].itemName}</td>
    <td>${cart_ar[index].qty}</td>
    <td>${cart_ar[index].discount}</td>
    <td>${cart_ar[index].unitPrice}</td>
    <td>
      <button type="button" class="btn btn-danger">
        Delete
      </button>
    </td>
  </tr>`;

    $("#tbl_cart").append(raw);
  }

  // cart item delete
  $("#tbl_cart>tr>td:nth-child(6)").on("click", function () {
    
    for (let index = 0; index < cart_ar.length; index++) {
      if (
        cart_ar[index].itemID ==
          $(this).parent().children(":nth-child(1)").text() &&
        cart_ar[index].discount ==
          $(this).parent().children(":nth-child(4)").text()
      ) {
        sub_total -= cart_ar[index].sub_total;
        discount -= cart_ar[index].discount_in_rs;
        total -= cart_ar[index].total;

        console.log("sub "+cart_ar[index].sub_total);

        $("#lbl_sub_total").text("Rs. " + sub_total + ".00");
        $("#lbl_discount").text("Rs. " + discount + ".00");
        $("#lbl_total").text("Rs. " + total + ".00");

        cart_ar.splice(index, 1);

        for (let index = 0; index < items.length; index++) {
          if (
            items[index].get_item_id() ==
            $(this).parent().children(":nth-child(1)").text()
          ) {
            items[index].set_item_quantity(
              items[index].get_item_quantity() +
                parseInt($(this).parent().children(":nth-child(3)").text())
            );
            break;
          }
        }
        refresh_cart_table();

        break;
      }
    }
  });
};

var generate_order_id = function () {
  if (orders.length != 0) {
    let lastID = orders[orders.length - 1];
    if (lastID < 9) {
      return "O00" + (lastID + 1);
    } else if (lastID < 99) {
      return "O0" + (lastID + 1);
    } else {
      return "O" + (lastID + 1);
    }
  } else {
    return "O001";
  }
};

$("#btn_crt_clear").on("click", function () {
  for (let index1 = 0; index1 < cart_ar.length; index1++) {
    for (let index2 = 0; index2 < items.length; index2++) {
      if (cart_ar[index1].itemID == items[index2].get_item_id()) {
        items[index2].set_item_quantity(
          items[index2].get_item_quantity() + cart_ar[index1].qty
        );
        break;
      }
    }
  }
  $("#tbl_cart").empty();
  clear_toatl();
});

var clear_toatl = function () {
  sub_total = 0;
  discount = 0;
  total = 0;

  $("#lbl_sub_total").text("Rs. " + sub_total + ".00");
  $("#lbl_discount").text("Rs. " + discount + ".00");
  $("#lbl_total").text("Rs. " + total + ".00");
};


function currentTime() {
  let date = new Date(); 
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if(hh == 0){
      hh = 12;
  }
  if(hh > 12){
      hh = hh - 12;
      session = "PM";
   }

   hh = (hh < 10) ? "0" + hh : hh;
   mm = (mm < 10) ? "0" + mm : mm;
   ss = (ss < 10) ? "0" + ss : ss;
    
   let time = hh + ":" + mm + ":" + ss + " " + session;

  $("#clock").text(time);
  setTimeout(currentTime, 1000);
}
currentTime();
currentDate();

function currentDate(){
  let date = new Date();
  let today = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
  console.log(today);
  $("#date").text(today);
}

$("#pay_now").on("click",function(){

  
  txt_order_id;
  lbl_sub_total;

  let order1 = new Order();
  order1.set_order_id($("#txt_order_id").text());
  order1.set_cust_id($("#selectText").text().split("(")[1].split(")")[0]);
  order1.set_date_time($("#date").text()+"  "+$("#clock").text());
  order1.set_total_price($("#lbl_sub_total").text());

  orders.push(order1);

  refresh_order_table();
  $("#txt_order_id").text(generate_order_id());

  
});

$("#txt_order_id").text(generate_order_id());
