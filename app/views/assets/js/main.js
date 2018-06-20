function rowsLoop (data) {

   $('tbody').empty();
    $.each(data, function( index, student ) {
     
     let subjects = '';
     $.each(student.subjects, function(i,s) {
         subjects += `<button class="btn btn-sm btn-outline-info allsubs">${s}</button> `;
       });

      $('tbody').append(`<tr><th scope="row">${index+1}</th><td id="name">${student.name}</td><td id="age">${student.age}</td>
       <td id="gender">${student.gender}</td><td>${student._id}</td>
       <td>${subjects}
       <td><button class="btn btn-sm btn-outline-secondary edit" data-id="${student._id}">edit</button>
       <button class="btn btn-sm btn-outline-danger remove" data-id="${student._id}">delete</button></td></tr>`);
    });
}
function updateView(){
  // Load default
  $.ajax({
    url: "api/students"
  }).done(((data) => {
    rowsLoop(data);
    console.log("Loading completed");
  }));
}
$(document).on("click", "button.find", function(event) {
  event.preventDefault();
    const studentId = $("#search input[type=text]").val();
    console.log(studentId);
    $.ajax({
        url: "api/student/"+studentId,
        type: "GET",
        success: function(data) {
         $('tbody').empty();  
        student = data;
        console.log(student);
        sub = student.subjects;
        let subj = '';
        sub.forEach((subject) => {
              subj+=  `<button type="button" class="btn btn-outline-primary">${subject}</button>&nbsp;`
              })
        $('tbody').append(
          `<tr>
            <th scope="row">1</th>
              <td>${student.name}</td>
              <td>${student.age}</td>
              <td >${student.gender}</td>
              <td>${student._id}</td>
              <td>${subj}</td>
              <td> <button type="button" class="btn btn-outline-secondary btn-edit" data-toggle="modal" data-target="#editModal" data-id="${student._id}">Edit</button>
              <button type="button" class="btn btn-outline-danger delete" data-id="${student._id}">Remove</button></td>
          </tr>`
        )     
      }
  });
});
$(document).on("click", "button.allsubs", function(event) {
  event.preventDefault();
    const studentSubject = $(this).text();
    console.log(studentSubject);
    $.ajax({
        url: "api/student/subjects/"+studentSubject,
        type: "GET",
        success: function(student) {
         rowsLoop(student);
      }
  });
});
$(document).on("click", "#gender", function(event) {
  event.preventDefault();
    const gender = $(this).text();
    console.log(gender);
    $.ajax({
        url: "api/gender/"+gender,
        type: "GET",
        success: function(student) {
         rowsLoop(student);
      }
  });
});

$(document).on("click", "#age", function(event) {
  event.preventDefault();
    const age = $(this).text();
    console.log(age);
    $.ajax({
        url: "api/age/"+age,
        type: "GET",
        success: function(student) {
         rowsLoop(student);
      }
  });
});

$(document).on("click", "#name", function(event) {
  event.preventDefault();
    const name = $(this).text();
    console.log(name);
    $.ajax({
        url: "api/name/"+name,
        type: "GET",
        success: function(student) {
         rowsLoop(student);
      }
  });
});

$(document).ready(() => {
  updateView();
});

// Delete a user event
$(document).on("click", "button.remove" , function() {
  const studentId = $(this).attr("data-id");
  $.ajax({
      url: '/api/student/'+studentId,
      type: 'DELETE'
  }).done(((data) => { 
    updateView();
    console.log("deleted");
  }));
});

// Edit a user event
$(document).on("click", "button.edit" , function() {
  const studentId = $(this).attr("data-id");
  $.ajax({
      url: '/api/student/'+studentId
  })
  .done(((student) => { 
    $('#theModal').modal('show');
    $('#newStudent input[name=name]').val(student.name);
    $('#newStudent input[name=age]').val(student.age);
    $('#newStudent input[name=subjects]').val(student.subjects.join(''));
    $(`#newStudent input[name=gender][value="${student.gender}"]`).prop('checked', true);
    $('#newStudent input[name=studentId]').val(student._id);
  }));

});

$(document).on("click", "button.new" , function() {
  $('#theModal').modal('show');
  //to avoid overwriting we force this empty
  $('#newStudent input[name=studentId]').val('');
});

$(document).on("click", "button.find" , function(event) {
  event.preventDefault();
});

$(document).on("keyup", "input[name=subjects]" , function() {
  var subjectsCapitalize = $('#newStudent input[name=subjects]').val();
  $('#newStudent input[name=subjects]').val(subjectsCapitalize.replace(/\s/g, function($2){ return $1.toUpperCase( ); }));
});

$('#newStudent').on("submit", function(event) {
  event.preventDefault();
  $('#theModal').modal('hide');

  const subjects = $.trim($('#newStudent input[name=subjects]').val());
  const subjectsArr = subjects.split(" ");
  const studentId = $('#newStudent input[name=studentId]').val();

  const gender = $('input[name=gender]:checked').val();

  if(studentId === ''){

    $.ajax({
        url: '/api/student/',
        type: 'POST',
        dataType : 'json',
        contentType : "application/json",
        data: JSON.stringify({
          name: $('#newStudent input[name=name]').val(), 
          age: $('#newStudent input[name=age]').val(),
          gender: gender,
          subjects: subjectsArr
        })
    })
    .done((() => { 
      updateView();
    }));

  } else {

    $.ajax({
        url: '/api/student/'+studentId,
        type: 'PUT',
        dataType : 'json',
        contentType : "application/json",
        data: JSON.stringify({
          name: $('#newStudent input[name=name]').val(), 
          age: $('#newStudent input[name=age]').val(),
          gender: gender,
          subjects: subjectsArr
        })
    })
    .done((() => { 
      updateView();
    }));
  }
});

$(document).ready(function() {
    //set initial state.
    $('input[name=gender]').change(function() {
      console.log("changed: "+ $('input[name=gender]:checked').val());   
      console.log("try: "+ $('input[name=gender]:checked').prop("value"));       
    });
});

$(".subs").keyup(function() {
    $(this).val($(this).val().replace(/\s/g, ""));
});