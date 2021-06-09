let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

let hoursWorkedOnDate = function(soughtDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}





// const createEmployeeRecord = (employee) => {
//     return {
//         firstName: employee[0],
//         familyName: employee[1],
//         title: employee[2],
//         payPerHour: employee[3],
//         timeInEvents: [],
//         timeOutEvents: []
//     }
// }

// const createEmployeeRecords = (employees) => {
//     return employees.map(employee => {
//         return createEmployeeRecord(employee)
//     })
// }

// const createTimeInEvent = (dateStamp) => {
//     let [date, time] = dateStamp.split(" ")

//     this.timeInEvents.push({
//         type: "TimeIn",
//         time: parseInt(time, 10),
//         date
//     })
//     return this
// }

// const createTimeOutEvent = (dateStamp) => {
//     let [date, time] = dateStamp.split(" ")
    
//     this.timeOutEvents.push({
//         type: "TimeOut",
//         time: parseInt(time, 10),
//         date
//     })
//     return this
// }

// const hoursWorkedOnDate = (date) => {
//     let inTime = this.timeInEvents(function(e){
//         return e.date === date
//     })
//     let outTime = this.timeOutEvents(function(e){
//         return e.date === date
//     })
//     return (outTime.time - inTime.time)/100
// }

// const wagesEarnedOnDate = (date) => {
//     return hoursWorkedOnDate(this, date) * this.payPerHour
// }

// const findEmployeeByFirstName = (employeeRec, firstName) => {
//     return employeeRec.find(e => {return e.firstName === firstName})
// }

// const calculatePayroll = (employeeRec) => {
//     return employeeRec.reduce((memo, pay) => {return memo + allWagesFor.call(pay)}, 0)
// }

// /*
//  We're giving you this function. Take a look at it, you might see some usage
//  that's new and different. That's because we're avoiding a well-known, but
//  sneaky bug that we'll cover in the next few lessons!

//  As a result, the lessons for this function will pass *and* it will be available
//  for you to use if you need it!
//  */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }