// Your code here
function createEmployeeRecord(ray){
    return {
        firstName: ray[0],
        familyName: ray[1],
        title: ray[2],
        payPerHour: ray[3],
        timeInEvents: [],
        timeOutEvents: [] }
}

function createEmployeeRecords(ray){
    let returnRay = []
    ray.forEach(function(element){
        returnRay.push(createEmployeeRecord(element))
    })
    return returnRay
}

function createTimeInEvent(employeeRecord, timeString){
    let [date, hour] = timeString.split(' ')
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date: date,
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeString){
    let [date, hour] = timeString.split(' ')
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date,
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, timeString){
    let timeIn = employeeRecord.timeInEvents.find( function(s) {return s.date === timeString}).hour
    let timeOut = employeeRecord.timeOutEvents.find( function(s) {return s.date === timeString}).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employeeRecord, timeString){
    let hours = hoursWorkedOnDate(employeeRecord, timeString)
    let wage = employeeRecord.payPerHour
    return (hours*wage)
}

function allWagesFor(employeeRecord){
    let totalHours = 0
    employeeRecord.timeInEvents.forEach(function(object){
        totalHours += hoursWorkedOnDate(employeeRecord, object.date)
    })
    return totalHours*employeeRecord.payPerHour
}

function calculatePayroll(rayEmployeeRecords){
    let totalWages = 0
    rayEmployeeRecords.forEach(function(employeeRecord){
        totalWages += allWagesFor(employeeRecord)
    })
    return totalWages
}

function findEmployeeByFirstName(rayEmployeeRecords, searchedName){
    if (rayEmployeeRecords.find( function(s){return s.firstName === searchedName})){
        return rayEmployeeRecords.find( function(s){return s.firstName === searchedName})
    } else {
        return undefined
    }
}