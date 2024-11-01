const fs = require("fs");
const { isArray } = require("util");

function fileExists(filename) {
  return fs.existsSync(filename);
}


function validNumber(value) {
  //checks if value is valid number using RegEx sequence
  return /^-?\d*\.?\d+(?:[eE][+-]?\d+)?$/.test(value.toString()) 
}


function dataDimensions(dataframe) {

  if (!Array.isArray(dataframe)) {
    return [-1, -1]; // If input isnt an array, return [-1, -1] indicating no valid data
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
  // Validate input: ensure it's a 1D array of numbers or numeric strings. returns 0 if invalid
  if (!Array.isArray(dataset) || dataset.some(Array.isArray)) {
    return 0;
  }

  let total = 0; //holds total sum

  for (const item of dataset) { //Loops through each item in the dataset
    const num = Number(item); //converts item to number

    // Only add if `num` is a finite number
    if (isFinite(num)) {
      total += num; //adds the number to current value held in 'total' variable
    }
  }
  return total; //returns final total
}


function calculateMean(dataset) {
  // Validate and handle empty or invalid dataset. returns 0 for invalid input
  if (Array.isArray(dataset[0]) && dataset.length === 1|| dataset.length === 0) { 
    return 0;
  }

  let count = 0;
  let totalSales = 0;

  // Flatten the dataset to handle both 1D and 2D arrays consistently
  const flattenedData = dataset.flat();


  // Loops through each element in the flattened dataset
  flattenedData.forEach(element => {
    // Parse the element as a floating-point number
    const value = parseFloat(element);
    // Check if the parsed value is a finite number (not NaN or Infinity)
    if (isFinite(value)) {  
      // If valid, add the value to the total sales sum
      totalSales += value;
      // Increment the count of valid numeric entries
      count++;
    }
  });

  // Calculate and return the mean, or 0 if count is zero
  return count === 0 ? 0 : totalSales / count;
}


  function calculateMedian(dataset) {
     // Filter out invalid data types: ensuring valid number is inputed
     const validNumbers = dataset.filter(value => {
       return typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)));
     });
   
     // Check if any valid numbers are left:
     if (validNumbers.length === 0) {
       return 0; // No valid numbers found, return 0
     }
   
     // Calculate the median using the filtered array:
     const mid = Math.floor(validNumbers.length / 2);
     const sortedArr = validNumbers.sort((a, b) => a - b); 

      // If the number of valid numbers is even, calculate the median as the average of the two middle numbers.
     if (sortedArr.length % 2 === 0) { 
       return (sortedArr[mid - 1] + sortedArr[mid]) / 2; 
     } else {
      // Otherwise if the number of valid numbers is odd, return the middle value.
       return parseInt(sortedArr[mid]); 
     }
   }


function convertToNumber(dataframe, col) {
  // Input validation: Checking parsed dataset and column index
  if (!Array.isArray(dataframe) || dataframe.length < 2 || 
  col < 0 || col >= dataframe[0].length) {
    return 0; // Invalid input
      }

      let conversionCount = 0;
      // Iterate through rows starting from the second row (index 1)
      for (let i = 1; i < dataframe.length; i++) {
        const value = dataframe[i][col];
    
        // Check if the value is a string and can be converted to a number. if so conversion count is incremented
        if (typeof value === 'string' && !isNaN(Number(value))) {
          dataframe[i][col] = Number(value); // Update the dataset in place
          conversionCount++;
        }
      }
      return conversionCount;
}


function flatten(dataframe) {
  // Gets the number of columns in dataframe
  let col = dataDimensions(dataframe)[1]
  if (col === 1){
    //Maps through each row of dataframe and gets first element. 
    return dataframe.map((row) => row[0]);
  }; 
return []; 

}


function loadCSV(filepath, ignoreRows = [], ignoreCols = []) {
  // Check if file exists
  if (!fs.existsSync(filepath)) {
      console.error("File does not exist:", filepath);
      return [[], -1, -1];
  }

  try {
      // Read file content and split into rows and columns
      const lines = fs.readFileSync(filepath, "utf-8").trim().split("\n").map(line => line.split(","));
      
      const totalRows = lines.length;
      const totalColumns = lines[0]?.length || 0;

      // Filter out ignored rows and columns and store cleaned dataset in filtered data
      const filteredData = lines
          .filter((_, index) => !ignoreRows.includes(index))
          .map(row => row.filter((_, colIndex) => !ignoreCols.includes(colIndex)));

      return [filteredData, totalRows, totalColumns];
  } catch (error) {
      console.error("Error reading or processing CSV file:", error);
      return [[], -1, -1];
  }
}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {
  // Validate the dataframe
  if (!Array.isArray(dataframe) || dataframe.length === 0 || !Array.isArray(dataframe[0])) {
      console.error("Invalid dataframe format. Expected a 2D array.");
      return [];
  }

  // Validate columnIndex
  if (typeof columnIndex !== "number" || columnIndex < 0 || columnIndex >= dataframe[0].length) {
      console.error("Invalid column index.");
      return [];
  }

  // Handle wildcard pattern
  const matchAny = pattern === "*";

  // If exportColumns is empty, include all columns
  const columnsToExport = exportColumns.length > 0 ? exportColumns : dataframe[0].map((_, i) => i);

  // Validate export columns to avoid out-of-bound indices
  const validColumnsToExport = columnsToExport.filter(colIndex => colIndex >= 0 && colIndex < dataframe[0].length);

  // Build the resulting sliced data
  const result = dataframe
      .filter((row, index) => {
          if (index === 0 && matchAny) return true; // Include header if wildcard is used
          return matchAny || row[columnIndex] === pattern; // Include all rows if pattern is '*' or exact match
      })
      .map(row => {
          return validColumnsToExport.map(colIndex => row[colIndex]);
      });

  return result;  //returns sliced data
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