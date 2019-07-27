console.log('connected');

var database = firebase.database();





$('#submitButton').on('click', function() {
    var name = $('#nameInput').val();
    var role = $('#roleInput').val();
    var startDate = $('#dateInput').val();
    var rate = $('#rateInput').val();

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    $('#rateInput').val('');
    $('#nameInput').val('');
    $('#roleInput').val('');
    $('#dateInput').val('');

});

$('#delButton').on('click', function(){
    console.log(this);
    var recordID = $(this).attr('data-delete');

    
    database.ref().remove(recordID);

});

database.ref().on('child_added', function(snap) {
    console.log(snap.val());

    var table = $('#tableData');

    var row = $('<tr>');

    // Create delete button
    var delButton = $('<button>');
    delButton.addClass('btn btn-warning');
    delButton.attr('data-delete', snap.ref.key);
    delButton.text('X');

    var months = moment().diff(snap.val().startDate, 'months');
    var totalBilledAmt = months * parseInt(snap.val().rate);

    var nameTD = "<td>"+snap.val().name +"</td>";
    var roleTD = "<td>"+snap.val().role +"</td>";
    var monthsWorkedTD = "<td>"+months+"</td>";
    var startDateTD = "<td>"+snap.val().startDate +"</td>";
    var rateTD = "<td>"+snap.val().rate +"</td>";
    var TotalBilledTD = "<td>"+totalBilledAmt+"</td>";

    row.append(nameTD);
    row.append(roleTD);
    row.append(startDateTD);
    row.append(monthsWorkedTD);
    row.append(rateTD);
    row.append(TotalBilledTD);
    row.append(delButton);

    table.append(row);

}, function(error) {

})