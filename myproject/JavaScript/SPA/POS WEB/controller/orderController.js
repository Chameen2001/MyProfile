var refresh_order_table = function () {
  $("#order_tbl_body").empty();
  for (let index = 0; index < orders.length; index++) {
    let newRaw = `<tr>
    <th scope="row">${orders[index].get_order_id()}</th>
    <td>${orders[index].get_cust_id()}</td>
    <td>${orders[index].get_date_time()}</td>
    <td>${orders[index].get_total_price()}</td>
  </tr>`;

    $("#order_tbl_body").append(newRaw);
  }
};
