module.exports = function(){
	var promiseFor = Promise.method(function(condition, action, value) {
	    if (!condition(value)) return value;
	    return action(value).then(promiseFor.bind(null, condition, action));
	});
}