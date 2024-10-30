const fs = require("fs");
const { isArray } = require("util");

function fileExists(filename) {
  return fs.existsSync(filename);
}


function validNumber(value) {
  return /^-?\d*\.?\d+(?:[eE][+-]?\d+)?$/.test(value.toString()) 
}


function dataDimensions(dataframe) {

  if (!Array.isArray(dataframe)) {
    return [-1, -1]; // No data on either axis
  }

  const rowCount = dataframe.length;

  // Handle cases where the data is a 1D array or empty
  if (rowCount === 0 || !Array.isArray(dataframe[0])) {
    return [rowCount, -1]; 
  }

  const columnCount = dataframe[0].length;
  return [rowCount, columnCount];

}


function findTotal(dataset) {
 // Input Validation: Check if the dataset is a valid 1D array
 if (!Array.isArray(dataset) || (dataset.length > 0 && Array.isArray(dataset[0]))) {
  return 0; // Invalid input (not an array or a 2D array), return 0
}

let total = 0;

// Iterate through the dataset
for (let i = 0; i < dataset.length; i++) {
  const item = dataset[i];

  // Check if the element is a number or a numeric string
  if (typeof item === 'number') {
    total += item; 
  } else if (typeof item === 'string' && !isNaN(parseFloat(item))) {
    total += parseFloat(item); 
  }
}

return total;
}

function calculateMean(dataset) {

  let count = 0
  let totalSales = 0

  if (Array.isArray(dataset[0]) && dataset.length === 1|| dataset.length === 0) {
    return 0; // Return 0 for invalid input or empty array
  } else 
  { dataset.forEach(row => {
    if (Array.isArray(row)) {
      row.forEach(element => {
        if (validNumber(element)) {
          totalSales += parseFloat(element)
          count ++
        }
      });
      
    } else {
      if (validNumber(row)) {
        totalSales += parseFloat(row)
        count ++
      }
    }
   });
    return totalSales/count;

  }}

function calculateMedian(dataset) {

  if (Array.isArray(dataset[0]) && dataset.length === 1|| dataset.length === 0) {
    return 0
  }
    
  const mid = Math.floor(dataset.length / 2);
  const sortedArr = dataset.sort((a, b) => a - b);  //sorts array into ascending order
  
  if (dataset.length % 2 === 0) {
      return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  } else {
      return sortedArr[mid];
  }


}

function convertToNumber(dataframe, col) {

}

function flatten(dataframe) {

}

function loadCSV(csvFile, ignoreRows, ignoreCols) {

}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {

}

arr = [213,32,43,'36','no']
findTotal(arr)
module.exports = {
  fileExists,
  validNumber,
  dataDimensions,
  calculateMean,
  findTotal,
  convertToNumber,
  flatten,
  loadCSV,
  calculateMedian,
  createSlice,
};