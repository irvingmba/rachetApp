import bcrypt from 'bcryptjs';

export function encryptPswd( password: string ) {
    // // Code to store in the DB
    // bcrypt.genSalt(7,
    //     function (err, salt) {
    //         return bcrypt.hash(password,salt)
    //     });

    const salt = bcrypt.genSaltSync(7);
    const hash = bcrypt.hashSync( password, salt );
    return hash;
};

export function comparePswd( password:string, storedHash: string ) {
    // // Code to compare in the DB
    // bcrypt.compare( password, "DBhash", function(err,res) {
    //     password === "DBhash";
    // } );

    return bcrypt.compareSync( password, storedHash )
};