  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAGwdduon5t76FDe-5T-T2y-3tWfPQo2yY",
    authDomain: "traintime-e85b6.firebaseapp.com",
    databaseURL: "https://traintime-e85b6.firebaseio.com",
    projectId: "traintime-e85b6",
    storageBucket: "traintime-e85b6.appspot.com",
    messagingSenderId: "710571694530"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var destination = "";
var firstTime = 0;
var frequency = 0;

// Capture Button Click
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTime = $("#firstTime-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  // Code for handling the push
  database.ref().push({
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,


  });
  alert("Train has been added");
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.name);
  console.log(sv.destination);
  console.log(sv.firstTime);
  console.log(sv.frequency);

  // Handle the errors
      // full list of items to the well
    var nameTd = $("<td>");
    var destinationTd = $("<td>");
    var firstTimeTd = $("<td>");
    var frequencyTd = $("<td>");
    var arrivalTd = $('<td>');

    var tableRow = $('<tr>');

     nameTd.text(sv.name);
     destinationTd.text(sv.destination);
     firstTimeTd.text(sv.firstTime);
     frequencyTd.text(sv.frequency);

console.log(firstTimeTd);
console.log(frequencyTd);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTimeTd, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyTd;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequencyTd - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    arrivalTd.text(nextTrain);

    tableRow.append(nameTd);
    tableRow.append(destinationTd);
    tableRow.append(firstTimeTd);
    tableRow.append(frequencyTd);
    tableRow.append(arrivalTd);


    $("#train-table").append(tableRow);
    
            
      // Handle the errors
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
        

});