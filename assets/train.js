
                // Initialize Firebase
var config = {
    apiKey: "AIzaSyBSVlImept_z14nYK-KSSyhEOKj5_GIPC8",
    authDomain: "myfirstdbproject-58c81.firebaseapp.com",
    databaseURL: "https://myfirstdbproject-58c81.firebaseio.com",
    projectId: "myfirstdbproject-58c81",
    storageBucket: "myfirstdbproject-58c81.appspot.com",
    messagingSenderId: "48807571804"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();


  $(document).ready(function () {

  $("#submit-button").on("click", function() {
      database.ref().push( {

      trainName: $("#train-name").val().trim(),
      trainDestination: $("#destination").val().trim(),
      trainTime: $("#train-time").val().trim(),
      trainFrequency: $("#frequency").val().trim()


      });

    });


    database.ref().on("child_added", function (snapshot) {

        var name = snapshot.val().trainName;

        var destination = snapshot.val().trainDestination;

        var time = snapshot.val().trainTime;

        var frequency = snapshot.val().trainFrequency;

        var tFrequency = frequency;

        // Time is 3:30 AM
        var firstTime = time;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




        // var minutesAway = tMinutesTillTrain;

        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            // $("<td>").text(time),
            $("<td>").text(nextTrain),
            $("<td>").text(frequency),
            $("<td>").text(tMinutesTillTrain),

        );


        
    

        $(".tbody").append(newRow);

    }, function (errorObject) {
        console.log("the read failed " + errorObject.code)
    }

    

);




});