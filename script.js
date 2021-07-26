function createtable(users) {
    //creating a table head
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.innerHTML = "ID";
    var th2 = document.createElement("th");
    th2.innerHTML = "NAME";
    var th3 = document.createElement("th");
    th3.innerHTML = "EMAIL";
    tr.append(th1, th2, th3);
    thead.append(tr);
    
    var tbody = document.createElement("tbody");
    users.forEach(el => {
        var tr1 = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = el.id;
        var td2 = document.createElement("td");
        td2.innerHTML = el.name;
        var td3 = document.createElement("td");
        td3.innerHTML = el.email;
        tr1.append(td1, td2, td3);
        tbody.append(tr1);

    });

    //appending the table    

    table.append(thead, tbody);
    document.body.append(table);
}



//fetching data from API
async function getUsers() {
    const data = await fetch(
        "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json", {
            method: "GET"
        }
    );
    const users = await data.json();
    //creating pagination based on the data
    const noOfPages = Math.ceil(users.length / 10);
    const pagination = document.querySelector(".pagination");
    const prev = document.createElement("button");
    prev.innerHTML = "Previous"

    prev.onclick = function() {

        let j = localStorage.getItem("currentbutton");
        const prevUsers = users.filter((user, index) => filterUsers(index, (j - 10), j));

        document.querySelector("table").remove();
        createtable(prevUsers); 
    };
    pagination.append(prev);


   
    for (let i = 1; i <= noOfPages; i++) {
        const page = document.createElement("button");
        if (i == 1) { page.innerText = "first" } else { page.innerText = i; }

        //event handler, when a button is clicked
        page.onclick = function() {
            const pageUsers = users.filter((user, index) => filterUsers(index, (i - 1) * 10, i * 10) 
            );

            document.querySelector("table").remove(); 
            createtable(pageUsers); 
        };
        pagination.append(page);
    }

    const firstTenUsers = users.slice(0, 10);

    createtable(firstTenUsers);
}

function filterUsers(index, startIdx, endIdx) {
    localStorage.setItem("currentbutton", startIdx)
    return index >= startIdx && index < endIdx;
}
getUsers()
