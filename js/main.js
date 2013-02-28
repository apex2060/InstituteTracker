$(document).ready(function() {

// Define your class/object
var TestObject = StackMob.Model.extend({
schemaName : 'testobject' //Tell StackMob to save instances of TestObject to the table "testobject"
});

// Create a local instance of TestObject by passing JSON into the constructor
// We have several different field types here as examples.
// Fields must be lower case.
var to = new TestObject({
message : 'This test object instance will show you how StackMob creates your DB from JSON data',
integer : 1,
decimal : 2.5,
istestobject : true,
stringarray : ['This', 'is', 'an', 'array', 'of', 'strings'],
intarray : [1, 2, 3, 4, 5],
decimals : [1.1, 2.2, 3.3],
booleans : [true, false, true, false]
});

// Call "create" to fire off the AJAX call to StackMob to create this object instance
// If this is the first time StackMob has seen a 'testobject', StackMob will create the database schema automatically for you.
// When the server is done, AJAX callbacks are fired: 'success' / 'error'
to.create({
success : function(model) {
// Notice how StackMob auto generated a unique primary key for this object instance under "testobject_id".
// Schema primary keys are [schema name]_id
// If you specified "testobject_id" in your JSON, StackMob will use your given one instead.
console.debug(model.toJSON());
$(".error").hide();
$(".success").show();
},
error : function(model, response) {
console.debug("Oops there was an error in creating the object.");
console.debug("Have you initialized your JS SDK?");
console.debug("Are you running this on StackMob's Local Runner?");
console.debug("Are you running this on StackMob's GitHub-integrated hosting?")
console.debug(response);
}
});
});