var refresh_customer_cmb = function () {
  $("#customer_cmb").empty();
  $("#customer_cmb").append("<option>None</option>");
  for (let index = 0; index < customers.length; index++) {
    var raw =
      "<option>" +
      customers[index].getName() +
      " (" +
      customers[index].getCID() +
      ")" +
      "</option>";
    $("#customer_cmb").append(raw);
  }
};

var refresh_item_cmb = function () {
  $("#item_cmb").empty();
  $("#item_cmb").append("<option>None</option>");
  for (let index = 0; index < items.length; index++) {
    var raw =
      "<option>" +
      items[index].get_item_name() +
      " (" +
      items[index].get_item_id() +
      ")" +
      "</option>";
    $("#item_cmb").append(raw);
  }
};
$("#customer_cmb").on("change", function () {
  set_customer_detail($("#customer_cmb option:selected").index() - 1);
});

$("#item_cmb").on("change", function () {
  set_item_detail($("#item_cmb option:selected").index() - 1);
});

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

var add_to_cart = function () {
  let cart_data = {};
  let result = isExist($("#item_cmb").val().split("(")[1].split(")")[0]);

  if (result != undefined) {
    cart_ar[result].qty += parseInt($("#txt_ph_item_qty").val());
  } else {
    cart_data.itemID = $("#item_cmb").val().split("(")[1].split(")")[0];
    cart_data.itemName = $("#item_cmb").val().split(" ")[0];
    cart_data.qty = parseInt($("#txt_ph_item_qty").val());
    cart_data.discount = parseInt($("#txt_ph_item_discount").val());
    cart_data.unitPrice = parseInt($("#txt_ph_item_unit_price").val());

    cart_ar.push(cart_data);
  }

  refresh_cart_table();
  reduce_quantity(
    parseInt($("#txt_ph_item_qty").val()),
    $("#txt_ph_item_stock").val(),
    $("#item_cmb option:selected").index() - 1
  );
  calculate_total(
    parseInt($("#txt_ph_item_qty").val()),
    parseInt($("#txt_ph_item_unit_price").val()),
    parseInt($("#txt_ph_item_discount").val())
  );
};
let sub_total = 0;
let discount = 0;
let total = 0;
var calculate_total = function (qty, stk, dsc) {
  sub_total += qty * stk;
  discount += (qty * stk * dsc) / 100;
  total = sub_total - discount;

  $("#lbl_sub_total").text(sub_total);
  $("#lbl_discount").text(discount);
  $("#lbl_total").text(total);
};

var reduce_quantity = function (qty, stk, index) {
  console.log(qty + " " + stk + " " + index);
  let crt = parseInt(stk) - parseInt(qty);
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

$("#txt_order_id").text(generate_order_id());
