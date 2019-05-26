const Traveller = require('./../model/traveller.model');
const handleError = function(err){
	let error;
	switch (err.name) {
    case 'ValidationError':
	  error = {};
      for (field in err.errors) {
        switch (err.errors[field].name) {
          case 'CastError':
            error.errorMessage = `${field} is required`
            break;
          case 'ValidatorError':
            error.errorMessage = `${field} is invalid`
            break;
        }
      }
      break;
    default:
      error = 'Something went wrong';
  	}
  	return error;
}

exports.getTraveller = function(req,res){
	let id = req.params.id;
	let {lastResult, count, fields} = req.query;
	if(fields){
		fields = fields.replace(/,/g,' ');
	}
	if(id){
		let query = Traveller.findById(id);
		if(fields){
			query.select(fields);
		}
		query.exec(function(err, result){
			if(err || !result){
				return res.sendStatus(404);
			}
			res.send(result)
		})
	}
	else{
		if(isNaN(lastResult)){
			lastResult = 0;
		}
		if(isNaN(count)){
			count = 10;
		}
		let query = Traveller.find({},null,{skip:lastResult, limit:count});
		if(fields){
			query.select(fields);
		}
		query.exec(function(err, result){
			if(err || (result && result.length === 0)){
				return res.sendStatus(404);
			}
			res.send(result);
		})

	}
}

exports.addTraveller = function(req,res){
	let {name,email,dob,phone} = req.body;
	let traveller = new Traveller({name,email,dob:new Date(dob),phone});
	traveller.save(function(err,result){
		if(err){
			return res.status(422).send(handleError(err));
		}
		res.sendStatus(201);
	})
}

exports.updateTraveller = function(req,res){
	let id = req.params.id;
	let {name,email,dob,phone} = req.body;
	let updateObj = {};
	if(name){
		updateObj.name = name;
	}
	if(email){
		updateObj.email = email;
	}
	if(dob){
		updateObj.dob = new Date(dob);
	}
	if(phone){
		updateObj.phone = phone;
	}
	Traveller.updateOne({_id:id},updateObj,{runValidators:true},function(err,result){
		if(err){
			return res.status(422).send(handleError(err));
		}
		res.sendStatus(200);
	})
}

exports.deleteTraveller = function(req,res){
	let id = req.params.id;
	Traveller.findOneAndDelete({_id:id},function(err,result){
		if(err){
			return res.status(422).send(err.errors);
		}
		res.sendStatus(200);
	})
}
