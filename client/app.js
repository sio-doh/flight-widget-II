const tableBody = document.getElementById('table-body'); 

const getFlight = () => {
    fetch('http://localhost:8000/flights')
        .then(response => response.json())
        .then(flights => {  
            console.log(populateTable(flights))
        })
        .catch(err => console.log(err))
}
getFlight() 

const populateTable = (flights) => { 
    for (const flight of flights) {
        const tableRow = document.createElement('tr'); 
        const tableIcon = document.createElement('td');
        tableIcon.textContent = "✈";
        tableRow.append(tableIcon); 
        tableBody.append(tableRow);

        const flightDetails = {
            time: flight.time.slice(0,10),
            destination: flight.to.toUpperCase(), 
            operator: flight.operator.shift(), 
            code: flight.code, 
            remarks: flight.status.toUpperCase() 
        }

        for (const flightDetail in flightDetails) { 
            // creating little arrays in order to create flight cards
            const tableCell = document.createElement('td'); 
            const word = Array.from(flightDetails[flightDetail]);
            
            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div'); 
                
                setTimeout(() => { 
                    letterElement.classList.add('flip');
                    letterElement.textContent = letter; 
                    tableCell.append(letterElement);
                }, 100 * index) 
            }
            tableRow.append(tableCell);
        }
    }
}