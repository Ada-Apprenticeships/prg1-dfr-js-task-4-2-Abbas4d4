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
}

function calculateMean(dataset) {
  
}

function calculateMedian(dataset) {

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