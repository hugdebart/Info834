var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    mail: {type : String}

});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

function createUser(userName, password, mail){
   var users = new User({
    userName: String,
    password: String,
    mail: String})
}


var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test';
mongosse.connect(connStr, function(err){
    if(err) throw err;
    console.log('Successfully connected to MongoDB');
    createUser("serninep","1234567809","paulSernine@azerty.com")
})
module.exports = mongoose.model('User', UserSchema);