var IGMBaseDice = {
	roll :function(num,die){
		return Math.floor((Math.random()*die)+1)
	}
}

module.exports = IGMBaseDice