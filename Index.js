var tmp = "", tmptable = "", vdtl = {}, dtl = [];

//function autocomplete(objName, arrList) {
//    var currentFocus;

//    objName.addEventListener("input", function (e) {

//        var parentList, childList, i, encVal = this.value;
//        closeAllLists();
//        if (!encVal) {
//            return false;
//        }
//        currentFocus = -1;
//        parentList = document.createElement("DIV");
//        parentList.setAttribute("id", this.id + "autocomplete-list");
//        parentList.setAttribute("class","autocomplete-items")
//        this.parentNode.appendChild(parentList);

//        for (i = 0; i < arrList.length;i++) {
//            if (arrList[i].name.substr(0,encVal.length).toUpperCase() == encVal.toUpperCase() ) {

//                childList = document.createElement("DIV");
//                childList.innerHTML = '<strong>' + arrList[i].name.substr(0, encVal.length) + '</strong>'
//                childList.innerHTML += arrList[i].name.substr(encVal.length);
//                childList.innerHTML += '<input type="hidden" value = ' + arrList[i].name +' />'
//                childList.addEventListener("click", function (e) {
//                    objName.value = this.getElementsByTagName("input")[0].value;
//                    closeAllLists();
                    
//                });

//                parentList.appendChild(childList);
//            } 
//        }
//    });

//    objName.addEventListener("keydown", function (e) {
//        var parent = document.getElementById(this.id + "autocomplete-list");
//        if (parent) parent = parent.getElementsByTagName("div");
//        if (e.keyCode == 40) {
//            currentFocus++;
//            addActive(parent);
//        } else if (e.keyCode == 38) { //up
//            currentFocus--;
//            addActive(parent);
//        } else if (e.keyCode == 13) {
//            e.preventDefault();
//            if (currentFocus > -1) {
//                if (parent) parent[currentFocus].click();
//            }
//        }
//    });

//    function addActive(x) {
//        /*a function to classify an item as "active":*/
//        if (!x) return false;
//        /*start by removing the "active" class on all items:*/
//        removeActive(x);
//        debugger
//        if (currentFocus >= x.length) currentFocus = 0;
//        if (currentFocus < 0) currentFocus = (x.length - 1);
//        /*add class "autocomplete-active":*/
//        x[currentFocus].classList.add("autocomplete-active");
//    }
//    function removeActive(x) {
//        /*a function to remove the "active" class from all autocomplete items:*/
//        for (var i = 0; i < x.length; i++) {
//            x[i].classList.remove("autocomplete-active");
//        }
//    }

//    function closeAllLists(elmnt) {
//        var parentList = document.getElementsByClassName("autocomplete-items");
//        for (var i = 0; i < parentList.length; i++) {
//            if (elmnt != parentList[i] && elmnt != objName) {
//                parentList[i].parentNode.removeChild(parentList[i]);
//            }
//        }
//    }
//}


function autocomplete(inp, arr,objVal) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].name.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].name + "' rValue = '" + arr[i].val +"'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    $(objVal).val(this.getElementsByTagName("input")[0].getAttribute("rValue"));
                    //objVal.value = this.getElementsByTagName("input")[0].getAttribute("rValue");
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}


//NORMAL
function loadBranches(callback) {
    $.ajax({
        url: "/Home/loadBranch",
        type: "post",
        datatype: "json",
        success: function (data) {
            if (data.length > 0) {
                tmp = "";
                dtl = [];
                for (key in data) {
                    tmp = data[key];
                    vdtl = {};
                    vdtl["name"] = tmp.brancName;
                    vdtl["val"] = tmp.brancName;
                    dtl.push(vdtl);
                }
                callback(dtl);
            }
        }
    });
}

//API
function loadBranchesApi(callback) {
    vdtl = {}
    dtl = [];

    vdtl["branchCode"] = "";
    vdtl["brancName"] = "";
    dtl.push(vdtl);

    $.ajax({
        url: "http://localhost:49871/api/GetMethod/GetBranch",
        type: "POST",
        datatype: "json",
        data: JSON.stringify(dtl),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length > 0) {
                dtl = [];
                $.each(data, function (i, val) {
                    vdtl = {};
                    vdtl["name"] = val.brancName;
                    vdtl["val"] = val.branchCode;
                    dtl.push(vdtl);
                });
                callback(dtl);
            }
        }
    });
}

var arrList = ["Afghanistan 1", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
countries1 = [{ name: "Del Monte", val: "011" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" },
    { name: "Davao", val: "023" }, { name: "Denver", val: "023" }
]

//NORMAL
//loadBranches(function (data) {
//    dtl = data;
//    autocomplete(document.getElementById("myInput"), dtl);
//});

loadBranchesApi(function (data) {
    dtl = data;
    autocomplete(document.getElementById("myInput"), dtl, "#myInputValue");
});

autocomplete(document.getElementById("myItem"), countries1);


