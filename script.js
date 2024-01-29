// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select necessary elements from the DOM
    const sacksInput = document.getElementById('sacks');
    const resikoInput = document.getElementById('resiko');
    const runningPriceInput = document.getElementById('running-price');
    const calculateBtn = document.getElementById('calculate-btn');
    const grossWeightOutput = document.getElementById('gross-weight');
    const totalResikoOutput = document.getElementById('total-resiko');
    const netWeightOutput = document.getElementById('net-weight');
    const totalPaymentOutput = document.getElementById('total-payment');
    const listOfKilosInput = document.getElementById('list-of-kilos');

    // Add event listener to the Calculate button
    calculateBtn.addEventListener('click', function () {
        // Retrieve user input values
        const sacks = parseInt(sacksInput.value);
        const resiko = parseFloat(resikoInput.value);
        const runningPrice = parseFloat(runningPriceInput.value);
        const list_of_kilos = listOfKilosInput.value.trim().split('\n').map(row => row.split('\t').map(kilo => parseInt(kilo)));

        // Perform calculations
        const grossWeight = calculateGrossWeight(list_of_kilos);
        const totalResiko = calculateTotalResiko(sacks, resiko);
        const netWeight = calculateNetWeight(grossWeight, totalResiko);
        const totalPayment = calculateTotalPayment(netWeight, runningPrice);

        // Update the DOM with the calculated results
        grossWeightOutput.textContent = `Gross Weight (kgs): ${grossWeight}`;
        totalResikoOutput.textContent = `Total Resiko (kgs): ${totalResiko}`;
        netWeightOutput.textContent = `Net Weight (kgs): ${netWeight}`;
        totalPaymentOutput.textContent = `Total Payment: ${totalPayment.toFixed(2)}`;
    });

    // Function to calculate Gross Weight
    function calculateGrossWeight(list_of_kilos) {
        return list_of_kilos.flat().reduce((acc, kilo) => acc + kilo, 0);
    }

    // Function to calculate Total Resiko
    function calculateTotalResiko(sacks, resiko) {
        return sacks * resiko;
    }

    // Function to calculate Net Weight
    function calculateNetWeight(grossWeight, totalResiko) {
        return grossWeight - totalResiko;
    }

    // Function to calculate Total Payment
    function calculateTotalPayment(netWeight, runningPrice) {
        return netWeight * runningPrice;
    }
});
