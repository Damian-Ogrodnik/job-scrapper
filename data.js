const data = require('./offers-null.json')

const companies = []

console.log(data.length)

let counter = 0
for (let i = 0; i < data.length; i++){

    if (data[i].company.startsWith('Zobacz profil')){
        newName = data[i].company.split('Zobacz profil\n').pop()
        companies.push(newName)
        counter++
    } else {
        companies.push(data[i].company)
    }
}

//console.log(companies)

const count = (array) => {
    companies.sort();
}

count();