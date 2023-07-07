const openTable = {
  url: "//www.opentable.com/widget/reservation/loader",
  rids: "rid=347401&rid=118296",
  queryStr:
    "&type=multi&theme=standard&color=1&domain=com&lang=en-US&newtab=false&ot_source=Other&iframe=false",
  times: [
    { value: "19:00", display: "7:00pm" },
    { value: "20:00", display: "8:00pm" },
    { value: "21:00", display: "9:00pm" },
  ],
};

$(document).ready(function () {
  $("#ot-btn").on("click", function (e) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    const rid = 157305;
    const ridStr = `rid=${rid}`;
    // const rids = openTable.rids;
    script.src = openTable.url + "?" + ridStr + openTable.queryStr;
    console.log(script.src);
    $("#open-table-container").append(script);

    var otLoad = setInterval(function () {
      if ($(".ot-dtp-picker-form .ot-time-picker select").length > 0) {
        clearInterval(otLoad);
        // const $timeSelect = $(".ot-dtp-picker-form .ot-time-picker select");
        const $restSelect = $(
          ".ot-dtp-picker-form .ot-restaurant-picker select"
        );
        const $restSelectLabel = $(
          ".ot-dtp-picker-form .ot-restaurant-picker a"
        );
        // $(
        //   ".ot-dtp-picker-form .ot-restaurant-picker select option[value=0]"
        // ).attr("selected", false);
        // $(
        //   `.ot-dtp-picker-form .ot-restaurant-picker select option[value=${rid}]`
        // ).attr("selected", true);

        $restSelect.html(
          `<option value="${rid}" selected="selected">Restaurant Six</option>`
        );
        $restSelectLabel.html("Restaurant Six");
        // $timeSelect.html(timeOptions);

        updateOtURL(rid);
      }
    }, 100);
  });
});

function updateOtURL(rid) {
  let $formSubmit = $(".ot-dtp-picker-form input[type=submit]");
  let submitURL = $formSubmit.data("ot-restref");
  console.log("submitURL: ", submitURL);
  const queryVars = tasteParseURL(submitURL);
  queryVars.rid = rid;
  queryVars.restref = rid;
  console.log("queryVars", queryVars);
  const urlStr = OT.Common.Helpers.QueryString.stringify(queryVars);
  console.log("urlStr", urlStr);
  $formSubmit.data("ot-restref", urlStr);
  $formSubmit.attr("data-ot-restref", urlStr);
  console.log($formSubmit.data("ot-restref"));
  console.log("options: ", OT.Widget.options);
}

function tasteParseURL(url) {
  let queryVars = {}; // create a new empty object

  url.split("&").forEach(function (pair) {
    // iterate over query string parts
    console.log("pair: ", pair);

    if (pair === "") {
      return;
    } // make sure there is something in it

    let parts = pair.split("="); // setup the seperator to use for splitting

    // populate object
    queryVars[parts[0]] =
      parts[1] && decodeURIComponent(parts[1].replace(/\+/g, " ")); // remove + signs from query parameters just in case
  });

  return queryVars;
}
