const apiUrl = 'https://60f542712208920017f39fc7.mockapi.io/users/'
async function getData() {
    try {
        let resp = await fetch(apiUrl);
        let data = await resp.json();
        console.log(data);
        createTable(data);
    }
    catch (error) {
        console.log(error);
    }
}

getData();


async function createUser() {

    try {
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        console.log(name, email)

        let resp = await fetch(apiUrl,
            {
                method: "POST",
                body: JSON.stringify({ name, email }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        document.querySelector("form").reset();
        document.getElementById('tbody').innerHTML = ''
        // name = ''
        // email=''
        getData();
    }
    catch (error) {
        console.log(error);
    }
}



function createTable(data) {
    let tbody = document.getElementById("tbody")
    data.forEach((element) => {

        tbody.innerHTML +=
            `<tr>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>
        <a class="text-warning" onclick="getUser(${element.id})" >Edit</a> | 
        <a class="text-danger" onclick="deleteUser(${element.id})">Delete</a>
        </td>
        </tr>`
    });

}


async function deleteUser(id) {
    try {
        await fetch(apiUrl + id,{
                method: "DELETE",
            })

            document.getElementById('tbody').innerHTML="";
            getData()
    }
    catch (error) {
        console.log(error);
    }
}

async function editUser() {
    try {
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let id = document.getElementById('id').value
        await fetch(apiUrl + id,{
                method: "PUT",
                body: JSON.stringify({ name, email }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            document.getElementById('tbody').innerHTML=""
            document.querySelector("form").reset();
            getData()
    }
    catch (error) {
        console.log(error);
    }
}

async function getUser(id) {
    try {
        let resp = await fetch(apiUrl+id)
    let value = await resp.json();
    document.getElementById('name').value = value.name
    document.getElementById('email').value = value.email
    document.getElementById('id').value = value.id
    console.log(value) 
    } catch (error) {
        console.log(error)
    }
    
}
